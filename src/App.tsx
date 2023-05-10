import Announcement from '@pages/Announcement';
import Home from '@pages/Home';
import CollegeList from '@pages/MajorDecision/CollegeList';
import My from '@pages/My';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/announcement" element={<Announcement />} />
      <Route path="/my" element={<My />} />
      <Route path="/major-decision" element={<CollegeList />} />
    </Routes>
  );
};

export default App;
