import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

function Contacts() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide"
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3500/contacts', formData);
      
      if (response.data.success) {
        toast({
          title: "Succès",
          description: "Votre message a été envoyé avec succès"
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: ""
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-md:flex-col flex-row items-center justify-between p-8 bg-white">
      <div className="w-full md:w-1/2">
        <h3 className="text-3xl font-bold mb-2">Besoin de nous pour un projet?</h3>
        <p className="mb-6 text-gray-500">
          Pour toute question, demande de partenariat ou pour explorer comment BTR peut vous accompagner dans votre transformation numérique, n'hésitez pas à nous contacter.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre Nom"
              className="w-full p-3 border rounded-md focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Votre Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Votre Message"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              rows={4}
            ></textarea>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="flex items-center px-6 py-4 text-white font-bold rounded-md hover:bg-primary/55 transition duration-200"
          >
            {loading ? "Envoi en cours..." : "Contactez Nous"} {!loading && <span className="ml-2">➔</span>}
          </Button>
        </form>
      </div>

      <div className="w-full h-full md:w-1/2 mt-8 md:mt-0 md:ml-8">
        <iframe
          title="Google Maps - MediaBoX"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5077.317395913779!2d29.367177!3d-3.383765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5b9b7af0b1c6a5d4!2sMediaBoX!5e0!3m2!1sfr!2sbi!4v1635277004706!5m2!1sfr!2sbi"
          width="100%"
          height="300"
          allowFullScreen={true}
          loading="lazy"
          className="rounded-md border border-gray-300"
        ></iframe>
      </div>
    </div>
  );
}

export default Contacts;