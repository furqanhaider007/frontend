import { useContext } from 'react'

import { AuthContext } from '../context'
import { useUser } from '.'

const useAuth = () => {
  const { token, setToken } = useContext(AuthContext)
  const { saveUser, removeUser } = useUser()

  const login = (tokenData, userData) => {
    if (tokenData) {
      setToken(tokenData)
      window.localStorage.setItem(process.env.REACT_APP_OLX_CLONE_TOKEN_KEY, tokenData)
    }
    if (userData) {
      saveUser(userData)
    }
  }

  const logout = () => {
    setToken(null)
    window.localStorage.removeItem(process.env.REACT_APP_OLX_CLONE_TOKEN_KEY)
    removeUser()
  }

  return { token, login, logout }
}

export default useAuth
