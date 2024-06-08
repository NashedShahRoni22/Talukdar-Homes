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
import Construction from "./pages/Services/Details/Construction.jsx";
import Renovation from "./pages/Services/Details/Renovation.jsx";
import Development from "./pages/Services/Details/Development.jsx";
import AddBlog from './Adminpage/AddBlog.jsx'
import ManageBlog from './Adminpage/ManageBlog.jsx'

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
      {
        path: "/construction_services",
        element: <Construction />,
      },
      {
        path: "/renovation_services",
        element: <Renovation />,
      },
      {
        path: "/development_services",
        element: <Development />,
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
        path: '/admin',
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
        path: '/admin/update_service/:slug/:id',
        element: <Update />,
      },
      {
        path: '/admin/add_blog',
        element: <AddBlog />,
      },
      {
        path: '/admin/manage_blog',
        element: <ManageBlog />,
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
