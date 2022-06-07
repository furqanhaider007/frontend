import React, { useEffect, useState } from 'react'

// ** Styles
import '@styles/base/pages/page-blog.scss'
import apiRoutes from '../../apiConfiguration/apiRoutes'
import ApiCall from '../../apiConfiguration/network'
import { Button, Card, CardBody, CardFooter, CardImg, CardText, CardTitle, Col, Row } from 'reactstrap'
import Avatar from '@components/avatar'
import Navroutes from '../../common/Navroutes'
import { Link, useNavigate } from 'react-router-dom'
import { useLoader, useUser } from '../../hooks'

function MyProducts() {
  const { setLoading } = useLoader()
  const navigate = useNavigate()
  const { user } = useUser()
  const [products, setProducts] = useState(null)

  const getProducts = async () => {
    setLoading(true)
    const response = await ApiCall.any(apiRoutes.GetProductsByUser)
    setLoading(false)
    if (response !== -1) {
      setProducts(response.products)
    }
  }

  const deleteProduct = async (productId) => {
    setLoading(true)
    const response = await ApiCall.any(apiRoutes.DeleteProduct(productId))
    setLoading(false)
    if (response !== -1) {
      getProducts()
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const renderRenderList = () => {
    return products?.map((product) => {
      return (
        <Col key={product._id} md="6">
          <Card>
            <Link to={`${Navroutes.adDetail}${product._id}`}>
              <CardImg className="img-fluid" src={`${process.env.REACT_APP_OLX_CLONE_PREFIX}${product.image}`} alt={product.name} top style={{ height: '200px', objectFit: 'cover' }} />
            </Link>
            <CardBody>
              <CardTitle tag="h4">
                <Link className="blog-title-truncate text-body-heading" to={`${Navroutes.adDetail}${product._id}`}>
                  {product.name} (PKR {product.price})
                </Link>
              </CardTitle>
              <div className="d-flex align-items-center">
                <Avatar color="secondary" content={user.fullName} initials imgHeight="24" imgWidth="24" />
                <div>
                  <small className="text-muted me-25">&nbsp;by</small>
                  <small>
                    <a className="text-body">{user.fullName}</a>
                  </small>
                  <span className="text-muted ms-50 me-25">|</span>
                  <small className="text-muted">{product.created_at}</small>
                </div>
              </div>
              <CardText className="blog-content-truncate">{product.description}</CardText>
              <hr />
            </CardBody>
            <CardFooter>
              <div className="d-flex justify-content-between">
                <Button.Ripple
                  size="small"
                  color="warning"
                  onClick={() => {
                    navigate(Navroutes.editAdDetail + product._id)
                  }}
                >
                  Edit
                </Button.Ripple>
                <Button.Ripple
                  size="small"
                  color="danger"
                  onClick={() => {
                    deleteProduct(product._id)
                  }}
                >
                  Delete
                </Button.Ripple>
              </div>
            </CardFooter>
          </Card>
        </Col>
      )
    })
  }
  return (
    <>
      <div className="blog-wrapper">
        <div className="content-detached content-left">
          <div className="content-body">
            <div className="blog-list-wrapper">
              <Row>{renderRenderList()}</Row>
            </div>
          </div>
        </div>
        <div>This Screen lists the products which are added by you, you can edit or delete a product from here.</div>
      </div>
    </>
  )
}

export default MyProducts
