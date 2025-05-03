import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  EmailAuthProvider,
  updatePassword,
  getAuth,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthContext = React.createContext();

//auth context
export const useAuth = () => useContext(AuthContext);

//auth provider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, new GoogleAuthProvider());
  };

  const logoutUser = () => signOut(auth);

  const changeUserPassword = async (currentPassword, newPassword) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  };

  const value = {
    currentUser,
    registerUser,
    loginUser,
    signInWithGoogle,
    logoutUser,
    changeUserPassword,
    loading,
    getAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
