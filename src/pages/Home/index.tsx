import InformCard from '@components/Card/InformCard';
import { css } from '@emotion/react';

const Home = () => {
  return (
    <>
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <InformCard icon="notification" path="/announcement" title="공지사항" />
        <InformCard icon="school" path="/announcement" title="졸업요건" />
      </div>
    </>
  );
};

export default Home;
