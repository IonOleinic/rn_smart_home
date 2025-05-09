import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'
const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [persist, setPersist] = useState(null)
  const isLoggedIn = auth.accessToken ? true : false

  useEffect(() => {
    AsyncStorage.setItem('persist', JSON.stringify(persist))
  }, [persist])

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, persist, setPersist, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
