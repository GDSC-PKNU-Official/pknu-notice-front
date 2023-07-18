import Icon from '@components/Icon';
import MajorModal from '@components/Modal/MajorModal';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useMajor from '@hooks/useMajor';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import { IconKind } from '@type/styles/icon';
import { setSize } from '@utils/styles/size';
import { useState } from 'react';

interface InformCardProps {
  icon: IconKind & ('school' | 'notification');
  title: string;
  path: string;
}

const InformCard = ({ icon, title, path }: InformCardProps) => {
  const { major } = useMajor();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { routerTo } = useRouter();

  const onClick = () => {
    if (!major) {
      setIsModalOpen((prev) => !prev);
      return;
    }
    routerTo(path);
  };

  return (
    <>
      {isModalOpen && (
        <MajorModal
          onClose={() => setIsModalOpen((prev) => !prev)}
          routerTo={() => routerTo('major-decision')}
        />
      )}
      <Card data-testid="card" icon={icon} onClick={onClick}>
        <Icon
          kind={icon}
          color={icon === 'school' ? THEME.TEXT.GRAY : THEME.TEXT.WHITE}
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
    </>
  );
};

export default InformCard;

type CardProps = Pick<InformCardProps, 'icon'>;

const Card = styled.div<CardProps>(({ icon }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',

    borderRadius: '15px',

    backgroundColor: icon === 'school' ? THEME.BACKGROUND : THEME.PRIMARY,
    color: icon === 'school' ? THEME.TEXT.GRAY : THEME.TEXT.WHITE,

    '& > svg': {
      margin: '10px 0',
    },
    ...setSize(200, 150),
    cursor: 'pointer',
  };
});
