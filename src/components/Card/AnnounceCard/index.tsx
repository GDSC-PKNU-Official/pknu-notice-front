import Icon from '@components/Icon';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import { AnnounceItem } from '@type/announcement';

interface AnnounceCardProps extends AnnounceItem {
  pinned?: boolean;
}

const AnnounceCard = ({
  title,
  link,
  uploadDate,
  pinned = false,
}: AnnounceCardProps) => {
  const onClick = () => {
    window.location.href = link;
  };
  return (
    <Card onClick={onClick} data-testid="card">
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        {pinned && <Icon kind="speaker" color={THEME.PRIMARY} />}
        <span>{title}</span>
        <div
          css={css`
            border-left: 1px solid gray;
            height: 12px;
            margin: 0 10px;
          `}
        />
        <span>{uploadDate}</span>
      </div>
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

  & > div > span:first-of-type {
    font-size: 18px;
    font-weight: bold;
    flex: 9;
    text-align: center;
  }

  & > div > span:nth-of-type(2) {
    font-size: 12px;
    flex: 1;
    text-align: center;
  }
`;
