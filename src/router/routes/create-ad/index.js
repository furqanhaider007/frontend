import Navroutes from '../../../common/Navroutes'
import { lazy } from 'react'

const CreateAdComponent = lazy(() => import('../../../views/create-ad'))
const CreateAd = [
  {
    path: Navroutes.createAd,
    element: <CreateAdComponent />,
    meta: {
      menuHidden: true
    }
  }
]

export default CreateAd
