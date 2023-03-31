import { Link } from "react-router-dom"

const SideBar = () => {
  return (
    <nav id='sidebarMenu' className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'>
      <div className='position-sticky pt-3 sidebar-sticky'>
        <ul className='nav flex-column'>
          <li className='nav-item'>
            <Link className='nav-link active' aria-current='page' to={'/'}>
              <span data-feather='home' className='align-text-bottom'></span>
              Dashboard
            </Link>
          </li>

          <li className='nav-item'>
            <Link className='nav-link active' aria-current='page' to={'/users'}>
              <span data-feather='home' className='align-text-bottom'></span>
              Users
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default SideBar