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
    window.open(link, '_blank');
  };

  uploadDate = uploadDate.slice(2);

  return (
    <Card onClick={onClick} data-testid="card">
      <ContentContainer>
        {pinned && <Icon kind="speaker" color={THEME.PRIMARY} />}
        <AnnounceTitle pinned={pinned}>{title}</AnnounceTitle>
        <VertialSeparator
          css={css`
            border-left: 1px solid gray;
            height: 12px;
            margin: 0 5px;
          `}
        />
        <AnnounceDate>{uploadDate}</AnnounceDate>
      </ContentContainer>
    </Card>
  );
};

export default AnnounceCard;

const Card = styled.div`
  height: 28px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: ${THEME.TEXT.BLACK};
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AnnounceTitle = styled.span<{ pinned: boolean }>`
  flex: 9;
  font-size: 15px;
  font-weight: ${({ pinned }) => (pinned ? 'bold' : 500)};
  margin-left: ${({ pinned }) => (pinned ? '' : '28px')};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &: hover {
    cursor: pointer;
  }

  transition: 0.3s;
  &:active {
    transform: scale(0.95);
    opacity: 0.6;
  }
`;

const VertialSeparator = styled.div`
  border-left: 1px solid gray;
  height: 12px;
  margin: 0 5px;
`;

const AnnounceDate = styled.span`
  flex: 1;
  font-size: 10px;
  font-weight: bold;
  text-align: end;
  white-space: nowrap;

  color: ${THEME.TEXT.GRAY};
`;
