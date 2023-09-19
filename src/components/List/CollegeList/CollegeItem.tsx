import Icon from '@components/Icon';
import styled from '@emotion/styled';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import { AxiosError, AxiosResponse } from 'axios';
import React from 'react';

type College = string[];
type Resource = AxiosResponse<College> | College | AxiosError | null;
interface CollegeItemProps {
  resource: {
    read: () => Resource;
  };
}

const CollegeItem = ({ resource }: CollegeItemProps) => {
  const majorList = resource.read();
  if (majorList === null || majorList instanceof Error) return null;

  const { routerTo } = useRouter();

  const handleDepartmentClick: React.MouseEventHandler<HTMLElement> = (e) => {
    const collegeName = e.currentTarget.textContent;
    if (collegeName === null) routerTo('/major-decision');
    else routerTo(`/major-decision/${collegeName}`);
  };

  return (
    <>
      {(majorList as College).map((college, index) => (
        <ListWrapper key={index} onClick={handleDepartmentClick}>
          {college}
          <Icon kind="right" size="28" />
        </ListWrapper>
      ))}
    </>
  );
};

export default CollegeItem;

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 90%;
  margin: 0 auto;
  padding: 8% 4% 8% 4%;
  border-bottom: 1px solid ${THEME.BUTTON.GRAY};

  transition: 0.3s;
  &:active {
    transform: scale(0.95);
    opacity: 0.6;
  }

  &: hover {
    cursor: pointer;
  }
`;
