import useRefreshToken from '@/hooks/useRefreshToken'
import useAuth from '../../hooks/useAuth'
import useLogout from '@/hooks/useLogout'
import { useState, useEffect } from 'react'
import LoadingScreen from '../Layers/LoadingScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect } from 'expo-router'

function PersistLogin({ children }) {
  const [loading, setLoading] = useState(true)
  const { auth, setPersist } = useAuth()
  const logout = useLogout()
  const refresh = useRefreshToken()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      setLoading(true)
      const storedPersist = await AsyncStorage.getItem('persist')
      if (storedPersist !== null) {
        setPersist(JSON.parse(storedPersist))
      }
      if (JSON.parse(storedPersist)) {
        try {
          await refresh()
        } catch (error) {
          console.log(error)
        }
      } else {
        await logout()
      }
      setLoading(false)
    }
    !auth?.accessToken ? verifyRefreshToken() : setLoading(false)
  }, [])

  return loading ? (
    <LoadingScreen />
  ) : auth?.accessToken ? (
    <>{children}</>
  ) : (
    <Redirect href='/auth/signin' />
  )
}

export default PersistLogin
