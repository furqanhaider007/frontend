import Navroutes from '../../../common/Navroutes'
import { lazy } from 'react'

const ChatComponent = lazy(() => import('../../../views/chat'))
const Chat = [
  {
    path: Navroutes.chat,
    element: <ChatComponent />,
    meta: {
      menuHidden: true
    }
  }
]

export default Chat
