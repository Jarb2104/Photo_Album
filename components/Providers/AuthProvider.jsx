'use client';
import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({ children, currentSession }) => {
	return <SessionProvider session={currentSession}>{children}</SessionProvider>;
};

export default AuthProvider;
