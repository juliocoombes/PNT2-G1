import React from 'react';
import { UserProvider } from './UserContext';
import { Stack } from 'expo-router';

export default function App() {
  return (
    <UserProvider>
      <Stack />
    </UserProvider>
  );
}
