import useAuth from '../../hooks/useAuth'
import { Redirect } from 'expo-router'

const RequireAuth = ({ children }) => {
  const { auth } = useAuth()
  return auth?.accessToken ? <>{children}</> : <Redirect href='/auth/signin' />
}

export default RequireAuth
