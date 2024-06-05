import { Link } from "react-router-dom"
import { GoSignOut } from 'react-icons/go'

const Leftbar = () => {
 const menus = [
   {
     name: 'Appointment',
     link: '/admin/appointment',
   },
   {
     name: 'Contact Message',
     link: '/admin/contact',
   },
   {
     name: 'Add Product',
     link: '/admin/addService',
   },
   {
     name: 'Manage Product',
     link: '/admin/manageService',
   },
 ]
  return (
    <div className='flex flex-col p-5 shadow-xl min-h-screen bg-primary text-white sticky top-0'>
      {menus.map((m, i) => (
        <Link
          key={i}
          to={m.link}
          className='text-xl p-2.5 min-w-full text-center md:text-left'
        >
          {m.name}
        </Link>
      ))}
      <div className='flex justify-center absolute bottom-4 min-w-full'>
        <Link
          className='px-4 py-2 text-sm bg-red-500 text-white w-fit rounded shadow flex gap-2 items-center'
          to='/'
          onClick={() => localStorage.removeItem('smfAccessToken')}
        >
          {' '}
          <GoSignOut className='text-xl' /> Log Out
        </Link>
      </div>
    </div>
  )
}

export default Leftbar