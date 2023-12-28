import Icon from '@components/Common/Icon';
import styled from '@emotion/styled';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import { IconKind } from '@type/styles/icon';

interface InformHalfCardProps {
  iconKind: IconKind;
  title: string;
  subTitle: string;
  link: string;
}

const InformHalfCard = ({
  iconKind,
  title,
  subTitle,
  link,
}: InformHalfCardProps) => {
  const { routerTo } = useRouter();

  return (
    <Container onClick={() => routerTo(link)}>
      <Icon kind={iconKind} size="45" color={THEME.PRIMARY} />
      <TitleWrapper>
        <SubTitle>{subTitle}</SubTitle>
        <Title>{title}</Title>
      </TitleWrapper>
    </Container>
  );
};

export default InformHalfCard;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 39%;
  background-color: ${THEME.IVORY};
  padding: 3% 5% 3% 4%;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 55px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 7px;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
`;

const SubTitle = styled.h3`
  color: ${THEME.TEXT.SEMIBLACK};
  display: flex;
  justify-content: flex-end;
  font-size: 13px;
  padding-bottom: 6px;
`;
