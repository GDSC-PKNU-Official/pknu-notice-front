import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

interface ModalTitleProps {
  title: string;
}

const ModalTitle = ({ title }: ModalTitleProps) => {
  return <Title>{title}</Title>;
};

export default ModalTitle;

const Title = styled.span`
  padding: 20px 0 20px 0;
  text-align: center;
  line-height: 1.3;
  font-weight: bold;
  white-space: pre-line;
  color: ${THEME.TEXT.GRAY};
`;
