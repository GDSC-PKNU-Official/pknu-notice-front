import BodyLayout from '@components/BodyLayout';
import FooterTab from '@components/FooterTab';
import Header from '@components/Header';
import Announcement from '@pages/Announcement';
import FAQPage from '@pages/FAQ';
import Home from '@pages/Home';
import KeywordSubscribe from '@pages/KeywordSubscribe';
import MajorDecision from '@pages/MajorDecision';
import MapPage from '@pages/Map';
import My from '@pages/My';
import SuggestionPage from '@pages/Suggestion';
import Tip from '@pages/Tip';
import RouteChangeTracker from '@utils/routeChangeTracker';
import { Routes, Route } from 'react-router-dom';

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
          <Route path="/keyword" element={<KeywordSubscribe />} />
          <Route path="/tip/:type" element={<Tip />} />
          <Route path="/FAQ" element={<FAQPage />} />
          <Route path="/suggestion" element={<SuggestionPage />} />
        </Route>
        <Route path="/map" element={<MapPage />} />
      </Routes>
      <FooterTab />
    </>
  );
};

export default App;
