import FooterTab from '@components/FooterTab';
import Header from '@components/Header';
import Announcement from '@pages/Announcement';
import BodyLayout from '@pages/BodyLayout';
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
      <Routes>
        <Route element={<BodyLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/announcement/*" element={<Announcement />} />
          <Route path="/major-decision/*" element={<MajorDecision />} />
          <Route path="/my" element={<My />} />
        </Route>
        <Route path="/map" element={<Map />} />
      </Routes>
      <FooterTab />
    </>
  );
};

export default App;
