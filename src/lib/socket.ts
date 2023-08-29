import socket from 'socket.io-client';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const io = socket(NEXT_PUBLIC_API_URL);
