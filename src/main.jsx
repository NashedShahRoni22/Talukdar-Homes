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
import AdminContact from './Adminpage/AdminContact.jsx'
import Update from './Adminpage/Update.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Login from './pages/Login.jsx'

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
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',

    element: (
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/admin/appointment',
        element: <Appointment />,
      },
      {
        path: '/admin/contact',
        element: <AdminContact />,
      },
      {
        path: '/admin/addService',
        element: <AddService />,
      },
      {
        path: '/admin/manageService',
        element: <ManageService />,
      },
      {
        path: '/admin/update_service/',
        element: <Update />,
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
