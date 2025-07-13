import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import { Wrapper } from '~/styles/style';

const MOCK_FRIENDS = [
  { id: 1, name: 'Anja Rakoto', invited: false },
  { id: 2, name: 'Tojo Randrian', invited: false },
  { id: 3, name: 'Feno R.', invited: false },
  { id: 4, name: 'Miora Andry', invited: false },
];

function InviteFriends() {
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState(MOCK_FRIENDS);
  
  const friendListRef = useRef(null);

  const handleInvite = (id) => {
    setFriends((prev) =>
      prev.map((friend) =>
        friend.id === id ? { ...friend, invited: true } : friend
      )
    );
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  );

  // Scroll to bottom à chaque modification de filteredFriends
  useEffect(() => {
    if (friendListRef.current) {
      friendListRef.current.scrollTop = friendListRef.current.scrollHeight;
    }
  }, [filteredFriends]);

  return (
    <Wrapper>
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

        <FriendList ref={friendListRef}>
          {filteredFriends.length === 0 && <NoResult>Aucun ami trouvé</NoResult>}
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
      </Container>
    </Wrapper>
  );
}

export default InviteFriends;

const FriendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 5px;

  /* Inverse la colonne pour que scroll démarre en bas */
  flex-direction: column-reverse;

  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 6px;
  }
`;
