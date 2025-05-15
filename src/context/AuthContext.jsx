import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleAuthProvider } from '../FirebaseConfigs/FirebaseConfigs';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FirebaseConfigs/FirebaseConfigs";
// import { signInWithPopup } from "firebase/auth"; // если не используешь - можно убрать

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(async (user) => {
            if (user != null) {
                try {
                    const userDocRef = doc(db, "users", user.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        const userData = {
                            ...user,
                            ...userDocSnap.data()
                        };
                        setUser(userData);
                    } else {
                        setUser(user);
                    }
                } catch (error) {
                    console.error("Failed to fetch user data from Firestore:", error);
                    setUser(user);
                }
            } else {
                setUser(null);
                // При желании можно раскомментировать, чтобы сразу залогинить через Google
                // signInWithPopup(auth,googleAuthProvider).then(credentials => setUser(credentials.user)).catch(err => console.error(err));
            }
        });
        return unsub;
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
