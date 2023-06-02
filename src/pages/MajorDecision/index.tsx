import CollegeList from '@components/List/CollegeList';
import DepartmentList from '@components/List/DepartmentList';
import { Routes, Route } from 'react-router-dom';

const MajorDecision = () => {
  return (
    <Routes>
      <Route path="/" element={<CollegeList />} />
      <Route path="/:college" element={<DepartmentList />} />
    </Routes>
  );
};

export default MajorDecision;
