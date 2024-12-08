import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { useToast } from "../../hooks/use-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

const userSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  role: yup.string().oneOf(["user", "admin"], "Invalid role").required("Role is required"),
  password: yup.string()
    .when("$isEditing", {
      is: false,
      then: (schema) => schema.required("Password is required for new users")
        .min(8, "Password must be at least 8 characters"),
      otherwise: (schema) => schema.optional(),
    }),
  image: yup.string().optional(),
}).required();

type FormData = yup.InferType<typeof userSchema>;

const AdminUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<FormData>({
    resolver: yupResolver(userSchema),
    context: { isEditing: !!selectedUser }
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3500/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    }
  };

  const handleOpen = (user?: User) => {
    if (user) {
      setSelectedUser(user);
      reset({
        image: user.image || '',
        name: user.name,
        email: user.email,
        role: user.role === 'admin' ? 'admin' : 'user',
        password: '',
      });
    } else {
      setSelectedUser(null);
      reset({
        image: '',
        name: '',
        email: '',
        role: 'user',
        password: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    reset();
  };

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        ...data,
        image: data.image || undefined
      };

      if (selectedUser) {
        const updateData = { ...payload } as { [key: string]: any };
        if (!updateData.password) {
          delete updateData.password;
        }
        const response = await axios.put(`http://localhost:3500/users/${selectedUser.id}`, updateData);
        if (response.data) {
          toast({
            title: "Success",
            description: "User updated successfully",
          });
          fetchUsers();
          handleClose();
        }
      } else {
        const response = await axios.post('http://localhost:3500/users', payload);
        if (response.data) {
          toast({
            title: "Success",
            description: "User created successfully",
          });
          fetchUsers();
          handleClose();
        }
      }
    } catch (error: any) {
      console.error('Error saving user:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to save user';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:3500/users/${id}`);
        fetchUsers();
        toast({
          title: "Success",
          description: "User deleted successfully",
        });
      } catch (error: any) {
        console.error('Error deleting user:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete user';
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) {
        toast({
          title: "Error",
          description: "No file selected",
          variant: "destructive",
        });
        return;
      }

      // Si nous avons une image existante, la supprimer d'abord
      const currentImageUrl = selectedUser?.image;
      if (currentImageUrl) {
        const filename = currentImageUrl.split('/').pop();
        if (filename) {
          try {
            await axios.delete(`http://localhost:3500/upload/${filename}`);
            console.log('Old image deleted successfully');
          } catch (error) {
            console.error('Error deleting old image:', error);
          }
        }
      }

      const formData = new FormData();
      formData.append('image', file);

      console.log('Uploading file:', file.name);
      const response = await axios.post('http://localhost:3500/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data);
      setValue('image', response.data.imageUrl);
   
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={() => handleOpen()}>Add New User</Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.image ? (
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img 
                        src={user.image} 
                        alt={`${user.name}'s avatar`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpen(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedUser ? 'Edit User' : 'Add New User'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                {...register("name")}
                placeholder="Name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Input
                {...register("email")}
                placeholder="Email"
                type="email"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Input
                {...register("password")}
                placeholder="Password"
                type="password"
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <Select 
                onValueChange={(value) => setValue("role", value)} 
                defaultValue={selectedUser?.role || "user"}
              >
                <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <Input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                className={errors.image ? "border-red-500" : ""}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedUser ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
