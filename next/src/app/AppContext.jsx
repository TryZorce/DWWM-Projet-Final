"use client"

import {createContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";

// Initialise le context
export const AppContext = createContext();

// Le context en lui même
export default function AppContextProvider({ children }) {
  const [authenticatedUser, setAuthenticatedUser] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  console.log('hello')

  
  useEffect(() => {
    const localStoredToken = window.localStorage.getItem('token')
    if (localStoredToken) {
      try {
        const decodedToken = jwtDecode(localStoredToken)

        if (decodedToken.exp < new Date().getTime()) {
          setAuthenticatedUser(true)
          setAuthLoading(false)
        } else {
          setAuthenticatedUser(false)
          setAuthLoading(false)
        }

      } catch (error) {
        console.log('TOKEN BROKEN')
      }
    } else {
      setAuthenticatedUser(false)
      setAuthLoading(false)
    }
  }, [])

  const sharedValues = {
    authenticatedUser,
    authLoading
  }

  return <AppContext.Provider value={sharedValues}>{children}</AppContext.Provider>
}