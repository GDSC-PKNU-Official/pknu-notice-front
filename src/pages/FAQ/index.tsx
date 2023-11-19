import FAQBox from '@components/FAQBox';
import { FAQ_DATA, FAQ_CONSTANTS } from '@constants/FAQ';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

const FAQPage = () => {
  return (
    <Container>
      <TextContainer>
        <FAQTitle>{FAQ_CONSTANTS.TITLE}</FAQTitle>
        <FAQSubTitle>{FAQ_CONSTANTS.SUB_TITLE}</FAQSubTitle>
        <BoundaryLine />
      </TextContainer>
      <FAQContainer>
        {FAQ_DATA.map((data, index) => (
          <React.Fragment key={index}>
            <FAQBox {...data} />
          </React.Fragment>
        ))}
      </FAQContainer>
    </Container>
  );
};

export default FAQPage;

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const TextContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FAQTitle = styled.span`
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const FAQSubTitle = styled.span`
  color: ${THEME.TEXT.GRAY};
  line-height: 1.3;
`;

const FAQContainer = styled.div`
  line-height: 4;
`;

const BoundaryLine = styled.div`
  border-bottom: 1px solid ${THEME.TEXT.BLACK};
`;
