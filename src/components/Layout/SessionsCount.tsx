'use client';

import { useEffect, useState } from 'react';

import { io } from '@/lib/socket';

export const SessionsCount = () => {
  const [sessions, setSessions] = useState<number>(0);

  useEffect(() => {
    io.on('active-session', ({ connections }: { connections: number }) => {
      setSessions(connections);
    });
    return () => {
      io.off('active-session');
    };
  }, []);

  return <p>Sessions: {sessions}</p>;
};
