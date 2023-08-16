import http from '@apis/http';
import InformCard from '@components/Card/InformCard';
import { css } from '@emotion/react';
import useMajor from '@hooks/useMajor';
import useRouter from '@hooks/useRouter';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
  const [graduationLink, setGraduationLink] = useState<string | null>('');
  const { routerTo } = useRouter();
  const { major } = useMajor();

  const routerToGraduationRequiredPage = (graduationLink: string | null) => {
    graduationLink && window.open(graduationLink, '_blank');
  };

  useEffect(() => {
    if (!major) return;
    const getGraduationLink = async () => {
      const response: AxiosResponse<GraduationLink> = await http.get(
        `/api/graduation?major=${major}`,
      );
      setGraduationLink(response.data.link);
    };
    getGraduationLink();
  }, [major]);

  return (
    <>
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <InformCard
          icon="notification"
          title="공지사항"
          majorRequired={false}
          onClick={() => routerTo('/announcement')}
        />
        <InformCard
          icon="school"
          title="졸업요건"
          majorRequired={true}
          onClick={() => routerToGraduationRequiredPage(graduationLink)}
        />
      </div>
    </>
  );
};

export default Home;

interface GraduationLink {
  department: string;
  link: string | null;
}
