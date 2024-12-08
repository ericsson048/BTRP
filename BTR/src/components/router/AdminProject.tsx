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
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Stack {
  id: number;
  name: string;
  image_url: string;
}

interface Project {
  id: number;
  num: number;
  category: string;
  title: string;
  description: string;
  img: string;
  live: string;
  github: string;
  stacks?: Stack[];
}

interface ProjectStack {
  id: number;
  project_id: number;
  name: string;
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
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [projectStacks, setProjectStacks] = useState<ProjectStack[]>([]);
  const [selectedStacks, setSelectedStacks] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [stackOpen, setStackOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    num: '',
    category: '',
    title: '',
    description: '',
    img: '',
    live: '',
    github: '',
  });
  const [stackName, setStackName] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchStacks();
    fetchProjectStacks();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3500/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchStacks = async () => {
    try {
      const response = await axios.get('http://localhost:3500/stacks');
      setStacks(response.data);
    } catch (error) {
      console.error('Error fetching stacks:', error);
    }
  };

  const fetchProjectStacks = async () => {
    try {
      const response = await axios.get('http://localhost:3500/project-stacks');
      setProjectStacks(response.data);
    } catch (error) {
      console.error('Error fetching project stacks:', error);
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
      setSelectedStacks(project.stacks?.map(stack => stack.id) || []);
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
      setSelectedStacks([]);
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
        stacks: selectedStacks
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

  const handleOpenStack = (projectId: number) => {
    setSelectedProjectId(projectId);
    setStackName('');
    setStackOpen(true);
  };

  const handleAddStack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId || !stackName) return;

    try {
      await axios.post('http://localhost:3500/project-stacks', {
        project_id: selectedProjectId,
        name: stackName,
      });
      fetchProjectStacks();
      setStackOpen(false);
    } catch (error) {
      console.error('Error adding stack:', error);
    }
  };

  const handleDeleteStack = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this stack?')) {
      try {
        await axios.delete(`http://localhost:3500/project-stacks/${id}`);
        fetchProjectStacks();
      } catch (error) {
        console.error('Error deleting stack:', error);
      }
    }
  };

  const getProjectStacks = (projectId: number) => {
    return projectStacks.filter(stack => stack.project_id === projectId);
  };

  const handleStackChange = (stackId: number) => {
    setSelectedStacks(prev => {
      if (prev.includes(stackId)) {
        return prev.filter(id => id !== stackId);
      } else {
        return [...prev, stackId];
      }
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) {
        alert('No file selected');
        return;
      }

      // Si nous avons une image existante, la supprimer d'abord
      const currentImageUrl = selectedProject?.img;
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
        img: response.data.imageUrl
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
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
              <TableHead>Stacks</TableHead>
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
                  {getProjectStacks(project.id).map(stack => (
                    <div key={stack.id} className="flex items-center gap-2">
                      <span>{stack.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteStack(stack.id)}
                        className="h-6 px-2"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenStack(project.id)}
                  >
                    Add Stack
                  </Button>
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
              <div className="space-y-2">
                <label htmlFor="project-image" className="text-sm font-medium">Project Image</label>
                <input 
                  id="project-image" 
                  type="file" 
                  onChange={handleImageUpload}
                  className="w-full"
                  aria-label="Upload project image"
                />
              </div>
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Technologies utilisées</label>
              <div className="grid grid-cols-3 gap-2">
                {stacks.map((stack) => (
                  <label key={stack.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedStacks.includes(stack.id)}
                      onChange={() => handleStackChange(stack.id)}
                      className="form-checkbox"
                    />
                    <span>{stack.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={stackOpen} onOpenChange={setStackOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Stack</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddStack}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="stack" className="text-sm font-medium">Stack Name</label>
                <Input
                  id="stack"
                  value={stackName}
                  onChange={(e) => setStackName(e.target.value)}
                  required
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setStackOpen(false)}>
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

export default AdminProject;
