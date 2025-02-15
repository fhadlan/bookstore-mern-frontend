import React from "react";
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
} from "firebase/auth";
import { createContext, useContext } from "react";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();
export const useAuth = () => {
  return useContext(AuthContext);
};

//auth provider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  //register user
  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  //login user
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  //sign in with google
  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  //log out
  const logoutUser = () => {
    return signOut(auth);
  };

  //changeUserPassword
  const changeUserPassword = async (currentPassword, newPassword) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  };

  //manage user
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        const { email, displayName, photoURL } = user;
        const userData = { email, userName: displayName, photo: photoURL };
      }
    });
    return () => unsubscribe();
  });

  const value = {
    currentUser,
    registerUser,
    loginUser,
    signInWithGoogle,
    logoutUser,
    changeUserPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
