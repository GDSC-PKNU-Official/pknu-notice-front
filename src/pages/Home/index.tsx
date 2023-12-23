import Carousel from '@components/Carousel';
import styled from '@emotion/styled';
import InformHalfCardList from '@pages/Home/components/InformHalfCardList';
import { THEME } from '@styles/ThemeProvider/theme';

import InformCardList from './components/InformCardList';

const Home = () => {
  return (
    <Container>
      <InformCardWrapper>
        <InformTitle>학교</InformTitle>
        <InformCardList />
      </InformCardWrapper>
      <HalfCardWrapper>
        <InformHalfCardList
          iconKind="account"
          title="취업 길라잡이"
          subTitle="채용 정보 확인"
          link="/announcement/recruit/normal"
        />
        <InformHalfCardList
          iconKind="language"
          title="어학 공지사항"
          subTitle="어학 정보 확인"
          link="/announcement/language/normal"
        />
      </HalfCardWrapper>
      <InformCardWrapper>
        <InformTitle>비교과</InformTitle>
        <Carousel />
      </InformCardWrapper>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 0 auto;
  padding-bottom: 5%;
`;

const InformCardWrapper = styled.div`
  overflow: hidden;
  border-radius: 15px;
  padding: 5%;
  background-color: ${THEME.IVORY};
  margin-top: 5%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const HalfCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
`;

const InformTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
