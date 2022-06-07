import Navroutes from '../../../common/Navroutes'
import { lazy } from 'react'

const EditAdComponent = lazy(() => import('../../../views/edit-ad'))
const EditAd = [
  {
    path: `${Navroutes.editAdDetail}:id`,
    element: <EditAdComponent />,
    meta: {
      menuHidden: true
    }
  }
]

export default EditAd
