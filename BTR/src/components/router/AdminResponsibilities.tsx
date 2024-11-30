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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface TeamMember {
  id: number;
  name: string;
  title: string;
}

interface Responsibility {
  id: number;
  team_member_id: number;
  responsibility: string;
}

const AdminResponsibilities = () => {
  const [responsibilities, setResponsibilities] = useState<Responsibility[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedResponsibility, setSelectedResponsibility] = useState<Responsibility | null>(null);
  const [formData, setFormData] = useState({
    team_member_id: '',
    responsibility: '',
  });

  useEffect(() => {
    fetchResponsibilities();
    fetchTeamMembers();
  }, []);

  const fetchResponsibilities = async () => {
    try {
      const response = await axios.get('http://localhost:3500/responsibilities');
      setResponsibilities(response.data);
    } catch (error) {
      console.error('Error fetching responsibilities:', error);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get('http://localhost:3500/team');
      setTeamMembers(response.data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const handleOpen = (responsibility?: Responsibility) => {
    if (responsibility) {
      setSelectedResponsibility(responsibility);
      setFormData({
        team_member_id: responsibility.team_member_id.toString(),
        responsibility: responsibility.responsibility,
      });
    } else {
      setSelectedResponsibility(null);
      setFormData({
        team_member_id: '',
        responsibility: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedResponsibility(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMemberSelect = (value: string) => {
    setFormData(prev => ({
      ...prev,
      team_member_id: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        team_member_id: parseInt(formData.team_member_id),
      };

      if (selectedResponsibility) {
        await axios.put(`http://localhost:3500/responsibilities/${selectedResponsibility.id}`, payload);
      } else {
        await axios.post('http://localhost:3500/responsibilities', payload);
      }
      fetchResponsibilities();
      handleClose();
    } catch (error) {
      console.error('Error saving responsibility:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this responsibility?')) {
      try {
        await axios.delete(`http://localhost:3500/responsibilities/${id}`);
        fetchResponsibilities();
      } catch (error) {
        console.error('Error deleting responsibility:', error);
      }
    }
  };

  const getMemberName = (memberId: number) => {
    const member = teamMembers.find(m => m.id === memberId);
    return member ? member.name : 'Unknown Member';
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Responsibilities Management</h1>
        <Button onClick={() => handleOpen()}>Add New Responsibility</Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team Member</TableHead>
              <TableHead>Responsibility</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responsibilities.map((responsibility) => (
              <TableRow key={responsibility.id}>
                <TableCell>{getMemberName(responsibility.team_member_id)}</TableCell>
                <TableCell>{responsibility.responsibility}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleOpen(responsibility)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDelete(responsibility.id)}>Delete</Button>
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
            <DialogTitle>{selectedResponsibility ? 'Edit Responsibility' : 'Add New Responsibility'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Team Member</label>
                <Select
                  value={formData.team_member_id}
                  onValueChange={handleMemberSelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id.toString()}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="responsibility" className="text-sm font-medium">Responsibility</label>
                <Input
                  id="responsibility"
                  name="responsibility"
                  value={formData.responsibility}
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

export default AdminResponsibilities;
