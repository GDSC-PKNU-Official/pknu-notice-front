import styled from '@emotion/styled';
import useMajor from '@hooks/useMajor';
import { THEME } from '@styles/ThemeProvider/theme';
import { AnnounceItem } from '@type/announcement';
import openLink from '@utils/router/openLink';

interface AnnounceCardProps extends AnnounceItem {
  author?: string;
  recruitment_period?: string;
}

const AnnounceCard = ({
  title,
  link,
  uploadDate,
  recruitment_period,
  author,
}: AnnounceCardProps) => {
  const { major } = useMajor();

  const showDate = () => {
    if (recruitment_period) return recruitment_period;
    uploadDate = uploadDate.slice(2);
    return `20${uploadDate}`;
  };

  return (
    <Card onClick={() => openLink(link)} data-testid="card">
      <ContentContainer>
        <AnnounceTitle>{title}</AnnounceTitle>
        <SubContent>
          <AnnounceDate>{showDate()}</AnnounceDate>
          {!recruitment_period && (
            <>
              <VertialBoundaryLine />
              <Source>{author ? author : major}</Source>
            </>
          )}
        </SubContent>
      </ContentContainer>
      <HorizonBoundaryLine />
    </Card>
  );
};

export default AnnounceCard;

const Card = styled.div`
  min-height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${THEME.TEXT.BLACK};

  transition: 0.3s;
  &:active {
    transform: scale(0.95);
    opacity: 0.6;
  }
`;

const ContentContainer = styled.div`
  padding: 20px 0 20px 0;
  display: flex;
  line-height: 1.5;
  flex-direction: column;

  gap: 10px;
`;

const AnnounceTitle = styled.span`
  display: flex;
  align-items: center;
  flex: 9;
  font-size: 16px;
  font-weight: 500;
`;

const VertialBoundaryLine = styled.div`
  border-left: 1px solid gray;
  height: 12px;
  margin: 0 5px;
`;

const AnnounceDate = styled.span`
  font-size: 13px;
  white-space: nowrap;

  color: ${THEME.TEXT.GRAY};
  padding-right: 5px;
`;

const HorizonBoundaryLine = styled.div`
  border-bottom: 1px solid ${THEME.BACKGROUND};
`;

const SubContent = styled.div`
  display: flex;
  align-items: center;
`;

const Source = styled.div`
  font-size: 13px;
  color: gray;
  padding-left: 5px;
`;
