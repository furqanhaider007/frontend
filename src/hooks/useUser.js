import { useContext } from 'react'
import { UserContext } from '../context'

const useUser = () => {
  const { user, setUser } = useContext(UserContext)

  const saveUser = (data) => {
    setUser(data)
    window.localStorage.setItem(process.env.REACT_APP_OLX_CLONE_USER_KEY, JSON.stringify(data))
  }

  const removeUser = () => {
    setUser(null)
    window.localStorage.removeItem(process.env.REACT_APP_OLX_CLONE_USER_KEY)
  }

  return { user, saveUser, removeUser }
}

export default useUser
