import FooterTab from '@components/FooterTab';
import Header from '@components/Header';
import styled from '@emotion/styled';
import Announcement from '@pages/Announcement';
import Home from '@pages/Home';
import MajorDecision from '@pages/MajorDecision';
import Map from '@pages/Map';
import My from '@pages/My';
import { Routes, Route, useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/map' && <Header />}
      {/* <Body> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/announcement/*" element={<Announcement />} />
        <Route path="/my" element={<My />} />
        <Route path="/major-decision/*" element={<MajorDecision />} />
        <Route path="/map" element={<Map />} />
      </Routes>
      {/* </Body> */}

      <FooterTab />
    </>
  );
};

export default App;

const Body = styled.div`
  height: calc(100vh - 16vh);
  padding: 8vh 0 8vh 0;
`;
