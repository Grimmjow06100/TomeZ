
"use client";
import { useState } from "react";
import React from 'react';
import { redirect } from "next/navigation";
import {motion,AnimatePresence} from 'framer-motion';

type LoginFormProps = {
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginForm = ({ setIsRegistering }: LoginFormProps) => {
  // État du formulaire
  const [formData, setFormData] = useState({ login:"", password: "" });
  const [error, setError] = useState<string | null>(null);
  
  // Gestion des changements
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: formData.login, password: formData.password }),
    });

    if (res.status=== 200) {
      redirect("/private");
   
    } else {
      const data = await res.json();
      setError(data.error);
    }
    
  }
  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    setIsRegistering(true);
  }

  return (
    <AnimatePresence>
    <motion.div 
      className="bg-[#302F2F] p-8 shadow-lg w-100 h-100 rounded-2xl"
      initial={{ scale: 0 ,rotate:"0deg",y:0}}
      animate={{ scale: 1 ,rotate:"0deg",y:[0,150,-150,-150,0]}}
      exit={{ scale: 0 ,rotate:"0deg",y:0}}
      transition={{ duration: 1 ,ease :"easeInOut"}}
      >
      <div className="mb-10 flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-white">Se connecter</h1>
        {error && <p className="text-red-500 text-sm mt-8 mx-auto my-auto">{error}</p>}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {/* Champ Email */}
        <div className="mb-4">
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
            placeholder="email ou identifiant"
            className="block w-70 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm"
          />
        </div>
        {/* Champ Mot de passe */}
        <div className="mb-10">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            title="le mot de passe doit faire au moins 8 caractères et doit contenir au moins une majuscule et un caractère spécial"
            placeholder="mot de passe"
            className="block w-70 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm"
          />
        </div>

        {/* Bouton de soumission */}
        <motion.button
        type="submit"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 ,rotate:"2.5deg"}}
        className="w-50 text-md py-auto px-auto bg-indigo-600 text-white rounded-full 
                     focus:ring-2 focus:ring-indigo-500 
                    active:bg-indigo-800 "
                    >
        Connexion
      </motion.button>
      
      </form>

      {/* Lien vers l'inscription */}
      <div className="mt-4 text-center">
        <button onClick={handleClick} className="text-sm text-white hover:underline">
          Vous n&apos;avez pas de compte ? S&apos;inscrire
        </button>
      </div>
    </motion.div>
    </AnimatePresence>
  );
};


  
  export const InscriptionForm =({ setIsRegistering }: LoginFormProps) => {

    // État du formulaire
    const [formData, setFormData] = useState({ email: "",username:"", password: "",passwordConfirmation:"" });
    const [error, setError] = useState<string | null>(null);
  
    // Gestion des changements
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      setError(null);
  
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: formData.email, 
          username: formData.username,
          password: formData.password }),
      });
  
      if (res.ok) {
        console.log("Inscription réussie");
        setIsRegistering(false);
      } else {
        const data = await res.json();
        setError(data.error);
      }
    };
    function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
      setIsRegistering(false);
    }
  

    return (
      <AnimatePresence>
        <motion.div 
          className="bg-[#302F2F] p-8 shadow-lg w-100 h-125 rounded-2xl"
          initial={{ scale: 0 ,rotate:"0deg",y:0}}
          animate={{ scale: 1 ,rotate:"0deg",y:[0,150,-150,-150,0]}}
          exit={{ scale: 0 ,rotate:"0deg",y:0}}
          transition={{ duration: 1 ,ease :"easeInOut"}}
          >
            <div className="mb-10 flex flex-col items-center">
              <h1 className="text-3xl font-semibold text-white">Inscription</h1>
              {error && <p className="text-red-500 text-sm mt-8 mx-auto my-auto">{error}</p>}
            </div>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                {/* Champ Email */}
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-70 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="username"
                    required
                    placeholder="identifiant"
                    pattern="^[a-zA-Z0-9_-]+$"
                    title="seul les lettre , les chiffres et les caractères _ et - sont autorisés"
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-70 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="le mot de passe doit faire au moins 8 caractères et doit contenir au moins une majuscule et un caractère spécial"
                    className="block w-70 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm"
                  />
                </div>
                <div className="mb-10">
                  <input
                    type="password"
                    name="passwordConfirmation"
                    value={formData.passwordConfirmation}
                    onSubmit={(e) => {
                      const input = e.target as HTMLInputElement;
                      input.setCustomValidity(input.value !== formData.password ? 'Les mots de passe doivent être identiques' : '');
                    }}
              
                    onChange={handleChange}
                    required
                    placeholder="confirmation mot de passe"
                    className="block w-70 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm"
                  />
                </div>
      
                {/* Bouton de soumission */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 ,rotate:"2.5deg"}}
                    className="w-50 text-md py-auto px-auto bg-indigo-600 text-white rounded-full 
                      focus:ring-2 focus:ring-indigo-500 
                      active:bg-indigo-800 "
                      >
                  S&apos;inscrire
                </motion.button>
              </form>
            {/* Lien vers la connexion */}
            <div className="mt-4 text-center">
              <button onClick={handleClick} className="text-sm text-white hover:underline">
                Vous êtes déjà inscrit ? Se connecter
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
    );

  }
  

