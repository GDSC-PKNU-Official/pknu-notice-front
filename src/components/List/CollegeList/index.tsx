import http from '@apis/http';
import Icon from '@components/Icon';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import React, { useState, useEffect } from 'react';

const CollegeList = () => {
  const [collegeList, setCollegeList] = useState<string[]>();
  const { routerTo } = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await http.get('/api/majorDecision');
    setCollegeList(result.data);
  };

  const onClick: React.MouseEventHandler<HTMLElement> = (e) => {
    const collegeName = e.currentTarget.textContent;

    if (collegeName === null) routerTo('/major-decision');
    else routerTo(`/major-decision/${collegeName}`);
  };

  return collegeList ? (
    <ListContainer>
      <Title>단과대 선택하기</Title>
      {collegeList.map((college) => (
        <div
          key={college}
          css={css`
            width: 100%;
          `}
          onClick={onClick}
        >
          <ListWrapper>
            {college}
            <IconWrapper>
              <Icon kind="right" />
            </IconWrapper>
          </ListWrapper>
        </div>
      ))}
    </ListContainer>
  ) : (
    <div>loading...</div>
  );
};

const ListContainer = styled.div`
  padding-top: 2%;
  padding-left: 2%;
`;

const ListWrapper = styled.div`
  padding: 8% 6% 8% 6%;
  width: 80%;
  margin: 0 auto;
  border-bottom: 1px solid ${THEME.BUTTON.GRAY};
`;

const IconWrapper = styled.div`
  float: right;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 3%;
  padding-left: 5%;
`;

export default CollegeList;
