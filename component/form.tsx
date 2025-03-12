
"use client";
import { useState } from "react";
import React from 'react'
import Link from "next/link";
import { signUp,login } from "auth/action";
import { redirect } from "next/navigation";



export const LoginForm = () => {
  // État du formulaire
  const [formData, setFormData] = useState({ login:"", password: "" });
  const [error, setError] = useState<string | null>(null);
  
  // Gestion des changements
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      const data = {
          login: formData.login,
          password: formData.password
      };
      const value = await login(data);
      setError(value);
      if(value===null){
          alert("vous êtes connecté");
      }
  };
  return (
    <div className="bg-[#302F2F] p-8 shadow-lg w-100 h-100 rounded-2xl">
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
        <button
          type="submit"
          className="w-50 text-md py-auto px-auto bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Connexion
        </button>
      </form>

      {/* Lien vers l'inscription */}
      <div className="mt-4 text-center">
        <Link href="/inscription" className="text-sm text-white hover:underline">
          Vous n&apos;avez pas de compte ? S&apos;inscrire
        </Link>
      </div>
    </div>
  );
};


  
  export const InscriptionForm =() => {

    // État du formulaire
    const [formData, setFormData] = useState({ email: "",identifiant:"", password: "",passwordConfirmation:"" });
    const [error, setError] = useState<string | null>(null);
  
    // Gestion des changements
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const data = {
            email: formData.email,
            identifiant: formData.identifiant,
            password: formData.password
        };
        const value= await signUp(data);
        setError(value);
        if(value===null){
            redirect("/");
        }
    };
  

    return (
      <div className="bg-[#302F2F] p-8 shadow-lg w-100 h-125 rounded-2xl">
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
                  type="identifiant"
                  name="identifiant"
                  required
                  placeholder="identifiant"
                  pattern="^[a-zA-Z0-9_-]+$"
                  title="seul les lettre , les chiffres et les caractères _ et - sont autorisés"
                  value={formData.identifiant}
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
              <button
                type="submit"
                className=" w-50 text-md py-auto px-auto bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                S&apos;inscrire
              </button>
            </form>
          {/* Lien vers la connexion */}
          <div className="mt-4 text-center">
        <Link href="/" className="text-sm text-white hover:underline">
          Vous êtes déjà inscrit ? Se connecter
        </Link>
      </div>
      <div className="mt-4 text-center">
  </div>
        </div>
    );
  }
  

