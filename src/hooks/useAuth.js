import { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'

// get user data using useAuth hook
const useAuth = () => {
  const auth = useContext(AuthContext)
  return auth
}

export default useAuth