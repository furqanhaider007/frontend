import React, { useState, useEffect, Suspense } from 'react'

// ** Router Import
import Router from './router/Router'

// ** Routes & Default Routes
import { getRoutes } from './router/routes'

// ** Hooks Imports
import { useLayout } from '@hooks/useLayout'
import { AuthContext, LoaderContext, UserContext } from './context'

// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Loading-spinner'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [allRoutes, setAllRoutes] = useState([])

  useEffect(() => {
    const retreivedToken = window.localStorage.getItem(process.env.REACT_APP_OLX_CLONE_TOKEN_KEY)
    const userData = window.localStorage.getItem(process.env.REACT_APP_OLX_CLONE_USER_KEY)
    if (retreivedToken) {
      setToken(retreivedToken)
      setUser(JSON.parse(userData))
    }
  }, [])

  // ** Hooks
  const { layout } = useLayout()

  useEffect(() => {
    setAllRoutes(getRoutes(layout))
  }, [layout])

  return (
    <>
      <Spinner loading={loading} />
      <LoaderContext.Provider value={{ loading, setLoading }}>
        <UserContext.Provider value={{ user, setUser }}>
          <AuthContext.Provider value={{ token, setToken }}>
            <Suspense fallback={null}>
              <Router allRoutes={allRoutes} />
            </Suspense>
          </AuthContext.Provider>
        </UserContext.Provider>
      </LoaderContext.Provider>
    </>
  )
}

export default App
