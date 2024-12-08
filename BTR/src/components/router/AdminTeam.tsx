import React, { useState, useEffect } from 'react';
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

interface TeamMember {
  id: number;
  name: string;
  title: string;
  image_url: string;
  facebook: string;
  github: string;
  instagram: string;
}

interface Responsibility {
  id: number;
  team_member_id: number;
  responsibility: string;
}

const AdminTeam = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [responsibilities, setResponsibilities] = useState<Responsibility[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [responsibilityOpen, setResponsibilityOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    image_url: '',
    facebook: '',
    github: '',
    instagram: '',
  });
  const [responsibilityText, setResponsibilityText] = useState('');

  useEffect(() => {
    fetchTeamMembers();
    fetchResponsibilities();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get('http://localhost:3500/team');
      setTeamMembers(response.data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const fetchResponsibilities = async () => {
    try {
      const response = await axios.get('http://localhost:3500/responsibilities');
      setResponsibilities(response.data);
    } catch (error) {
      console.error('Error fetching responsibilities:', error);
    }
  };

  const handleOpen = (member?: TeamMember) => {
    if (member) {
      setSelectedMember(member);
      setFormData({
        name: member.name,
        title: member.title,
        image_url: member.image_url,
        facebook: member.facebook,
        github: member.github,
        instagram: member.instagram,
      });
    } else {
      setSelectedMember(null);
      setFormData({
        name: '',
        title: '',
        image_url: '',
        facebook: '',
        github: '',
        instagram: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMember(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedMember) {
        await axios.put(`http://localhost:3500/team/${selectedMember.id}`, formData);
      } else {
        await axios.post('http://localhost:3500/team', formData);
      }
      fetchTeamMembers();
      handleClose();
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await axios.delete(`http://localhost:3500/team/${id}`);
        fetchTeamMembers();
      } catch (error) {
        console.error('Error deleting team member:', error);
      }
    }
  };

  const handleOpenResponsibility = (memberId: number) => {
    setSelectedMemberId(memberId);
    setResponsibilityText('');
    setResponsibilityOpen(true);
  };

  const handleAddResponsibility = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMemberId || !responsibilityText) return;

    try {
      await axios.post('http://localhost:3500/responsibilities', {
        team_member_id: selectedMemberId,
        responsibility: responsibilityText,
      });
      fetchResponsibilities();
      setResponsibilityOpen(false);
      setResponsibilityText('');
    } catch (error) {
      console.error('Error adding responsibility:', error);
    }
  };

  const handleDeleteResponsibility = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this responsibility?')) {
      try {
        await axios.delete(`http://localhost:3500/responsibilities/${id}`);
        fetchResponsibilities();
      } catch (error) {
        console.error('Error deleting responsibility:', error);
      }
    }
  };

  const getMemberResponsibilities = (memberId: number) => {
    return responsibilities.filter(r => r.team_member_id === memberId);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) {
        alert('No file selected');
        return;
      }

      // Si nous avons une image existante, la supprimer d'abord
      const currentImageUrl = selectedMember?.image_url;
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

      const response = await axios.post('http://localhost:3500/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData(prev => ({
        ...prev,
        image_url: response.data.imageUrl
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <Button onClick={() => handleOpen()}>Add New Member</Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Social Media</TableHead>
              <TableHead>Responsibilities</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  {member.image_url && (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                </TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.title}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {member.facebook && (
                      <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        FB
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        GH
                      </a>
                    )}
                    {member.instagram && (
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        IG
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {getMemberResponsibilities(member.id).map((resp) => (
                      <div key={resp.id} className="flex items-center gap-2">
                        <span>{resp.responsibility}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteResponsibility(resp.id)}
                          className="h-6 w-6 p-0"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenResponsibility(member.id)}
                    >
                      Add Responsibility
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleOpen(member)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDelete(member.id)}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedMember ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="image_url" className="text-sm font-medium">Image URL</label>
              <Input
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                required
              />
              <input type="file" onChange={handleImageUpload} />
            </div>
            <div className="space-y-2">
              <label htmlFor="facebook" className="text-sm font-medium">Facebook URL</label>
              <Input
                id="facebook"
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="github" className="text-sm font-medium">GitHub URL</label>
              <Input
                id="github"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="instagram" className="text-sm font-medium">Instagram URL</label>
              <Input
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
              />
            </div>
            <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
          </form>
          
        </DialogContent>
      </Dialog>

      <Dialog open={responsibilityOpen} onOpenChange={setResponsibilityOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Responsibility</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddResponsibility}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="responsibility" className="text-sm font-medium">Responsibility</label>
                <Input
                  id="responsibility"
                  value={responsibilityText}
                  onChange={(e) => setResponsibilityText(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setResponsibilityOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTeam;
