// ** React Imports
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button } from 'reactstrap'
import { Plus, User, Sun, Moon } from 'react-feather'

// ** Default Avatar Image
import Navroutes from '../../../../common/Navroutes'

import useAuth from '../../../../hooks/useAuth'
import { useUser } from '../../../../hooks'

const UserDropdown = (props) => {
  const { skin, setSkin } = props

  const { token, logout } = useAuth()
  const { user } = useUser()
  const navigate = useNavigate()

  const reRoute = (url) => {
    navigate(url)
  }
  //** Vars

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className="ficon" onClick={() => setSkin('light')} />
    } else {
      return <Moon className="ficon" onClick={() => setSkin('dark')} />
    }
  }

  return (
    <>
      <ThemeToggler />

      {token ? (
        <Button
          className="mr-1 text-white"
          style={{ fontSize: '1rem' }}
          color="transparent"
          onClick={() => {
            navigate(Navroutes.createAd)
          }}
        >
          <Plus size={14} /> Create an Ad
        </Button>
      ) : null}
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
          {token && (
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name font-weight-bold text-white">{user.fullName}</span>
            </div>
          )}
          {!token ? <Avatar color="secondary" icon={<User size={14} />} /> : <Avatar color="secondary" content={user.fullName} initials />}
        </DropdownToggle>
        <DropdownMenu end style={{ top: '25px' }}>
          {!token ? (
            <>
              <DropdownItem className="w-100" onClick={() => reRoute(Navroutes.login)}>
                <span className="align-middle">Log in</span>
              </DropdownItem>
              <DropdownItem className="w-100" onClick={() => reRoute(Navroutes.register)}>
                <span className="align-middle">Sign up</span>
              </DropdownItem>
            </>
          ) : (
            <>
              <DropdownItem className="w-100" onClick={() => reRoute(Navroutes.home)}>
                <span className="align-middle">Home</span>
              </DropdownItem>
              <DropdownItem className="w-100" onClick={() => reRoute(Navroutes.editProfile)}>
                <span className="align-middle">Profile</span>
              </DropdownItem>
              <DropdownItem className="w-100" onClick={() => reRoute(Navroutes.chat)}>
                <span className="align-middle">Chat</span>
              </DropdownItem>
              <DropdownItem className="w-100" onClick={() => reRoute(Navroutes.myProducts)}>
                <span className="align-middle">My Products</span>
              </DropdownItem>
              <DropdownItem
                className="w-100"
                onClick={() => {
                  reRoute(Navroutes.home)
                  logout()
                }}
              >
                <span className="align-middle">Logout</span>
              </DropdownItem>
            </>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  )
}

export default UserDropdown
