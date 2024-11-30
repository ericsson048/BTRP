import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
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
  num: number;
  category: string;
  title: string;
  description: string;
  img: string;
  live: string;
  github: string;
}

const categories = [
  "Web Development",
  "Mobile Development",
  "Desktop Application",
  "Machine Learning",
  "Data Science",
  "Other"
];

const AdminProject = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    num: '',
    category: '',
    title: '',
    description: '',
    img: '',
    live: '',
    github: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3500/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleOpen = (project?: Project) => {
    if (project) {
      setSelectedProject(project);
      setFormData({
        num: project.num.toString(),
        category: project.category,
        title: project.title,
        description: project.description,
        img: project.img,
        live: project.live,
        github: project.github,
      });
    } else {
      setSelectedProject(null);
      setFormData({
        num: '',
        category: '',
        title: '',
        description: '',
        img: '',
        live: '',
        github: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategorySelect = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        num: parseInt(formData.num),
      };

      if (selectedProject) {
        await axios.put(`http://localhost:3500/projects/${selectedProject.id}`, payload);
      } else {
        await axios.post('http://localhost:3500/projects', payload);
      }
      fetchProjects();
      handleClose();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:3500/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Management</h1>
        <Button onClick={() => handleOpen()}>Add New Project</Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Number</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Live URL</TableHead>
              <TableHead>GitHub URL</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.num}</TableCell>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.category}</TableCell>
                <TableCell className="max-w-xs truncate">{project.description}</TableCell>
                <TableCell>
                  {project.img && (
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Live
                  </a>
                </TableCell>
                <TableCell>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Code
                  </a>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleOpen(project)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDelete(project.id)}>Delete</Button>
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
            <DialogTitle>{selectedProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="num" className="text-sm font-medium">Project Number</label>
              <Input
                id="num"
                name="num"
                type="number"
                value={formData.num}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={formData.category}
                onValueChange={handleCategorySelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="img" className="text-sm font-medium">Image URL</label>
              <Input
                id="img"
                name="img"
                value={formData.img}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="live" className="text-sm font-medium">Live URL</label>
              <Input
                id="live"
                name="live"
                value={formData.live}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="github" className="text-sm font-medium">GitHub URL</label>
              <Input
                id="github"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProject;
