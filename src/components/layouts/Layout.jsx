import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import bg from '~/assets/images/school.jpg'
import Tabs from '~/components/Tabs';
import { Bell, Home, Menu, MessageCircle, Users } from 'lucide-react';
import Sidebar from '../Sidebar';


function Layout() {
  const tabs = [
    { icon: Home, text: 'Home', to: '/' },
    { icon: Users, text: 'Invitation', to: '/invitations' },
    { icon: MessageCircle, text: 'Messages', to: '/messages' },
    { icon: Bell, text: 'Notification', to: '/notifications' },
    { icon: Menu, text: 'Paramètres', to: '/settings' },
  ];

  return (
    <PageWrapper>
      <Sidebar />
      <Main>
        <Navbar>
          <Header>
            <Text>
              <Welcome>Welcome to the plateform</Welcome>
            </Text>
            <Tabs
              tabs={tabs}
              isRouter
              onChangeTab={index => console.log('Onglet actif:', index)}
            />
          </Header>
        </Navbar>
        <Content>
          <Outlet />
        </Content>
      </Main>
    </PageWrapper>
  );
}

export default Layout;

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
`;



const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f4f6f8;
`;

const Navbar = styled.nav`
  height: 300px;
  background-color: #fff;
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
`;

const Content = styled.main`
  flex: 1;
  padding: 30px;
`;

const Header = styled.div`
  width: 100%;
  height: 100%;
`
const Text = styled.div`
  text-align: center;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Welcome = styled.h1`
  text-align: center;
  font-size: 3rem;
  font-weight: 600;
  color: white;
`
