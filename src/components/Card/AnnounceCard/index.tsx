import Icon from '@components/Icon';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useMajor from '@hooks/useMajor';
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
  const { major } = useMajor();

  const onClick = () => {
    window.open(link, '_blank');
  };

  uploadDate = uploadDate.slice(2);

  return (
    <Card onClick={onClick} data-testid="card">
      <ContentContainer>
        <FlexWrapper>
          {pinned && <Icon kind="speaker" color={THEME.PRIMARY} />}
          <AnnounceTitle pinned={pinned}>{title}</AnnounceTitle>
        </FlexWrapper>
        <SubTitle>
          <VertialSeparator />
          <Source>{major}</Source>
          <VertialSeparator />
          <AnnounceDate>{uploadDate}</AnnounceDate>
        </SubTitle>
      </ContentContainer>
      <Contour />
    </Card>
  );
};

export default AnnounceCard;

const Card = styled.div`
  min-height: 28px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: ${THEME.TEXT.BLACK};
`;

const ContentContainer = styled.div`
  display: flex;
  line-height: 1.5;
  flex-direction: column;
`;

const AnnounceTitle = styled.span<{ pinned: boolean }>`
  display: flex;
  align-items: center;
  flex: 9;
  font-size: 15px;
  font-weight: ${({ pinned }) => (pinned ? 'bold' : 500)};
  margin-left: ${({ pinned }) => (pinned ? '' : '28px')};

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
  white-space: nowrap;

  color: ${THEME.TEXT.GRAY};
`;

const Contour = styled.div`
  width: 90%;
  padding-top: 5px;
  margin: 0 auto;
  border-bottom: 1px solid ${THEME.BACKGROUND};
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0 0 26px;
`;

const Source = styled.div`
  font-size: 11px;
  color: gray;
`;
