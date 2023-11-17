import Icon from '@components/Icon';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

interface AnnounceNotFoundProps {
  keyword: string;
}

const AnnounceNotFound = ({ keyword }: AnnounceNotFoundProps) => {
  return (
    <Container>
      <Icon kind="warning" color={THEME.TEXT.GRAY} />
      <Title>{`"${keyword}"`}에 관한 공지사항이 없습니다.</Title>
    </Container>
  );
};

export default AnnounceNotFound;

const Container = styled.div`
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Title = styled.span`
  color: ${THEME.TEXT.GRAY};
`;
