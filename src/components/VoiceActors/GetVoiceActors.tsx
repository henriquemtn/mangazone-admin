'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { VoiceActor } from '@/types/types';

const GetVoiceActors: React.FC = () => {
  const [voiceActors, setVoiceActors] = useState<VoiceActor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoiceActors = async () => {
      try {
        const response = await axios.get<VoiceActor[]>('https://api-mangazone.onrender.com/api/voiceActors');
        const sortedVoiceActors = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setVoiceActors(sortedVoiceActors);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVoiceActors();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Voice Actors</h1>
      <ul>
        {voiceActors.map((voiceActor) => (
          <li key={voiceActor._id}>
            <Image src={voiceActor.photoUrl} alt={voiceActor.name} width="100" height="100" />
            <h2>{voiceActor.name}</h2>
            <p>{voiceActor.biography}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetVoiceActors;
