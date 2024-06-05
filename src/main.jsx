import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Main from './layout/Main.jsx'
import Home from './pages/Home/Home.jsx'
import Contact from './pages/Contact.jsx'
import { ThemeProvider } from '@material-tailwind/react'
import About from './pages/About/About.jsx'
import Services from './pages/Services/Services.jsx'
import Admin from './layout/Admin.jsx'
import AddService from './Adminpage/AddService.jsx'
import ManageService from './Adminpage/ManageService.jsx'
import Appointment from './Adminpage/Appointment.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/services',
        element: <Services />,
      },
    ],
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        path: '/admin/appointment',
        element: <Appointment/>,
      },
      {
        path: '/admin/addService',
        element: <AddService />,
      },
      {
        path: '/admin/manageService',
        element: <ManageService />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
