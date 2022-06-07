import Navroutes from '../../../common/Navroutes'
import { lazy } from 'react'

const EditProfileComponent = lazy(() => import('../../../views/edit-profile'))
const EditProfile = [
  {
    path: Navroutes.editProfile,
    element: <EditProfileComponent />,
    meta: {
      menuHidden: true
    }
  }
]

export default EditProfile
