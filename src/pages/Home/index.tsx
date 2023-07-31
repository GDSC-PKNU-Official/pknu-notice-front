import http from '@apis/http';
import InformCard from '@components/Card/InformCard';
import { css } from '@emotion/react';
import useMajor from '@hooks/useMajor';
import useRouter from '@hooks/useRouter';
import { useEffect, useState } from 'react';

const Home = () => {
  const [graduationLink, setGraduationLink] = useState<string>('');
  const { routerTo } = useRouter();
  const { major } = useMajor();

  const routerToGraduationRequired = () => {
    window.location.href = graduationLink;
  };

  useEffect(() => {
    if (!major) return;
    const getGraduationLink = async () => {
      const response = await http.get(`/api/graduation?major=${major}`);
      setGraduationLink(response.data.graduationLink);
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
          onClick={() => routerTo('/announcement')}
        />
        <InformCard
          icon="school"
          title="졸업요건"
          onClick={() => routerToGraduationRequired()}
        />
      </div>
    </>
  );
};

export default Home;
