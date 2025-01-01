/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:48 PM - 12/11/2024
 * User: lam-nguyen
 **/
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as React from "react";

type AuthType = { user: null; signIn: (user: any) => void; signOut: () => void; loading: boolean; }
const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const signIn = (user: any) => {
	};

	const signOut = () => {
		setUser(null);
	};

	useEffect(() => {
		setLoading(false);
	}, []);

	return (
		<AuthContext.Provider value={{ user, signIn, signOut, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);