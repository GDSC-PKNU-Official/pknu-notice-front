import Announcement from '@pages/Announcement';
import Home from '@pages/Home';
import MajorDecision from '@pages/MajorDecision';
import My from '@pages/My';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/announcement" element={<Announcement />} />
      <Route path="/my" element={<My />} />
      <Route path="/major-decision" element={<MajorDecision />} />
    </Routes>
  );
};

export default App;
