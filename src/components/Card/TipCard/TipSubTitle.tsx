import styled from '@emotion/styled';
import React from 'react';

interface TipSubTitleProps {
  subTitle: string;
}

const TipSubTitle = ({ subTitle }: TipSubTitleProps) => {
  const seperatedSubTitle = subTitle.split('\n');
  return (
    <SubTitle>
      {seperatedSubTitle.map((subTitle, index) => (
        <p key={index}>{subTitle}</p>
      ))}
    </SubTitle>
  );
};

export default TipSubTitle;

const SubTitle = styled.span`
  padding: 0 0 0 16px;
  line-height: 1rem;
  font-size: 0.8rem;
`;
