import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Publication {
    id: number;
    title: string;
    description: string;
    date: string;
    image: string;
    category: string;
    author?: string;
}

export default function AdminPublications() {
    const { userDetails, addUserDetailsToRequest } = useAuth();
    const [publications, setPublications] = useState<Publication[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        image: '',
        category: '',
        author: ''
    });

    useEffect(() => {
        fetchPublications();
    }, []);

    const fetchPublications = async () => {
        try {
            const response = await fetch('http://localhost:3500/publications', {
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to fetch publications');
            const data = await response.json();
            setPublications(data);
        } catch (error) {
            console.error('Error:', error);
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de charger les publications"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = selectedPublication
                ? `http://localhost:3500/publications/${selectedPublication.id}`
                : 'http://localhost:3500/publications';
            
            const method = selectedPublication ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(addUserDetailsToRequest({
                    publication: {
                        title: formData.title,
                        description: formData.description,
                        date: formData.date,
                        image: formData.image,
                        category: formData.category,
                        author: userDetails?.name || formData.author
                    }
                }))
            });

            if (!response.ok) throw new Error('Failed to save publication');

            toast({
                title: "Succès",
                description: selectedPublication 
                    ? "Publication mise à jour avec succès"
                    : "Publication créée avec succès"
            });

            setIsDialogOpen(false);
            fetchPublications();
            resetForm();
        } catch (error) {
            console.error('Error:', error);
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Erreur lors de la sauvegarde"
            });
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')) return;

        try {
            const response = await fetch(`http://localhost:3500/publications/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to delete publication');

            toast({
                title: "Succès",
                description: "Publication supprimée avec succès"
            });

            fetchPublications();
        } catch (error) {
            console.error('Error:', error);
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Erreur lors de la suppression"
            });
        }
    };

    const handleEdit = (publication: Publication) => {
        setSelectedPublication(publication);
        setFormData({
            title: publication.title,
            description: publication.description,
            date: publication.date,
            image: publication.image,
            category: publication.category,
            author: publication.author || ''
        });
        setIsDialogOpen(true);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            date: '',
            image: '',
            category: '',
            author: ''
        });
        setSelectedPublication(null);
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestion des Publications</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={resetForm}>
                            Nouvelle Publication
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {selectedPublication ? 'Modifier la Publication' : 'Nouvelle Publication'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Titre</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image">Image URL</Label>
                                <Input
                                    id="image"
                                    value={formData.image}
                                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Catégorie</Label>
                                <Input
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="author">Auteur</Label>
                                <Input
                                    id="author"
                                    value={formData.author}
                                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {selectedPublication ? 'Mettre à jour' : 'Créer'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Titre</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Auteur</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {publications.map((publication) => (
                        <TableRow key={publication.id}>
                            <TableCell>{publication.title}</TableCell>
                            <TableCell>{publication.category}</TableCell>
                            <TableCell>{new Date(publication.date).toLocaleDateString()}</TableCell>
                            <TableCell>{publication.author || '-'}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(publication)}
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(publication.id)}
                                    >
                                        Supprimer
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
