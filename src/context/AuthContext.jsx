import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

    useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (usuario) => {

        setUser(usuario);
        setLoading(false);

    });

    return () => unsubscribe();

}, []);

    const cerrarSesion = async () => {
        await signOut(auth);
    };

    return (

        <AuthContext.Provider
            value={{
    user,
    loading,
    cerrarSesion
}}
        >
            {children}
        </AuthContext.Provider>

    );

}