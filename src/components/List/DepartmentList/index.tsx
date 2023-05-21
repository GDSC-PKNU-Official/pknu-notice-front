import http from '@apis/http';
import List from '@components/List';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DepartmentListProps {
  college: string;
}

const DepartmentList = (props: DepartmentListProps) => {
  const [departmentList, setDepartmentList] = useState<string[]>();
  const router = useNavigate();

  const fetchData = async (collegeName: string) => {
    const result = await http.get(`majorDecision/${collegeName}`);
    if (result.data === undefined) {
      router(-1);
    }
    setDepartmentList(result.data);
  };

  useEffect(() => {
    fetchData(props.college);
  }, []);

  return departmentList ? (
    <List
      title="학부/학과 선택하기"
      icon="uncheckedRadio"
      altIcon="checkedRadio"
      contents={departmentList}
    />
  ) : (
    <div>loading..</div>
  );
};

export default DepartmentList;
