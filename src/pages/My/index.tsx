import http from '@apis/http';
import Button from '@components/Button';
import ToggleButton from '@components/Button/Toggle';
import Icon from '@components/Icon';
import SuggestionModal from '@components/Modal/SuggestionModal';
import { SERVER_URL } from '@config/index';
import styled from '@emotion/styled';
import urlBase64ToUint8Array from '@hooks/urlBase64ToUint8Array';
import useMajor from '@hooks/useMajor';
import useModals from '@hooks/useModals';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import { MouseEventHandler, useState } from 'react';

const subscribe = async () => {
  if (!('serviceWorker' in navigator)) return;

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      import.meta.env.VITE_PUBLIC_VAPID_KEY,
    ),
  });

  await http.post(`${SERVER_URL}/api/subscription`, { data: subscription });
};

const My = () => {
  const [isToggleOn, setIsToggleOn] = useState(false);

  const { major } = useMajor();
  const { routerTo } = useRouter();
  const routerToMajorDecision = () => routerTo('/major-decision');
  const { openModal, closeModal } = useModals();

  const handleSuggestionModal = () => {
    openModal(SuggestionModal, {
      title: '건의사항',
      buttonMessage: '보내기',
      onClose: () => closeModal(SuggestionModal),
    });
  };

  const onClickToggle: MouseEventHandler<HTMLElement> = () => {
    subscribe();
    setIsToggleOn(!isToggleOn);
  };

  return (
    <>
      <Title>마이페이지</Title>
      <Major>
        <MajorCard>
          <CardList>
            <div>{major}</div>
            <Icon
              kind="edit"
              onClick={routerToMajorDecision}
              color={THEME.TEXT.GRAY}
              data-testid="edit"
            />
          </CardList>
          <CardList>
            <span>공지사항 알림받기</span>
            <ToggleButton isOn={isToggleOn} changeState={onClickToggle} />
          </CardList>
        </MajorCard>
      </Major>
      <Suggestion>
        <Button data-testid="modal" onClick={handleSuggestionModal}>
          <Icon kind="suggest" color={THEME.TEXT.WHITE} />
          <span>건의사항 남기기</span>
        </Button>
      </Suggestion>
    </>
  );
};

export default My;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding-top: 5%;
  padding-left: 4%;
  margin-bottom: 5%;
`;

const Major = styled.div`
  display: flex;
  flex-direction: column;

  padding: 15px;
`;

const Suggestion = styled.div`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MajorCard = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  width: 95%;
  margin: 0 auto;
  border-radius: 0.5rem;
  align-items: center;
  font-size: 1rem;
`;

const CardList = styled.div`
  padding: 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
