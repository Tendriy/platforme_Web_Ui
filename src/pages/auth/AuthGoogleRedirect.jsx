import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';
import axiosClient from '~/config/axiosClient';

export default function AuthGoogleRedirect() {
  const login = useAuth(state => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (!accessToken || !refreshToken) {
      navigate('/sign-in');
      return;
    }

    axiosClient.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        const user = res.data;
        login({ accessToken, refreshToken }, user?.user);
        navigate('/home');
      })
      .catch(() => {
        navigate('/sign-in');
      });
  }, []);

  return null;
}
