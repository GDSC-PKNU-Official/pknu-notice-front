import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

import getTipCardSubElement from './domain/getTipCardSubElement';
import TipImage from './TipImage';
import TipSubTitle from './TipSubTitle';
import TipTitle from './TipTitle';

type StrictPropsWithChildren<T = unknown> = T & {
  children: React.ReactNode;
  onClick: () => void;
};

const TipCard = ({ children, onClick }: StrictPropsWithChildren) => {
  const tipTitle = getTipCardSubElement(children, TipTitle);
  const tipSubTitle = getTipCardSubElement(children, TipSubTitle);
  const tipImage = getTipCardSubElement(children, TipImage);

  return (
    <Container onClick={onClick}>
      {tipTitle}
      {tipSubTitle}
      {tipImage}
    </Container>
  );
};

export default TipCard;

TipCard.TipTitle = TipTitle;
TipCard.TipSubTitle = TipSubTitle;
TipCard.TipImage = TipImage;

const Container = styled.div`
  position: relative;
  height: 10rem;
  width: 10rem;
  display: flex;
  flex-direction: column;
  background-color: ${THEME.PRIMARY}20;
  border: 1px solid ${THEME.PRIMARY}30;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  gap: 5px;
  z-index: 1;
`;
