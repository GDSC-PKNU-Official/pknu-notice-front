import http from '@apis/http';
import InformCard from '@components/Card/InformCard';
import { ANNOUNCEMENT_TITLE } from '@constants/announcement';
import PATH from '@constants/path';
import useMajor from '@hooks/useMajor';
import useRouter from '@hooks/useRouter';
import openLink from '@utils/router/openLink';
import { AxiosResponse } from 'axios';
import React from 'react';

const InformCardList = () => {
  const { major } = useMajor();
  const { routerTo } = useRouter();

  const onGraduationCardClick = async () => {
    const response: AxiosResponse<string> = await http.get(
      `/api/graduation?major=${major}`,
    );
    const graduationLink = response.data;
    openLink(graduationLink);
  };

  return (
    <>
      <InformCard
        icon="schoolBuilding"
        title={ANNOUNCEMENT_TITLE.SCHOOL}
        majorRequired={false}
        onClick={() => routerTo(PATH.NORMAL_ANNOUNCEMENT('school'))}
      />
      <InformCard
        icon="speaker"
        title={ANNOUNCEMENT_TITLE.MAROR}
        majorRequired={true}
        onClick={() => routerTo(PATH.NORMAL_ANNOUNCEMENT('major'))}
      />
      <InformCard
        icon="school"
        title="졸업요건"
        majorRequired={true}
        onClick={onGraduationCardClick}
      />
    </>
  );
};

export default InformCardList;
