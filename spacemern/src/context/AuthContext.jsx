import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

// Session timeout duration (in milliseconds) - 2 hours
const SESSION_TIMEOUT = 2 * 60 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpiry, setSessionExpiry] = useState(null);

  // Check session expiry
  useEffect(() => {
    const checkSessionExpiry = () => {
      const expiry = localStorage.getItem('sessionExpiry');
      if (expiry) {
        const expiryTime = parseInt(expiry);
        if (Date.now() > expiryTime) {
          // Session expired
          logout();
          alert('Your session has expired. Please log in again.');
        }
      }
    };

    // Check expiry every minute
    const interval = setInterval(checkSessionExpiry, 60000);
    checkSessionExpiry(); // Check immediately on mount

    return () => clearInterval(interval);
  }, []);

  // Set session expiry time
  const setSession = () => {
    const expiryTime = Date.now() + SESSION_TIMEOUT;
    localStorage.setItem('sessionExpiry', expiryTime.toString());
    setSessionExpiry(expiryTime);
  };

  // Clear session
  const clearSession = () => {
    localStorage.removeItem('sessionExpiry');
    setSessionExpiry(null);
  };

  // Sign up function
  const signup = async (email, password, username) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with username
      await updateProfile(user, {
        displayName: username
      });

      // Store additional user details in Firestore (non-blocking)
      setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: email,
        username: username,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      }).catch(error => console.error('Error saving user details:', error));

      // Set session expiry
      setSession();

      return { success: true, user };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update last login time (non-blocking)
      setDoc(doc(db, 'users', user.uid), {
        lastLogin: new Date().toISOString()
      }, { merge: true }).catch(error => console.error('Error updating login time:', error));

      // Set session expiry
      setSession();

      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
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

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        // Check if session is still valid
        const expiry = localStorage.getItem('sessionExpiry');
        if (expiry && Date.now() < parseInt(expiry)) {
          setCurrentUser(user);
          
          // Fetch user details from Firestore (non-blocking)
          getDoc(doc(db, 'users', user.uid))
            .then(userDoc => {
              if (userDoc.exists()) {
                setUserDetails(userDoc.data());
              }
            })
            .catch(error => {
              console.error('Error fetching user details:', error);
            });
        } else {
          // Session expired
          await signOut(auth);
          clearSession();
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

  const value = {
    currentUser,
    userDetails,
    signup,
    login,
    logout,
    sessionExpiry
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
            <div style={{ marginBottom: '16px', animation: 'spin 1s linear infinite' }}>
              🚀
            </div>
            <div>Loading SpaceScope...</div>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
