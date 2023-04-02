import { NavLink } from "react-router-dom"

const SideBar = () => {
  return (
    <nav id='sidebarMenu' className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'>
      <div className='position-sticky pt-3 sidebar-sticky'>
        <ul className='nav flex-column'>
          <li className='nav-item'>
            <NavLink className={({ isActive }) => isActive ? "nav-link text-primary" : "nav-link text-secondary"} to='/'>
              Dashboard
            </NavLink>
          </li>

          <li className='nav-item'>
            <NavLink className={({ isActive }) => isActive ? "nav-link text-primary" : "nav-link text-secondary"} to='/users'>
              Users
            </NavLink>
          </li>

          <li className='nav-item'>
            <NavLink className={({ isActive }) => isActive ? "nav-link text-primary" : "nav-link text-secondary"} to='/roles'>
              Roles
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className={({ isActive }) => isActive ? "nav-link text-primary" : "nav-link text-secondary"} to='/products'>
              Products
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className={({ isActive }) => isActive ? "nav-link text-primary" : "nav-link text-secondary"} to='/orders'>
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default SideBar