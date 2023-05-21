import http from '@apis/http';
import List from '@components/List';
import DepartmentList from '@components/List/DepartmentList';
import useRouter from '@hooks/useRouter';
import React, { useState, useEffect } from 'react';

const CollegeList = () => {
  const [collegeList, setCollegeList] = useState<string[]>();
  const { routerTo } = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await http.get('/majorDecision');
    setCollegeList(result.data);
  };

  const onClick: React.MouseEventHandler<HTMLElement> = (e) => {
    if (e.target !== e.currentTarget) return;

    const collegeName = e.currentTarget.textContent;
    if (collegeName === null) routerTo('/major-decision');
    else routerTo(`/major-decision?major=${collegeName}`);
  };

  if (window.location.search) {
    const college = window.location.search.split('?major=')[1];
    return <DepartmentList college={college} />;
  }

  return collegeList ? (
    <List
      title="학부/학과 선택하기"
      onClick={onClick}
      icon="right"
      contents={collegeList}
    />
  ) : (
    <div>loading...</div>
  );
};

export default CollegeList;
