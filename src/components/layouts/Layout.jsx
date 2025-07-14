import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Tabs from '~/components/Tabs';
import { Bell, Home, Menu, MessageCircle, Users } from 'lucide-react';
import Sidebar from '../Sidebar';


function Layout() {
  const tabs = [
    { icon: Home, text: 'Home', to: '/home' },
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
          <Tabs
            tabs={tabs}
            isRouter
          />
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
  height: 100vh; 
  overflow: hidden;
  font-family: 'Segoe UI', sans-serif;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f4f6f8;
`;

const Navbar = styled.nav`
  height: 100px;
  background-color: #fff;
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  flex-shrink: 0;
`;

const Content = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 30px 30px 30px 30px;
  background-color: #fefefe;

  scrollbar-width: thin;
  scrollbar-color: rgba(100, 100, 100, 0.5) transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(100, 100, 100, 0.5);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

