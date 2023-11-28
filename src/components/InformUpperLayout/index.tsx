import styled from '@emotion/styled';
import React from 'react';

import getInformUpperLayoutSubElement from './domain/getInformUpperLayoutSubElement';
import InformSubTitle from './InformSubTitle';
import InformTitle from './InformTitle';
import InformTypeButton from './InformTypeButton';

type StrictPropsWithChildren<T = unknown> = T & { children: React.ReactNode };

const InformUpperLayout = ({ children }: StrictPropsWithChildren) => {
  const informTitle = getInformUpperLayoutSubElement(children, InformTitle);
  const informSubTitle = getInformUpperLayoutSubElement(
    children,
    InformSubTitle,
  );
  const informTypeButton = getInformUpperLayoutSubElement(
    children,
    InformTypeButton,
  );

  return (
    <Container>
      {informTitle}
      {informSubTitle}
      {informTypeButton && (
        <TypeButtonContainer>{informTypeButton}</TypeButtonContainer>
      )}
    </Container>
  );
};

export default InformUpperLayout;

InformUpperLayout.InformTitle = InformTitle;
InformUpperLayout.InformSubTitle = InformSubTitle;
InformUpperLayout.InformTypeButton = InformTypeButton;

const Container = styled.section`
  padding: 0px 20px 0px 20px;
  display: flex;
  flex-direction: column;
`;

const TypeButtonContainer = styled.div`
  padding: 0 0 10px 0;
  display: flex;
  column-gap: 10px;
`;
