import http from '@apis/http';
import InformCard from '@components/Card/InformCard';
import styled from '@emotion/styled';
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
    <Container>
      <InformCardWrapper>
        <InformTitle>학교</InformTitle>
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
      </InformCardWrapper>
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
`;

const InformCardWrapper = styled.div`
  overflow: hidden;
  border-radius: 15px;
  padding: 5%;
  background-color: #fffff0;
  margin-top: 5%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const InformTitle = styled.div`
  font-size: 25px;
`;

interface GraduationLink {
  department: string;
  link: string | null;
}
