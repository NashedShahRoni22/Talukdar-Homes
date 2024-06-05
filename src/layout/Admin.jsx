import { Link, Outlet } from 'react-router-dom'
import { FaBars } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
import { useState } from 'react'
import Leftbar from './../components/Leftbar'

const Admin = () => {
  const [show, setShow] = useState(false)
  return (
    <section>
      <div className='flex justify-between lg:hidden bg-primary text-white p-3'>
        <Link to='/'>Home</Link>
        <button onClick={() => setShow(!show)}>
          {show ? (
            <IoMdClose className='text-2xl' />
          ) : (
            <FaBars className='text-2xl' />
          )}
        </button>
      </div>
      {show && <Leftbar />}
      <div className='lg:flex mx-5 md:mx-0'>
        <div className='hidden lg:block lg:w-1/6 '>
          <Leftbar />
        </div>
        <div className='lg:w-5/6'>
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default Admin
