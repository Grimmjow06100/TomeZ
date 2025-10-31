
"use client";
import { useState } from "react";
import {motion,AnimatePresence} from 'framer-motion';


export const LoginForm = () => {
  // État du formulaire
  const [formData, setFormData] = useState({ login:"", password: "" });
  const [error, setError] = useState<string | null>(null);
  



  return (
    <AnimatePresence>
    <motion.div 
      className="bg-[#302F2F] p-10  w-auto h-auto rounded-2xl "
      initial={{ scale: 0 ,rotate:"0deg",y:0}}
      animate={{ scale: 1 ,rotate:"0deg",y:[0,150,-150,-150,0]}}
      exit={{ scale: 0 ,rotate:"0deg",y:0}}
      transition={{ duration: 1 ,ease :"easeInOut"}}
      >
      <div className="mb-10 flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-white">Se connecter</h1>
        {error && <p className="text-sm mt-8 mx-auto my-auto">{error}</p>}
      </div>
      <form  className="flex flex-col items-center">
        {/* Champ Email */}
        <div className="mb-4">
          <input
            type="text"
            name="login"
            value={formData.login}
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
        whileTap={{ scale: 0.9 }}
        className="w-70 h-10 text-md cursor-pointer py-auto px-auto bg-indigo-600 text-white rounded-full 
                    focus:ring-2 focus:ring-indigo-500 
                    active:bg-indigo-800 "
                    >
             Connexion
      </motion.button>
      </form>
      {/* Lien vers l'inscription */}
      <div className="mt-4 text-center">
        <button  className="text-sm text-white hover:underline">
            Vous n&apos;avez pas de compte ? S&apos;inscrire
        </button>
      </div>
    </motion.div>
    </AnimatePresence>
  );
};


  
  export const InscriptionForm =() => {

    // État du formulaire
    const [formData, setFormData] = useState({ email: "",username:"", password: "",passwordConfirmation:"" });
   
  

    return (
      <AnimatePresence>
        <motion.div 
          className="bg-[#302F2F] p-10  w-auto h-auto rounded-2xl"
          initial={{ scale: 0 ,rotate:"0deg",y:0}}
          animate={{ scale: 1 ,rotate:"0deg",y:[0,150,-150,-150,0]}}
          exit={{ scale: 0 ,rotate:"0deg",y:0}}
          transition={{ duration: 1 ,ease :"easeInOut"}}
          >
            <div className="mb-10 flex flex-col items-center">
              <h1 className="text-3xl font-semibold text-white">Inscription</h1>
              {false && <p className=" text-sm mt-8 mx-auto my-auto">erreur</p>}
            </div>
              <form className="flex flex-col items-center">
                {/* Champ Email */}
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="email"
                    value={formData.email}
                    className="block w-70  h-10 p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm"
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
                    className="block w-70  h-10 p-4  border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="mot de passe"
                    value={formData.password}
                    pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="le mot de passe doit faire au moins 8 caractères et doit contenir au moins une majuscule et un caractère spécial"
                    className="block w-70  h-10 p-4  border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm"
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
                    required
                    placeholder="confirmation mot de passe"
                    className="block w-70  h-10 p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm"
                  />
                </div>
      
                {/* Bouton de soumission */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 ,rotate:"2.5deg"}}
                    className="w-70 h-10 text-md py-auto px-auto cursor-pointer  bg-indigo-600 text-white rounded-full 
                      focus:ring-2 focus:ring-indigo-500 
                      active:bg-indigo-800 "
                      >
                  S&apos;inscrire
                </motion.button>
              </form>
            {/* Lien vers la connexion */}
            <div className="mt-4 text-center">
              <button  className="text-sm text-white hover:underline">
                Vous êtes déjà inscrit ? Se connecter
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
    );

  }
  

