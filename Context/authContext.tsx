import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from "firebase/auth";
import { Firestore, collection, doc, getDocs } from "firebase/firestore";
import { FireStore } from "../firebase/firebaseConfig"; 
import { addDoc,setDoc } from "firebase/firestore";

type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  logout: () => Promise<{ success: boolean; error?: any }>;
  register: (
    email: string,
    password: string,
    userName: string,
    profileUrl: string | null
  ) => Promise<{ success: boolean; error?: any }>;
  fetchUsers: () => Promise<{ success: boolean; users?: User[]; error?: any }>; // Updated type
};

const initialAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ success: false }),
  logout: async () => ({ success: false }),
  register: async () => ({ success: false }),
  fetchUsers: async () => ({ success: false }),
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(mapFirebaseUserToUser(firebaseUser));
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return subscriber; // unsubscribe on unmount
  }, []);

  const mapFirebaseUserToUser = (firebaseUser: any): User => ({
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
  });

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(mapFirebaseUserToUser(userCredential.user));
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error };
    }
  };

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(FireStore, 'users');
      const snapshot = await getDocs(usersCollection);
      const users = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data(),
      })) as User[]; // Type assertion

      return { success: true, users };
    } catch (error) {
      console.error('Error fetching users:', error);
      return { success: false, error };
    }
  };

  const register = async (
    email: string,
    password: string,
    userName: string,
    profileUrl: string | null
  ) => {
    try {
      if (!isValidEmail(email)) {
        throw new Error('Invalid email format');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: userName,
        photoURL: profileUrl,
      });

      setUser(mapFirebaseUserToUser(userCredential.user));
      setIsAuthenticated(true);
      await setDoc(doc(FireStore,"users",userCredential?.user?.uid),{
        userName,
        profileUrl,
        userId:userCredential?.user?.uid
      })
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error };
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout, register, fetchUsers }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return authContext;
};
