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
    <>
      <Header />
      <Body>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/announcement/*" element={<Announcement />} />
          <Route path="/my" element={<My />} />
          <Route path="/map" element={<Map />} />
          <Route path="/major-decision/*" element={<MajorDecision />} />
        </Routes>
      </Body>
      <FooterTab />
    </>
  );
};

export default App;

const Body = styled.div`
  padding: 8.5vh 0 8.5vh 0;
`;
