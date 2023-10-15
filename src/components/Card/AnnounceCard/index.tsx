import styled from '@emotion/styled';
import useMajor from '@hooks/useMajor';
import { THEME } from '@styles/ThemeProvider/theme';
import { AnnounceItem } from '@type/announcement';

interface AnnounceCardProps extends AnnounceItem {
  Author?: string;
}

const AnnounceCard = ({
  title,
  link,
  uploadDate,
  Author,
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
          <AnnounceTitle>{title}</AnnounceTitle>
        </FlexWrapper>
        <SubTitle>
          <AnnounceDate>20{uploadDate}</AnnounceDate>
          <VertialSeparator />
          <Source>{Author ? Author : major}</Source>
        </SubTitle>
      </ContentContainer>
      <Contour />
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
`;

const ContentContainer = styled.div`
  padding: 20px 0 20px 0;
  display: flex;
  line-height: 1.5;
  flex-direction: column;
`;

const AnnounceTitle = styled.span`
  display: flex;
  align-items: center;
  flex: 9;
  font-size: 16px;
  font-weight: 500;
  margin-left: 28px;

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
  font-size: 13px;
  white-space: nowrap;

  color: ${THEME.TEXT.GRAY};
  padding-right: 5px;
`;

const Contour = styled.div`
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid ${THEME.BACKGROUND};
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 0 28px;
`;

const Source = styled.div`
  font-size: 13px;
  color: gray;
  padding-left: 5px;
`;
