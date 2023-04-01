import { ReactNode } from 'react'
import Nav from './Nav'
import SideBar from './SideBar'

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Nav />
      <div className='container-fluid'>
        <div className='row'>
          <SideBar />
          <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>{children}</main>
        </div>
      </div>
    </>
  )
}

export default Wrapper
