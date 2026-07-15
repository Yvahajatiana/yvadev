'use client';

import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Saisissez votre adresse e-mail.');
      return;
    }

    setStatus('loading');
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Merci pour votre inscription ! Consultez votre boîte mail pour la confirmer.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage('Une erreur est survenue. Réessayez dans quelques instants.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Une erreur est survenue. Réessayez dans quelques instants.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Votre adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={status === 'loading'}
          className="sm:w-auto"
        >
          {status === 'loading' ? 'Inscription...' : "S'inscrire"}
        </Button>
      </form>
      
      {message && (
        <p className={`mt-2 text-sm ${
          status === 'success' ? 'text-green-600' : 'text-red-600'
        }`}>
          {message}
        </p>
      )}
    </div>
  );
}
