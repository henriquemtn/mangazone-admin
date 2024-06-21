'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VoiceActor } from '@/types/types';

export default function VoiceActorIdPage({params}: any) {
    const voiceActorId = params.id;
    const [voiceActor, setVoiceActor] = useState<VoiceActor | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchVoiceActor = async () => {
        try {
          const response = await axios.get<VoiceActor>(`https://api-mangazone.onrender.com/api/voiceActors/${voiceActorId}`);
          setVoiceActor(response.data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchVoiceActor();
    }, [voiceActorId]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!voiceActor) {
      return <div>Voice Actor not found</div>;
    }
  
    return (
      <div>
        <h1>Voice Actor Details</h1>
        <h2>{voiceActor.name}</h2>
        <img src={voiceActor.photoUrl} alt={voiceActor.name} style={{ width: '200px', height: '200px' }} />
        <p>Birthday: {voiceActor.birthday}</p>
        <p>Nationality: {voiceActor.nationality}</p>
        <p>Favorites: {voiceActor.favorites.join(', ')}</p>
        <p>Biography: {voiceActor.biography}</p>
      </div>
    );
  };