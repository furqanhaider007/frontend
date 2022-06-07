import { useContext } from 'react'
import { LoaderContext } from '../context'

const useLoader = () => {
  const { loading, setLoading } = useContext(LoaderContext)

  return { setLoading, loading }
}

export default useLoader
