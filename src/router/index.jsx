import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '~/components/layouts/Layout';
import Demo from '~/Demo';
import SignIn from '~/pages/auth/SignIn';
import SignUp from '~/pages/auth/SignUp';
import Home from '~/pages/Home';
import Invitation from '~/pages/Invitation';
import Message from '~/pages/Message';
import Notification from '~/pages/Notification';
import Settings from '~/pages/Settings';


const router = createBrowserRouter([
    {
        path: '/sign-in',
        element: <SignIn />
    },
    {
        path: '/demo',
        element: <Demo />
    },
    {
        path: '/sign-up',
        element: <SignUp />
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'invitations',
                element: <Invitation />
            },
            {
                path: 'messages',
                element: <Message />
            },
            {
                path: 'notifications',
                element: <Notification />
            },
            {
                path: 'settings',
                element: <Settings />
            }
        ]
    },
    {
        path: '/*',
        element: <Navigate to='/sign-in' replace />
    }
])

export default router