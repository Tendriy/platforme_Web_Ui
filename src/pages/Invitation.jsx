import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { Wrapper } from '~/styles/style';

const MOCK_FRIENDS = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Ami ${i + 1}`,
  invited: false,
}));

function InviteFriends() {
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState(MOCK_FRIENDS);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const friendListRef = useRef(null);

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleInvite = (id) => {
    setFriends((prev) =>
      prev.map((friend) =>
        friend.id === id ? { ...friend, invited: true } : friend
      )
    );
  };

  const handleScroll = () => {
    const el = friendListRef.current;
    if (!el) return;
    const isBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 10;
    setShowScrollButton(!isBottom);
  };

  const scrollToBottom = () => {
    if (friendListRef.current) {
      friendListRef.current.scrollTo({
        top: friendListRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Wrapper $width="80rem" $height="30rem">
      <Container>
        <Title>Invitez vos amis</Title>
        <Para>Recherchez vos amis pour les inviter sur la plateforme</Para>

        <SearchBox>
          <Input
            type="text"
            placeholder="Entrez un nom..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchBox>

        <FriendList ref={friendListRef} onScroll={handleScroll}>
          {filteredFriends.length === 0 && (
            <NoResult>Aucun ami trouvé</NoResult>
          )}
          {filteredFriends.map((friend) => (
            <FriendItem key={friend.id}>
              <FriendName>{friend.name}</FriendName>
              {friend.invited ? (
                <InvitedText>✅ Invité</InvitedText>
              ) : (
                <InviteButton onClick={() => handleInvite(friend.id)}>
                  Inviter
                </InviteButton>
              )}
            </FriendItem>
          ))}
        </FriendList>

        {showScrollButton && (
          <ScrollButton onClick={scrollToBottom}>⬇️ Aller en bas</ScrollButton>
        )}
      </Container>
    </Wrapper>
  );
}

export default InviteFriends;

const Container = styled.div`
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 12px;
  text-align: center;
  width: 30%;
  max-width: 500px;
  margin: 40px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Para = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
`;

const SearchBox = styled.div`
  margin-bottom: 20px;
`;

const FriendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 6px;

  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 10px;
  }
`;

const FriendItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f7f7;
  padding: 12px 16px;
  border-radius: 8px;
`;

const FriendName = styled.span`
  font-weight: 150;
  font-size: 16px;
`;

const InviteButton = styled(Button)`
  background-color: #1877f2;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  width: 70px;
`;

const InvitedText = styled.span`
  color: green;
  font-weight: bold;
`;

const NoResult = styled.p`
  font-style: italic;
  color: #888;
`;

const ScrollButton = styled.button`
  margin-top: 20px;
  background-color: #1877f2;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0f5ac1;
  }
`;
