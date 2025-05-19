import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./layout/Main.jsx";
import Home from "./pages/Home/Home.jsx";
import Contact from "./pages/Contact.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import About from "./pages/About/About.jsx";
import Services from "./pages/Services/Services.jsx";
import Admin from "./layout/Admin.jsx";
import AddService from "./Adminpage/AddService.jsx";
import ManageService from "./Adminpage/ManageService.jsx";
import Appointment from "./Adminpage/Appointment.jsx";
import AdminContact from "./Adminpage/AdminContact.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Construction from "./pages/Services/Details/Construction.jsx";
import Renovation from "./pages/Services/Details/Renovation.jsx";
import Development from "./pages/Services/Details/Development.jsx";
import AddBlog from "./Adminpage/AddBlog.jsx";
import ManageBlog from "./Adminpage/ManageBlog.jsx";
import Products from "./pages/Products/Products.jsx";
import ProductDetails from "./pages/Services/Details/MaterialDetails.jsx";
import NotFound from "./pages/NotFound.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import Dashboard from "./Adminpage/Dashboard.jsx";
import UpdateService from "./Adminpage/UpdateService.jsx";
import Customers from "./Adminpage/Customers.jsx";
import Orders from "./Adminpage/Orders.jsx";
import AddCategory from "./Adminpage/AddCategory.jsx";
import AddSubcategory from "./Adminpage/AddSubcategory.jsx";
import AddProduct from "./Adminpage/AddProduct.jsx";
import ManageProducts from "./Adminpage/ManageProducts.jsx";
import UpdateProduct from "./Adminpage/UpdateProduct.jsx";
import CartProvider from "./Providers/CartProvider.jsx";
import Cart from "./pages/Cart.jsx";
import UpdateBlog from "./Adminpage/UpdateBlog.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import { Toaster } from "react-hot-toast";
import Blogs from "./pages/Blogs/Blogs.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import UserPrivateRoute from "./Routes/UserPrivateRoute.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import BlogDetails from "./pages/BlogDetails/BlogDetails.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/construction-services",
        element: <Construction />,
      },
      {
        path: "/renovation-services",
        element: <Renovation />,
      },
      {
        path: "/development-services",
        element: <Development />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/:slug",
        element: <BlogDetails />,
      },
      {
        path: "/products/:slug",
        element: <ProductDetails />,
      },
      {
        path: "/checkout",
        element: (
          <UserPrivateRoute>
            <Checkout />
          </UserPrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <UserPrivateRoute>
            <Profile />
          </UserPrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <AdminLogin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/appointments",
        element: <Appointment />,
      },
      {
        path: "/admin/contacts",
        element: <AdminContact />,
      },
      {
        path: "/admin/customers",
        element: <Customers />,
      },
      {
        path: "/admin/orders",
        element: <Orders />,
      },
      {
        path: "/admin/add-service",
        element: <AddService />,
      },
      {
        path: "/admin/manage-service",
        element: <ManageService />,
      },
      {
        path: "/admin/update-service/:slug/:id",
        element: <UpdateService />,
      },
      {
        path: "/admin/add-blog",
        element: <AddBlog />,
      },
      {
        path: "/admin/manage-blog",
        element: <ManageBlog />,
      },
      {
        path: "/admin/update-blog/:slug/:id",
        element: <UpdateBlog />,
      },
      {
        path: "/admin/add-category",
        element: <AddCategory />,
      },
      {
        path: "/admin/add-subcategory",
        element: <AddSubcategory />,
      },
      {
        path: "/admin/add-product",
        element: <AddProduct />,
      },
      {
        path: "/admin/manage-products",
        element: <ManageProducts />,
      },
      {
        path: "/admin/update-product/:slug",
        element: <UpdateProduct />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster />
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);
