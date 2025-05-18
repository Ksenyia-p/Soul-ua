import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleAuthProvider } from '../FirebaseConfigs/FirebaseConfigs';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FirebaseConfigs/FirebaseConfigs";
// import { signInWithPopup } from "firebase/auth"; // если не используешь - можно убрать

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined); // undefined = ще не завантажено
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const userDocRef = doc(db, "users", firebaseUser.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    const userData = userDocSnap.exists()
                        ? { uid: firebaseUser.uid, email: firebaseUser.email, ...userDocSnap.data() }
                        : { uid: firebaseUser.uid, email: firebaseUser.email };

                    setUser(userData);
                } catch (error) {
                    console.error("Помилка при отриманні користувача з Firestore:", error);
                    setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsub;
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);