import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Project {
  id: number;
  title: string;
}

interface ProjectStack {
  id: number;
  project_id: number;
  name: string;
  project: {
    title: string;
  };
}

const AdminProjectStacks = () => {
  const [stacks, setStacks] = useState<ProjectStack[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedStack, setSelectedStack] = useState<ProjectStack | null>(null);
  const [formData, setFormData] = useState({
    project_id: '',
    name: '',
  });

  useEffect(() => {
    fetchStacks();
    fetchProjects();
  }, []);

  const fetchStacks = async () => {
    try {
      const response = await axios.get('http://localhost:3500/project-stacks');
      setStacks(response.data);
    } catch (error) {
      console.error('Error fetching project stacks:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3500/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleOpen = (stack?: ProjectStack) => {
    if (stack) {
      setSelectedStack(stack);
      setFormData({
        project_id: stack.project_id.toString(),
        name: stack.name,
      });
    } else {
      setSelectedStack(null);
      setFormData({
        project_id: '',
        name: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStack(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProjectSelect = (value: string) => {
    setFormData(prev => ({
      ...prev,
      project_id: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.project_id) {
        alert('Please select a project');
        return;
      }

      const payload = {
        ...formData,
        project_id: parseInt(formData.project_id)
      };

      if (selectedStack) {
        await axios.put(`http://localhost:3500/project-stacks/${selectedStack.id}`, payload);
      } else {
        await axios.post('http://localhost:3500/project-stacks', payload);
      }
      fetchStacks();
      handleClose();
    } catch (error) {
      console.error('Error saving project stack:', error);
      alert('Error saving project stack. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this stack?')) {
      try {
        await axios.delete(`http://localhost:3500/project-stacks/${id}`);
        fetchStacks();
      } catch (error) {
        console.error('Error deleting project stack:', error);
      }
    }
  };

  const getProjectTitle = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    return project?.title || 'Unknown Project';
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Stacks Management</h1>
        <Button onClick={() => handleOpen()}>Add New Stack</Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Stack Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stacks.map((stack) => (
              <TableRow key={stack.id}>
                <TableCell>{getProjectTitle(stack.project_id)}</TableCell>
                <TableCell>{stack.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleOpen(stack)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDelete(stack.id)}>Delete</Button>
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
            <DialogTitle>{selectedStack ? 'Edit Stack' : 'Add New Stack'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project</label>
                <Select
                  value={formData.project_id}
                  onValueChange={handleProjectSelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id.toString()}>
                        {project.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Stack Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjectStacks;
