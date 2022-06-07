import Navroutes from '../../../common/Navroutes'
import { lazy } from 'react'

const Home = lazy(() => import('../../../views/homepage'))
const HomePage = [
  {
    path: Navroutes.home,
    element: <Home />,
    meta: {
      menuHidden: true
    }
  }
]

export default HomePage
