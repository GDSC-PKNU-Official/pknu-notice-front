import styled from '@emotion/styled';

import ExtraInfo from './components/ExtraInfo';
import SchoolInfo from './components/SchoolInfo';
import Whalbe from './components/Whalbe';

const Home = () => {
  return (
    <Container>
      <SchoolInfo />
      <ExtraInfo />
      <Whalbe />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 15px;
`;
