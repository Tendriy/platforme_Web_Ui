import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Tabs({ tabs = [], onChangeTab, isRouter = false , children}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
    if (onChangeTab) onChangeTab(index);
  };

  return (
    <MenuContainer>
      {tabs.map(({ text, icon: Icon, to }, index) => {
        const content = (
          <>
            {Icon && <IconWrapper><Icon size={18} /></IconWrapper>}
            {text && <span>{text}</span>}
          </>
        );

        if (children && typeof children === 'function') {
          return (
            <React.Fragment key={text || index}>
              {children({ 
                index, 
                activeIndex, 
                setActiveIndex: handleClick, 
                content,
                tab: { text, Icon, to }
              })}
            </React.Fragment>
          );
        }
        
        if (isRouter && to) {
          return (
            <StyledLink
              key={text || index}
              to={to}
              $active={activeIndex === index}
              onClick={() => handleClick(index)}
            >
              {content}
            </StyledLink>
          );
        }

        return (
          <TabButton
            key={text || index}
            active={activeIndex === index}
            onClick={() => handleClick(index)}
            type="button"
          >
            {content}
          </TabButton>
        );
      })}
    </MenuContainer>
  );
}

export default Tabs;

const MenuContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: #eee;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const TabButton = styled.button`
  flex: 1;
  background-color: ${({ active }) => (active ? 'orange' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: none;
  padding: 10px 0;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? 'orange' : '#ddd')};
  }
`;

const StyledLink = styled(Link)`
  flex: 1;
  background-color: ${({ $active }) => ($active ? 'orange' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#333')};
  border: none;
  padding: 10px 0;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ $active }) => ($active ? 'orange' : '#ddd')};
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
