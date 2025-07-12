import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '~/components/layouts/Layout'
import SignIn from '~/pages/auth/SignIn'
import SignUp from '~/pages/auth/SignUp'
import Home from '~/pages/Home'
import Invitation from '~/pages/Invitation'
import Message from '~/pages/Message'
import Notification from '~/pages/Notification'
import Settings from '~/pages/Settings'
import Welcome from '~/pages/Welcome'
import ProtectedRoute from '~/components/auth/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/sign-in',
    element: <SignIn />
  },
  {
    path: '/sign-up',
    element: <SignUp />
  },
  {
    path: '/welcome',
    element: <Welcome />
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <Layout />,
        children: [
          { path: '', element: <Home /> },
          { path: 'invitations', element: <Invitation /> },
          { path: 'messages', element: <Message /> },
          { path: 'notifications', element: <Notification /> },
          { path: 'settings', element: <Settings /> }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/welcome' replace />
  }
])

export default router
