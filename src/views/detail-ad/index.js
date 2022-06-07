import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiRoutes from '../../apiConfiguration/apiRoutes'
import ApiCall from '../../apiConfiguration/network'
import Breadcrumbs from '@components/breadcrumbs'
import { Button, Card, CardBody, CardFooter, CardImg, CardTitle, Col, Row } from 'reactstrap'
import Avatar from '@components/avatar'
import Navroutes from '../../common/Navroutes'
import { useLoader } from '../../hooks'

function DetailAd() {
  const { setLoading } = useLoader()
  const navigate = useNavigate()
  const params = useParams()

  const [product, setProduct] = useState(null)

  const getProduct = async () => {
    setLoading(true)
    const response = await ApiCall.any(apiRoutes.GetProduct(params.id))
    setLoading(false)
    if (response !== -1) {
      setProduct(response.product)
    }
  }

  const createChat = async () => {
    setLoading(true)
    const response = await ApiCall.any(apiRoutes.CreateChatRoom, {}, { productId: product._id, chatRoomName: product.name, productOwnerId: product.userId._id })
    setLoading(false)
    if (response !== -1) {
      console.log('response', response.conversation._id)
      navigate(Navroutes.chat, { state: { chatId: response.conversation._id } })
    }
  }

  useEffect(() => {
    getProduct()

    return () => {
      setProduct(null)
    }
  }, [])
  return (
    <>
      {product ? (
        <>
          <Breadcrumbs title={`Ad Detail of ${product.name}`} />
          <div className="blog-wrapper">
            <div className="content-detached ">
              <div className="content-body">
                <Row>
                  <Col sm="12">
                    <Card className="mb-3">
                      <CardImg src={`${process.env.REACT_APP_OLX_CLONE_PREFIX}${product.image}`} top style={{ height: '200px', objectFit: 'contain' }} />
                      <CardBody>
                        <CardTitle tag="h4">
                          {product.name} (PKR {product.price})
                        </CardTitle>
                        <div className="d-flex align-items-center">
                          <Avatar color="secondary" content={product.userId.fullName} initials imgHeight="24" imgWidth="24" />
                          <div>
                            <small className="text-muted me-25">&nbsp;by</small>
                            <small>
                              <a className="text-body">{product.userId.fullName}</a>
                            </small>
                            <span className="text-muted ms-50 me-25">|</span>
                            <small className="text-muted">{product.created_at}</small>
                          </div>
                        </div>
                        <div className="mt-2">{product.description}</div>
                      </CardBody>
                      <CardFooter>
                        <Button.Ripple
                          onClick={() => {
                            createChat()
                          }}
                          color="primary"
                        >
                          Chat
                        </Button.Ripple>
                      </CardFooter>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default DetailAd
