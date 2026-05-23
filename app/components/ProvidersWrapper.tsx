"use client";

import React from 'react';
import { SessionProvider } from "next-auth/react";
import { AlertProvider } from '../context/AlertContext';

interface ProvidersWrapperProps {
  children: React.ReactNode;
}

export default function ProvidersWrapper({ children }: ProvidersWrapperProps) {
  return (
    <SessionProvider>
      <AlertProvider>
        {children}
      </AlertProvider>
    </SessionProvider>
  );
}