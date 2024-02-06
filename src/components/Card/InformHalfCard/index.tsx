import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';

interface InformHalfCardProps extends React.HTMLAttributes<HTMLDivElement> {
  asset: () => JSX.Element;
  title: string;
  subTitle: string;
}

const InformHalfCard = ({
  asset,
  title,
  subTitle,
  ...props
}: InformHalfCardProps) => {
  return (
    <Container {...props}>
      {asset()}
      <TitleWrapper>
        <SubTitle>{subTitle}</SubTitle>
        <Title>{title}</Title>
      </TitleWrapper>
    </Container>
  );
};

export default InformHalfCard;

const Container = styled.div`
  padding: 3% 5% 3% 5%;
  width: 90%;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${THEME.BACKGROUND};
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 8px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 12px;
`;

const SubTitle = styled.h3`
  color: ${THEME.TEXT.SEMIBLACK};
  display: flex;
  justify-content: flex-end;
  padding-bottom: 6px;
  font-size: 10px;
`;
