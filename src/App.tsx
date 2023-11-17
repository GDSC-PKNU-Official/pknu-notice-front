import BodyLayout from '@components/BodyLayout';
import FooterTab from '@components/FooterTab';
import Header from '@components/Header';
import Announcement from '@pages/Announcement';
import Home from '@pages/Home';
import MajorDecision from '@pages/MajorDecision';
import Map from '@pages/Map';
import My from '@pages/My';
import Tip from '@pages/Tip';
import RouteChangeTracker from '@utils/routeChangeTracker';
import { Routes, Route } from 'react-router-dom';

import { OverlayProvider } from './components/Providers';

const App = () => {
  RouteChangeTracker();

  return (
    <>
      <Header />
      <Routes>
        <Route element={<BodyLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/announcement/*" element={<Announcement />} />
          <Route path="/major-decision/*" element={<MajorDecision />} />
          <Route path="/my" element={<My />} />
          <Route path="/tip" element={<Tip />} />
        </Route>
        <Route element={<OverlayProvider />}>
          <Route path="/map" element={<Map />} />
        </Route>
      </Routes>
      <FooterTab />
    </>
  );
};

export default App;
