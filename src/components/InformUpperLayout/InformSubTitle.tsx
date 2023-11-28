import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

interface InformSubTitleProps {
  subTitle: string;
}

const InformSubTitle = ({ subTitle }: InformSubTitleProps) => {
  const seperatedSubTitle = subTitle.split('\n');

  return (
    <SubTitle>
      {seperatedSubTitle.map((subTitle, index) => (
        <p key={index}>{subTitle}</p>
      ))}
    </SubTitle>
  );
};

export default InformSubTitle;

const SubTitle = styled.span`
  padding: 0 0 1rem 0;
  color: ${THEME.TEXT.GRAY};
  line-height: 1.3;
  font-size: 0.9rem;
`;
