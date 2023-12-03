import FAQBox from '@components/FAQBox';
import InformUpperLayout from '@components/InformUpperLayout';
import { FAQ_DATA, FAQ_CONSTANTS } from '@constants/FAQ';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

const FAQPage = () => {
  return (
    <Container>
      <InformUpperLayout>
        <InformUpperLayout.InformTitle title={FAQ_CONSTANTS.TITLE} />
        <InformUpperLayout.InformSubTitle subTitle={FAQ_CONSTANTS.SUB_TITLE} />
      </InformUpperLayout>
      <BoundaryLine />
      <FAQContainer>
        {FAQ_DATA.map((data, index) => (
          <FAQBox {...data} key={index} />
        ))}
      </FAQContainer>
    </Container>
  );
};

export default FAQPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const BoundaryLine = styled.hr`
  height: 1px;
  width: calc(100% - 40px);
  background-color: ${THEME.TEXT.BLACK};
  border: none;
`;

const FAQContainer = styled.section`
  padding: 0 20px 0 20px;
  line-height: 4;
`;
