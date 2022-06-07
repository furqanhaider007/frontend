import UserDropdown from './UserDropdown'

const NavbarUser = ({ skin, setSkin }) => {
  return (
    <>
      <ul className="nav navbar-nav align-items-center ms-auto">
        <UserDropdown skin={skin} setSkin={setSkin} />
      </ul>
    </>
  )
}
export default NavbarUser
