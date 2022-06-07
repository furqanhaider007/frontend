import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Col, Input, Label, Row } from 'reactstrap'
import apiRoutes from '../../apiConfiguration/apiRoutes'
import ApiCall from '../../apiConfiguration/network'
import InputPasswordToggle from '@components/input-password-toggle'
import { useAuth, useLoader } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import Navroutes from '../../common/Navroutes'

function EditProfile() {
  const { setLoading } = useLoader()
  const navigate = useNavigate()
  const { login, logout } = useAuth()
  const [state, setState] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    location: '',
    password: ''
  })

  const [locations, setLocations] = useState([])

  const updateUser = async () => {
    setLoading(true)
    let obj = { fullName: state.fullName, email: state.email, location: state.location, phoneNumber: state.phoneNumber }
    if (state.password) {
      obj = { ...obj, password: state.password }
    }
    const response = await ApiCall.any(apiRoutes.UpdateUser, {}, obj)
    setLoading(false)
    if (response !== -1) {
      if (state.password) {
        logout()
        navigate(Navroutes.login)
      }
      login(null, response.user)
    }
  }

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

  const handleInputChange = ({ target }) => {
    const { name, value } = target
    setState({ ...state, [name]: value })
  }

  const getUser = async () => {
    setLoading(true)
    const response = await ApiCall.any(apiRoutes.GetUser)
    setLoading(false)
    if (response !== -1) {
      setState({
        fullName: response.user.fullName,
        email: response.user.email,
        phoneNumber: response.user.phoneNumber,
        location: response.user.location._id
      })
    }
  }
  useEffect(() => {
    getLocations()
    getUser()
  }, [])
  return (
    <Card>
      <CardBody>
        <Row>
          <Col md={12} className="mb-1">
            <Label className="form-label" for="register-fullname">
              Full Name
            </Label>
            <Input type="text" name="fullName" value={state.fullName} onChange={handleInputChange} id="register-fullname" autoFocus />
          </Col>
          <Col md={12} className="mb-1">
            <Label className="form-label" for="register-email">
              Email
            </Label>
            <Input type="email" name="email" value={state.email} onChange={handleInputChange} id="register-email" />
          </Col>
          <Col md={12} className="mb-1">
            <Label className="form-label" for="register-phone">
              Phone Number
            </Label>
            <Input name="phoneNumber" value={state.phoneNumber} onChange={handleInputChange} id="register-phone" />
          </Col>
          <Col md="12">
            <Label className="form-label" for="register-password">
              Password (Enter only if you want to update password)
            </Label>
            <InputPasswordToggle name="password" value={state.password} onChange={handleInputChange} className="input-group-merge" id="register-password" />
          </Col>
          <Col md={12} className="mb-1">
            <Label className="form-label" for="register-password">
              Location
            </Label>
            <Input type="select" name="location" value={state.location} placeholder="Select Location" onChange={handleInputChange}>
              <option value="">Select Location</option>
              {locations?.map((location) => {
                return (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                )
              })}
            </Input>
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        <Button
          size="sm"
          color="primary"
          onClick={() => {
            updateUser()
          }}
        >
          Update
        </Button>
      </CardFooter>
    </Card>
  )
}

export default EditProfile
