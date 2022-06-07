import Navroutes from '../../../common/Navroutes'
import { lazy } from 'react'

const DetailAdComponent = lazy(() => import('../../../views/detail-ad'))
const DetailAd = [
  {
    path: `${Navroutes.adDetail}:id`,
    element: <DetailAdComponent />,
    meta: {
      menuHidden: true
    }
  }
]

export default DetailAd
