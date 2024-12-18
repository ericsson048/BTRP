import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Menu, X, Mail } from "lucide-react";

export default function AdminLayout() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const userDetailsStr = localStorage.getItem('userDetails');
                if (!userDetailsStr) {
                    throw new Error('Non autorisé');
                }
                
                const userDetails = JSON.parse(userDetailsStr);
                
                const response = await fetch('http://localhost:3500/auth/check-admin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ email: userDetails.email })
                });

                if (!response.ok) {
                    throw new Error('Non autorisé');
                }

                const data = await response.json();
                if (data.role !== 'admin') {
                    throw new Error('Non autorisé');
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error checking admin status:', error);
                toast({
                    variant: "destructive",
                    title: "Accès refusé",
                    description: "Vous devez être administrateur pour accéder à cette page"
                });
                navigate('/');
            }
        };

        checkAdmin();
    }, [navigate, toast]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl">Chargement...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex justify-between w-full items-center">
                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                            >
                                
                                {isMenuOpen ? (
                                    <X className="block h-6 w-6" />
                                ) : (
                                    <Menu className="block h-6 w-6" />
                                )}
                                <span className="ml-3">Admin menu</span>
                            </button>
                            
                            {/* Desktop navigation */}
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link to="/admin" 
                                   className="hover:border-primary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    Dashboard
                                </Link>
                                <Link to="/admin/publications" 
                                   className="hover:border-primary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                    Publications
                                </Link>
                                <Link to="/admin/team" className="hover:border-primary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Team</Link>
                                <Link to="/admin/project" className="hover:border-primary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Projects</Link>
                                <Link to="/admin/users" className="hover:border-primary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Users</Link>
                                <Link to="/admin/project-stacks" className="hover:border-primary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Project Stacks</Link>
                                <Link to="/admin/responsibilities" className="hover:border-primary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Responsibilities</Link>
                                <Link to="/admin/contacts" className="hover:border-primary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Contacts</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
                    <div className="pt-2 pb-3 space-y-1">
                        <Link to="/admin" 
                            className="hover:bg-primary w-fit ml-3 rounded-lg duration-300 text-gray-900 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                            Dashboard
                        </Link>
                        <Link to="/admin/publications" 
                            className="hover:bg-primary w-fit ml-3 rounded-lg duration-300 text-gray-900 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                            Publications
                        </Link>
                        <Link to="/admin/team" 
                            className="hover:bg-primary w-fit ml-3 rounded-lg duration-300 text-gray-900 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                            Team
                        </Link>
                        <Link to="/admin/project" 
                            className="hover:bg-primary w-fit ml-3 rounded-lg duration-300 text-gray-900 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                            Projects
                        </Link>
                        <Link to="/admin/users" 
                            className="hover:bg-primary w-fit ml-3 rounded-lg duration-300 text-gray-900 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                            Users
                        </Link>
                        <Link to="/admin/project-stacks" 
                            className="hover:bg-primary w-fit ml-3 rounded-lg duration-300 text-gray-900 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                            Project Stacks
                        </Link>
                        <Link to="/admin/responsibilities" 
                            className="hover:bg-primary w-fit ml-3 rounded-lg duration-300 text-gray-900 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                            Responsibilities
                        </Link>
                        <Link to="/admin/contacts" 
                            className="hover:bg-primary w-fit ml-3 rounded-lg duration-300 text-gray-900 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                            Contacts
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
}
