import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
  status: string;
}

function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUnreadCount = async () => {
    try {
      const response = await axios.get('http://localhost:3500/contacts/unread');
      if (response.data.success) {
        setUnreadCount(response.data.count);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3500/contacts');
      if (Array.isArray(response.data)) {
        setContacts(response.data);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les messages"
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await axios.put(`http://localhost:3500/contacts/${id}/status`, {
        status: 'read'
      });
      
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, status: 'read' } : contact
      ));
      
      // Update unread count
      fetchUnreadCount();

      toast({
        title: "Succès",
        description: "Message marqué comme lu"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le statut"
      });
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchUnreadCount();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96">Chargement...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Messages de Contact</h1>
        <Badge variant="secondary">
          {unreadCount} nouveau(x) message(s)
        </Badge>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  <Badge variant={contact.status === 'unread' ? 'default' : 'secondary'}>
                    {contact.status === 'unread' ? 'Non lu' : 'Lu'}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(contact.created_at)}</TableCell>
                <TableCell>{contact.name}</TableCell>
                <TableCell>
                  <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                    {contact.email}
                  </a>
                </TableCell>
                <TableCell className="max-w-md">
                  <div className="truncate">{contact.message}</div>
                </TableCell>
                <TableCell>
                  {contact.status === 'unread' && (
                    <button
                      onClick={() => markAsRead(contact.id)}
                      className="text-sm text-primary hover:underline"
                    >
                      Marquer comme lu
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AdminContacts;
