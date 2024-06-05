import { Link } from "react-router-dom"


const Leftbar = () => {
 const menus = [
   {
     name: 'Appointment',
     link: '/admin/appointment',
   },
   {
     name: 'Add Service',
     link: '/admin/addService',
   },
   {
     name: 'Manage Service',
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
    </div>
  )
}

export default Leftbar