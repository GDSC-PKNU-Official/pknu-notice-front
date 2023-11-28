import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

interface InformTitleProps {
  title: string;
}

const InformTitle = ({ title }: InformTitleProps) => {
  return <Title>{title}</Title>;
};

export default InformTitle;

const Title = styled.span`
  padding: 1.5rem 0 1.5rem 0;
  color: ${THEME.TEXT.BLACK};
  font-size: 1.5rem;
  font-weight: bold;
`;
