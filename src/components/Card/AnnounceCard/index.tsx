import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';

interface AnnounceCardProps {
  title: string;
  path: string;
  date: string;
  desc: string;
}

const AnnounceCard = ({ title, path, date, desc }: AnnounceCardProps) => {
  const onClick = () => {
    window.location.href = path;
  };
  return (
    <Card onClick={onClick} data-testid="card">
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <span>{title}</span>
        <div
          css={css`
            border-left: 1px solid gray;
            height: 12px;
            margin: 0 10px;
          `}
        />
        <span>{date}</span>
      </div>
      <p>{desc}</p>
    </Card>
  );
};

export default AnnounceCard;

const Card = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px;
  cursor: pointer;

  color: ${THEME.TEXT.BLACK};

  & > div > span:first-child {
    font-size: 18px;
    font-weight: bold;
  }

  & > div > span:nth-child(3) {
    font-size: 12px;
  }

  & > p {
    margin-top: 10px;
    line-height: 25px;
    overflow: hidden;
    text-overflow: clip;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
