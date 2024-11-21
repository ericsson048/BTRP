import React, { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const DomainTransferForm = ({className}:{className:string}) => {
  const [domain, setDomain] = useState('');
  const [authCode, setAuthCode] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Domain:", domain);
    console.log("Auth Code:", authCode);
  };

  return (
    <div className={cn("flex w-full items-center justify-center flex-col p-8 bg-gray-50 min-h-screen",className)}>
      <h1 className="text-3xl font-semibold text-primary mb-2">Transférer du Domaine</h1>
      <p className="text-gray-700 mb-6">Transférez maintenant pour prolonger votre domaine d'un an !*</p>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Transfert de domaine unique</h2>
        <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
          Nom de domaine
        </label>
        <input
          type="text"
          id="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="example.com"
          className="w-full mt-1 mb-4 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
        
        <label htmlFor="authCode" className="block text-sm font-medium text-gray-700">
        Code d'autorisation
        </label>
        <input
          type="text"
          id="authCode"
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
          placeholder="Epp Code / Auth Code"
          className="w-full mt-1 mb-4 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />

        <Button
          type="submit"
          className="w-full py-2 rounded-md transition duration-200"
        >
          Ajouter au panier
        </Button>
      </form>
      <p className="mt-4 text-gray-500 text-sm">
        * Exclut certains TLD et domaines récemment renouvelés
      </p>
    </div>
  );
};

export default DomainTransferForm;
