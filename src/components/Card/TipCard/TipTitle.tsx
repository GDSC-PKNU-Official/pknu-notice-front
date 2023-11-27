import styled from '@emotion/styled';
import React from 'react';

interface TipTitleProps {
  title: string;
}

const TipTitle = ({ title }: TipTitleProps) => {
  const seperatedTitle = title.split('\n');
  return (
    <Title>
      {seperatedTitle.map((titleItem, index) => (
        <p key={index}>{titleItem}</p>
      ))}
    </Title>
  );
};

export default TipTitle;

const Title = styled.span`
  padding: 20px 0px 10px 16px;
  line-height: 1.2rem;
  font-size: 1.2rem;
  font-weight: bold;
`;
