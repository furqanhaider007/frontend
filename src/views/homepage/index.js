import React, { useEffect, useState } from 'react'

// ** Styles
import '@styles/base/pages/page-blog.scss'
import apiRoutes from '../../apiConfiguration/apiRoutes'
import ApiCall from '../../apiConfiguration/network'
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from 'reactstrap'
import Avatar from '@components/avatar'
import Sidebar from './Sidebar'
import Navroutes from '../../common/Navroutes'
import { Link } from 'react-router-dom'
import { useLoader } from '../../hooks'

function HomePage() {
  const { setLoading } = useLoader()
  const [products, setProducts] = useState([])
  const [state, setState] = useState({
    keys: '',
    locationId: ''
  })

  const handleInputChange = ({ target }) => {
    const { name, value } = target
    setState({ ...state, [name]: value })
  }

  const [locations, setLocations] = useState([])

  const getLocations = async () => {
    setLoading(true)
    const response = await ApiCall.any(apiRoutes.GetLocations)
    setLoading(false)
    if (response !== -1) {
      const tempLocations = response.locations.map((location) => {
        return { value: location._id, label: location.name }
      })
      setLocations(tempLocations)
    }
  }

  const getProducts = async () => {
    setLoading(true)
    const response = await ApiCall.any(apiRoutes.GetFilteredProducts, {}, { ...state })
    setLoading(false)
    if (response !== -1) {
      setProducts(response.products)
    }
  }

  useEffect(() => {
    getProducts()
    getLocations()
  }, [])

  const renderRenderList = () => {
    return products?.map((product) => {
      return (
        <Col key={product._id} md="6">
          <Card>
            <Link to={`${Navroutes.adDetail}${product._id}`}>
              <CardImg className="img-fluid" src={`${process.env.REACT_APP_OLX_CLONE_PREFIX}${product.image}`} alt={product.name} top style={{ height: '200px', objectFit: 'contain' }} />
            </Link>
            <CardBody>
              <CardTitle tag="h4">
                <Link className="blog-title-truncate text-body-heading" to={`${Navroutes.adDetail}${product._id}`}>
                  {product.name} (PKR {product.price})
                </Link>
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
              <CardText className="blog-content-truncate">{product.description}</CardText>
              <hr />
            </CardBody>
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
            <div className="blog-list-wrapper">{products?.length > 0 ? <Row>{renderRenderList()}</Row> : <Row>No Product</Row>}</div>
          </div>
        </div>
        <Sidebar state={state} handleInputChange={handleInputChange} locations={locations} getProducts={getProducts} />
      </div>
    </>
  )
}

export default HomePage
