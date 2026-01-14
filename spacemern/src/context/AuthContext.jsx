import React, { createContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export const AuthContext = createContext({});

// 2 hours session timeout
const SESSION_TIMEOUT = 2 * 60 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     SESSION HELPERS
  ========================= */

  const setSession = () => {
    const expiryTime = Date.now() + SESSION_TIMEOUT;
    localStorage.setItem('sessionExpiry', expiryTime.toString());
  };

  const clearSession = () => {
    localStorage.removeItem('sessionExpiry');
  };

  /* =========================
     AUTO LOGOUT (TIMER ONLY)
  ========================= */

  useEffect(() => {
    const checkSessionExpiry = () => {
      const expiry = localStorage.getItem('sessionExpiry');
      if (expiry && Date.now() > parseInt(expiry)) {
        logout();
        alert('Your session has expired. Please log in again.');
      }
    };

    const interval = setInterval(checkSessionExpiry, 60000);
    return () => clearInterval(interval);
  }, []);

  /* =========================
     AUTH FUNCTIONS
  ========================= */

  const signup = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      // Save user info in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email,
        username,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      });

      setSession();
      return { success: true, user };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update last login (non-blocking)
      setDoc(
        doc(db, 'users', user.uid),
        { lastLogin: new Date().toISOString() },
        { merge: true }
      ).catch(console.error);

      setSession();
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      clearSession();
      setCurrentUser(null);
      setUserDetails(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  /* =========================
     FIREBASE AUTH LISTENER
     (NO SESSION CHECK HERE!)
  ========================= */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      if (user) {
        setCurrentUser(user);

        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserDetails(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }

      } else {
        setCurrentUser(null);
        setUserDetails(null);
        clearSession();
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  /* =========================
     CONTEXT VALUE
  ========================= */

  const value = {
    currentUser,
    userDetails,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: '#0a0e1a',
          color: '#06b6d4',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '16px' }}>🚀</div>
            <div>Loading SpaceScope...</div>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
