import http from '@apis/http';
import InformCard from '@components/Card/InformCard';
import styled from '@emotion/styled';
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
    <Container>
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
        onClick={() => routerToGraduationRequired()}
      />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  text-aligb: center;
  margin: 0 auto;
  padding-top: 5%;
`;
