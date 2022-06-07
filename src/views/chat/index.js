import { useEffect, useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Label, Input, Button, InputGroup, InputGroupText, Row, Col } from 'reactstrap'
import apiRoutes from '../../apiConfiguration/apiRoutes'
import ApiCall from '../../apiConfiguration/network'
import { Send } from 'react-feather'
import { useLoader, useUser } from '../../hooks'
import { useLocation } from 'react-router-dom'
import Avatar from '@components/avatar'

import { io } from 'socket.io-client'

const Chat = () => {
  const { setLoading } = useLoader()
  const location = useLocation()
  const { user } = useUser()
  const [open, setOpen] = useState(location?.state?.chatId)
  const [conversations, setConversations] = useState()
  const [messages, setMessages] = useState([])
  const [msg, setMsg] = useState('')

  const getMessages = async (id) => {
    setLoading(true)
    const response = await ApiCall.any(apiRoutes.GetMessages(id))
    setLoading(false)
    if (response !== -1) {
      setMessages(response.messages)
    }
  }

  const sendMessage = async () => {
    const response = await ApiCall.any(apiRoutes.CreateMessage, {}, { message: msg, conversationId: open })
    if (response !== -1) {
      setMsg('')
    }
  }

  const getConversations = async () => {
    setLoading(true)
    const response = await ApiCall.any(apiRoutes.GetUserConversations)
    setLoading(false)
    if (response !== -1) {
      setConversations(response.conversations)
    }
  }

  const toggle = (id) => {
    if (open === id) {
      setOpen()
    } else {
      setOpen(id)
      getMessages(id)
    }
  }

  useEffect(() => {
    getConversations()
    if (location?.state?.chatId) {
      getMessages(location?.state?.chatId)
    }
  }, [])

  useEffect(() => {
    const socketUrl = process.env.REACT_APP_OLX_SOCKET_PREFIX
    const newSocket = io(socketUrl)
    newSocket.on('connection')
    newSocket.on(`Conversation-${open}`, (message) => {
      setMessages((prevState) => {
        return [...prevState, message]
      })
    })
  }, [open])

  return (
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        {conversations?.map((conversation) => {
          return (
            <>
              <AccordionHeader targetId={conversation?.conversationId?._id}>{conversation.conversationId?.chatRoomName}</AccordionHeader>
              <AccordionBody className="text-center" accordionId={conversation?.conversationId?._id}>
                <>
                  {messages?.length === 0 ? (
                    <strong className="w-100 text-center">You have no messages.</strong>
                  ) : (
                    <>
                      {messages.map((message) => {
                        console.log({ user, message })
                        return message?.userId?._id === user._id ? (
                          <div className="d-flex mt-1 align-items-center justify-content-end">
                            <div className="bg-primary shadow-lg p-2 rounded text-white me-1">{message.message}</div>
                            <div>
                              <Avatar color="secondary" content={message?.userId?.fullName} initials />
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex mt-1  align-items-center justify-content-start">
                            <div>
                              <Avatar className="me-1" color="secondary" content={message?.userId?.fullName} initials />
                            </div>
                            <div className="bg-wheat shadow-lg p-2 rounded text-dark">{message.message}</div>
                          </div>
                        )
                      })}
                    </>
                  )}
                  <div className="d-flex mt-3">
                    <InputGroup className="input-group-merge me-1 form-send-message">
                      <Input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type your message" />
                      <InputGroupText>
                        <Label className="attachment-icon mb-0" for="attach-doc">
                          <input type="file" id="attach-doc" hidden />
                        </Label>
                      </InputGroupText>
                    </InputGroup>
                    <Button
                      className="send"
                      color="primary"
                      onClick={() => {
                        if (msg === '') {
                          window.alert("Can't send empty message")
                        } else {
                          sendMessage()
                        }
                      }}
                    >
                      <Send size={14} className="d-lg-none" />
                      <span className="d-none d-lg-block">Send</span>
                    </Button>
                  </div>
                </>
              </AccordionBody>
            </>
          )
        })}
      </AccordionItem>
    </Accordion>
  )
}

export default Chat
