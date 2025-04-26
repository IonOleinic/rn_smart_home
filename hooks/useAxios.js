import axios from '../api/api'
import { useEffect } from 'react'
import useAuth from './useAuth'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

function useAxios() {
  const { setAuth } = useAuth()
  const router = useRouter()
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      async (config) => {
        const userId = await AsyncStorage.getItem('userId')
        if (userId) {
          config.params = { ...config.params, user_id: userId }
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          //token expired or user has been lost its token
          if (setAuth) {
            setAuth({})
          }
          router.replace('/auth/signin')
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axios.interceptors.response.eject(requestInterceptor)
      axios.interceptors.response.eject(responseIntercept)
    }
  }, [])

  return axios
}

export default useAxios
