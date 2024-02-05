import http from '@apis/http';
import InformCard from '@components/Card/InformCard';
import { ANNOUNCEMENT_TITLE } from '@constants/announcement';
import PATH from '@constants/path';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useMajor from '@hooks/useMajor';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import openLink from '@utils/router/openLink';
import { AxiosResponse } from 'axios';
import React from 'react';

const SchoolInfo = () => {
  const { major } = useMajor();
  const { routerTo } = useRouter();

  const onGraduationCardClick = async () => {
    const response: AxiosResponse<string> = await http.get(
      `/api/graduation?major=${major}`,
    );
    const graduationLink = response.data;

    openLink(graduationLink);
  };

  const onTitleClick = () => {
    if (major) return;
    routerTo('/major-decision');
  };

  return (
    <Container>
      <Title onClick={onTitleClick} hasMajor={!!major}>
        {major ? major : '학과를 선택 해주세요'}
      </Title>
      <InformCard
        icon="schoolBuilding"
        title={`${ANNOUNCEMENT_TITLE.SCHOOL} 보러가기`}
        majorRequired={false}
        onClick={() => routerTo(PATH.NORMAL_ANNOUNCEMENT('school'))}
      />
      <InformCard
        icon="speaker"
        title={`${ANNOUNCEMENT_TITLE.MAROR} 보러가기`}
        majorRequired={true}
        onClick={() => routerTo(PATH.NORMAL_ANNOUNCEMENT('major'))}
      />
      <InformCard
        icon="school"
        title={`${ANNOUNCEMENT_TITLE.GRADUATION} 보러가기`}
        majorRequired={true}
        onClick={onGraduationCardClick}
      />
    </Container>
  );
};

export default SchoolInfo;

const Container = styled.div`
  overflow: hidden;
  border-radius: 15px;
  padding: 5%;
  background-color: ${THEME.BACKGROUND};
  margin-top: 5%;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 8px;
`;

const Title = styled.span<{ hasMajor: boolean }>`
  font-size: 1rem;
  font-weight: bold;

  ${({ hasMajor }) =>
    !hasMajor &&
    css`
      color: ${THEME.TEXT.GRAY};
      border-bottom: 1px solid ${THEME.TEXT.GRAY};
    `}
`;
