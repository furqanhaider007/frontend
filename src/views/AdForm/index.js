import React, { useEffect, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/react/libs/editor/editor.scss'
import '@styles/base/plugins/forms/form-quill-editor.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/base/pages/page-blog.scss'
import { Button, Card, CardBody, CardFooter, Col, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap'
import apiRoutes from '../../apiConfiguration/apiRoutes'
import ApiCall from '../../apiConfiguration/network'
import { useNavigate, useParams } from 'react-router-dom'
import Navroutes from '../../common/Navroutes'
import { useLoader } from '../../hooks'

function AdForm({ mode = 'ADD' }) {
  const { setLoading } = useLoader()
  const params = useParams()
  const navigate = useNavigate()
  const [state, setState] = useState({
    name: '',
    price: '',
    description: ''
  })

  const [productImage, setProductImage] = useState(null)
  const [previewImage, setPreviewImage] = useState()

  const handleInputChange = ({ target }) => {
    const { name, value } = target
    setState({ ...state, [name]: value })
  }

  const getSingleProduct = async () => {
    setLoading(true)
    const response = await ApiCall.any(apiRoutes.GetProduct(params.id))
    setLoading(false)
    if (response !== -1) {
      setState({ name: response.product.name, price: response.product.price, description: response.product.description })
      setPreviewImage(process.env.REACT_APP_OLX_CLONE_PREFIX + response.product.image)
    }
  }

  useEffect(() => {
    if (params.id && mode === 'EDIT') {
      getSingleProduct()
    }
  }, [])

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const reader = new FileReader()
      const file = e.target.files[0]
      reader.onloadend = () => {
        setProductImage(file)
        setPreviewImage(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  const handlePostAd = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('name', state.name)
    formData.append('price', state.price)
    formData.append('description', state.description)
    if (productImage) {
      formData.append('image', productImage)
    }

    const response = await ApiCall.any(mode === 'EDIT' ? apiRoutes.EditProduct(params.id) : apiRoutes.CreateProduct, {}, formData)
    setLoading(false)
    if (response !== -1) {
      navigate(mode === 'EDIT' ? Navroutes.myProducts : Navroutes.home)
    }
  }

  return (
    <div className="blog-edit-wrapper">
      <Breadcrumbs title={mode === 'EDIT' ? 'Edit Ad' : 'Create Ad'} />
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <Row>
                <Col md={6} className="mb-2">
                  <Label className="form-label" for="blog-edit-title">
                    Name
                  </Label>
                  <Input id="blog-edit-title" name="name" value={state.name} onChange={handleInputChange} />
                </Col>
                <Col md={6} className="mb-2">
                  <Label className="form-label" for="blog-edit-price">
                    Price
                  </Label>
                  <InputGroup className="input-group-merge">
                    <InputGroupText>PKR</InputGroupText>
                    <Input id="blog-edit-price" name="price" value={state.price} onChange={handleInputChange} />
                  </InputGroup>
                </Col>
                <Col md={12} className="mb-2">
                  <Label className="form-label" for="blog-edit-price ">
                    Description
                  </Label>
                  <Input type="textarea" maxLength="250" name="description" value={state.description} onChange={handleInputChange} />
                  <span>Max length : 250 words</span>
                </Col>
                <Col md={12} className="mb-2">
                  <Label className="form-label" for="inputFile">
                    Product Image
                  </Label>
                  <Input type="file" id="inputFile" label={productImage?.name} onChange={handleImageChange} />
                </Col>
              </Row>
              <Row>
                <img src={previewImage} alt={productImage ? productImage.name : state.name} style={{ width: '30%', height: 'auto', objectFit: 'contain' }} />
              </Row>
            </CardBody>
            <CardFooter>
              <Button.Ripple color="primary" onClick={handlePostAd}>
                {mode === 'EDIT' ? 'Edit' : 'Post'} Ad
              </Button.Ripple>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AdForm
