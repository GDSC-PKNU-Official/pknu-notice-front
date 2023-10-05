import FooterTab from '@components/FooterTab';
import Header from '@components/Header';
import Announcement from '@pages/Announcement';
import BodyLayout from '@pages/BodyLayout';
import Home from '@pages/Home';
import MajorDecision from '@pages/MajorDecision';
import Map from '@pages/Map';
import MapProvider from '@pages/Map/Provider';
import My from '@pages/My';
import Tip from '@pages/Tip';
import RouteChangeTracker from '@utils/routeChangeTracker';
import { Routes, Route, useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  RouteChangeTracker();

  return (
    <>
      {location.pathname !== '/map' && <Header />}
      <Routes>
        <Route element={<BodyLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/announcement/*" element={<Announcement />} />
          <Route path="/major-decision/*" element={<MajorDecision />} />
          <Route path="/my" element={<My />} />
          <Route path="/tip" element={<Tip />} />
        </Route>
        <Route element={<MapProvider />}>
          <Route path="/map" element={<Map />} />
        </Route>
      </Routes>
      <FooterTab />
    </>
  );
};

export default App;
