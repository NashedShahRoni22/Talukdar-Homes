import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const accessToken = localStorage.getItem('smfAccessToken')
  return accessToken === '@smartmove2024' ? children : <Navigate to='/login' />
}

export default PrivateRoute
