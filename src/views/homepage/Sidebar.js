import React from 'react'
import { InputGroup, Input, InputGroupText, Row, Col, Label, Button } from 'reactstrap'
import * as Icon from 'react-feather'

function Sidebar({ state, handleInputChange, locations, getProducts }) {
  return (
    <div className="sidebar-detached sidebar-right">
      <div className="sidebar">
        <div className="blog-sidebar right-sidebar my-2 my-lg-0">
          <div className="right-sidebar-content">
            <div className="blog-search">
              <Row>
                <Col md={12} className="mb-1">
                  <InputGroup className="input-group-merge">
                    <Input name="keys" value={state.keys} placeholder="Search here" onChange={handleInputChange} />
                    <InputGroupText>
                      <Icon.Search size={14} />
                    </InputGroupText>
                  </InputGroup>
                </Col>
                <Col md={12} className="mb-1">
                  <Label className="form-label" for="register-password">
                    Location
                  </Label>
                  <Input type="select" name="locationId" value={state.locationId} placeholder="Select Location" onChange={handleInputChange}>
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
              <Button.Ripple onClick={getProducts} size="sm" color="primary">
                Search
              </Button.Ripple>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
