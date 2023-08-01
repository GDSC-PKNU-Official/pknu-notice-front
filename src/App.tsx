import FooterTab from '@components/FooterTab';
import Header from '@components/Header';
import styled from '@emotion/styled';
import Announcement from '@pages/Announcement';
import Home from '@pages/Home';
import MajorDecision from '@pages/MajorDecision';
import Map from '@pages/Map';
import My from '@pages/My';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/announcement/*" element={<Announcement />} />
        <Route path="/my" element={<My />} />
        <Route path="/map" element={<Map />} />
        <Route path="/major-decision/*" element={<MajorDecision />} />
      </Routes>
      <FooterTab />
    </Container>
  );
};

export default App;

const Container = styled.div`
  height: 100vh;
`;

const Body = styled.div`
  padding: 17% 0 17% 0;
`;
