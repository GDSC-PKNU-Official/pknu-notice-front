import Icon from '@components/Icon';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '@styles/ThemeProvider/theme';
import { IconKind } from '@type/styles/icon';
import { setSize } from '@utils/styles/size';
import { useNavigate } from 'react-router-dom';

interface InformCardProps {
  icon: IconKind & ('school' | 'notification');
  title: string;
  path: string;
}

// 1. Card1 을 호출할 때, 넘겨주는 2개의 아이콘 종류(notification, school) 에 따라서 아이콘의 색깔과, 배경화면 색이 달라진다

const InformCard = ({ icon, title, path }: InformCardProps) => {
  const navigate = useNavigate();
  const onClick = () => navigate(path);

  return (
    <Card data-testid="card" icon={icon} onClick={onClick}>
      <Icon
        kind={icon}
        color={icon === 'school' ? theme.text.gray : theme.text.white}
      />
      <span
        css={css`
          font-size: 18px;
          font-weight: bold;
        `}
      >
        {title}
      </span>
      <span
        css={css`
          font-size: 16px;
          margin: auto 0;
        `}
      >
        {title} 보러가기!
      </span>
    </Card>
  );
};

export default InformCard;

type CardProps = Pick<InformCardProps, 'icon'>;

const Card = styled.div<CardProps>(({ icon, theme }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',

    borderRadius: '15px',

    backgroundColor: icon === 'school' ? theme.background : theme.primary,
    color: icon === 'school' ? theme.text.gray : theme.text.white,

    '& > svg': {
      margin: '10px 0',
    },
    ...setSize(200, 150),
  };
});
