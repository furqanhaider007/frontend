import Navroutes from '../../../common/Navroutes'
import { lazy } from 'react'

const MyProductsComponent = lazy(() => import('../../../views/my-products'))
const MyProducts = [
  {
    path: Navroutes.myProducts,
    element: <MyProductsComponent />,
    meta: {
      menuHidden: true
    }
  }
]

export default MyProducts
