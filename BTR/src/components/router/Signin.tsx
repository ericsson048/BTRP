import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Définir un type pour les données décodées
interface DecodedToken {
  name: string;
  email: string;
  picture: string;
}

interface ApiResponse {
  error?: string;
  data: any;
}

type FormData ={
  name: string;
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Le nom est requis"),
  email: yup
    .string()
    .email("L'email est invalide")
    .required("L'email est requis"),
  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Le mot de passe est requis"),
})

function Signin() {
  const [error, setError] = useState<string | null>(null);
  const [Private, setPrivate] = useState<boolean>(true)
  const [Loader, setLoader] = useState<boolean>(false)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
      resolver: yupResolver(validationSchema)
    });  

  const { toast } = useToast()
  const navigate = useNavigate()


  let Icon =MdVisibilityOff
  
  if(!Private){
    Icon =MdVisibility
  }

  // Fonction pour gérer la réponse de Google
  const handleGoogleResponse = async (credential: string) => {
    try {
      // Décodage du token JWT renvoyé par Google
      const decoded: DecodedToken = jwtDecode(credential);

      console.log("Données décodées :", decoded);

      // Envoi des données au backend pour l'enregistrement ou la connexion
     
      const response = await axios.post("http://localhost:3500/authentification", {
        name: decoded.name,
        email: decoded.email,
        image: decoded.picture,
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      console.log("Réponse du backend :", response.data);
      setError(null); // Réinitialiser les erreurs en cas de succès
      navigate('/log-in');
    } catch (err: any) {
      console.error("Erreur lors de l'envoi des données :", err);

      // Gestion des erreurs côté client
      if (err.response) {
        setError(`Erreur du serveur : ${err.response.data.message || "Erreur inconnue."}`);
      } else if (err.request) {
        setError("Le serveur n'a pas répondu. Veuillez réessayer.");
      } else {
        setError("Une erreur inconnue est survenue.");
      }
    }
  };

  const onSubmit = async (data: FormData) => {

    try {
      const res = await axios.post<ApiResponse>("http://localhost:3500/auth/sign-in", {
        name: data.name,
        email: data.email,
        password: data.password,
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!res.data.error) {
        navigate("/log-in");
        toast({
          title: "Connection reusit avec success",
          description: "Bienvenue sur notre plateform Iwacu",
        })
      } else {
        setError(res.data.error);
        toast({
          title: "error",
          description: res.data.error,
        })
      }
    } catch (err) {
      toast({
        title: "error",
        description: "Something went wrong!",
      })
      setError("Something went wrong!");
    }
  };


  return (
    <div className="grid place-content-center w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-3 space-y-2 py-4 px-6 shadow-md rounded-lg my-11">
        <h1 className="text-3xl font-momo ">Inscrivez-vous</h1>
       <div className="flex flex-col gap-2">
       <label htmlFor="name">Name:</label>
       <input 
         type="text" 
         id="name"
         {...register("name")}
         placeholder="entre votre nom"  
         className="py-2 px-4 text-xl outline-primary border rounded-lg"
       />
       {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
       </div>
       <div className="flex flex-col gap-2">
       <label htmlFor="email">Email:</label>
       <input 
         type="email" 
         id="email"
         {...register("email")}
         placeholder="entre votre email"  
         className="py-2 px-4 text-xl outline-primary border rounded-lg"
       />
       {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
       </div>
       <div className="flex flex-col gap-2">
       <label htmlFor="password">Password:</label>
       <span className="relative">
        <input 
          type={Private ? "password":"text"} 
          id="password"
          {...register("password")}
          placeholder="entre votre password"  
          className="py-2 px-4 text-xl outline-primary border rounded-lg"
        />
        <Icon onClick={()=>setPrivate(!Private)} className="absolute right-5 top-4 size-4"/>
       </span>
       {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
       </div>
       <Button className="text-xl py-2 px-4 w-full" onClick={()=>setLoader(true)}>{Loader ? "en cours...":"Connection"}</Button>
       <p className="flex">j'ai deja un compte <Link to={"/log-in"} className="text-primary mx-1">ici...</Link></p>
      <div>
      {/* Composant Google Login */}
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (!credentialResponse?.credential) {
            setError("Aucune donnée de connexion reçue.");
            return;
          }

          // Appeler la fonction pour gérer la réponse
          handleGoogleResponse(credentialResponse.credential);
        }}
        onError={() => {
          setError("Échec de la connexion avec Google.");
        }}

      />

      {/* Affichage des erreurs */}
      {error && <p className="text-red-700">{error}</p>}
    </div>
    </form>
    </div>
  );
}

export default Signin;