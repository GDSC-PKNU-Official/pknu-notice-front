import http from '@apis/http';
import Button from '@components/Button';
import ToggleButton from '@components/Button/Toggle';
import Icon from '@components/Icon';
import { SERVER_URL } from '@config/index';
import { MODAL_BUTTON_MESSAGE, MODAL_MESSAGE } from '@constants/modal-messages';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import urlBase64ToUint8Array from '@hooks/urlBase64ToUint8Array';
import useMajor from '@hooks/useMajor';
import useModals, { modals } from '@hooks/useModals';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import { MouseEventHandler, useEffect, useState } from 'react';

const My = () => {
  const [subscribe, setSubscribe] = useState<PushSubscription | null>(null);
  const [animation, setAnimation] = useState(false);
  const { major } = useMajor();
  const { routerTo } = useRouter();
  const { openModal, closeModal } = useModals();

  const routerToMajorDecision = () => routerTo('/major-decision');

  const postSuggestion = async (text?: string) => {
    await http.post(
      `${SERVER_URL}/api/suggestion`,
      {
        content: `${major} ${window.navigator.userAgent} 서비스워커 없음 ${text}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };

  const handleSuggestionModal = () => {
    openModal<typeof modals.suggestion>(modals.suggestion, {
      title: MODAL_MESSAGE.SUGGESTION_TITLE,
      buttonMessage: MODAL_BUTTON_MESSAGE.SEND_SUGGESTION,
      onClose: () => closeModal(modals.suggestion),
    });
  };

  const handleNotiModal: MouseEventHandler = () => {
    if (!major) {
      openModal<typeof modals.alert>(modals.alert, {
        message: MODAL_MESSAGE.ALERT.SET_MAJOR,
        buttonMessage: MODAL_BUTTON_MESSAGE.CONFIRM,
        onClose: () => closeModal(modals.alert),
        routerTo: () => {
          closeModal(modals.alert);
          routerToMajorDecision();
        },
      });
      return;
    }

    if (subscribe) {
      openModal<typeof modals.confirm>(modals.confirm, {
        message: MODAL_MESSAGE.CONFIRM.STOP_ALARM,
        onConfirmButtonClick: async () => {
          await http.delete(`${SERVER_URL}/api/subscription/major`, {
            data: { subscription: subscribe, major },
          });
          setSubscribe(null);
          closeModal(modals.confirm);
          localStorage.removeItem('subscribe');
        },
        onCancelButtonClick: () => {
          closeModal(modals.confirm);
        },
      });
      return;
    }

    openModal<typeof modals.confirm>(modals.confirm, {
      message: MODAL_MESSAGE.CONFIRM.GET_ALARM,
      onConfirmButtonClick: () => {
        closeModal(modals.confirm);
        handleSubscribeTopic();
      },
      onCancelButtonClick: () => closeModal(modals.confirm),
    });
  };

  const handleSubscribeTopic = async () => {
    if (!animation) setAnimation(true);

    if (!('serviceWorker' in navigator)) {
      postSuggestion();
      openModal<typeof modals.alert>(modals.alert, {
        message: MODAL_MESSAGE.ALERT.FAIL_SUBSCRIBE_NOTI1,
        buttonMessage: MODAL_BUTTON_MESSAGE.CLOSE,
        onClose: () => closeModal(modals.alert),
      });
      return;
    }

    try {
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        openModal<typeof modals.alert>(modals.alert, {
          message: MODAL_MESSAGE.ALERT.NOT_SUBSCRIB_NOTI,
          buttonMessage: MODAL_BUTTON_MESSAGE.CLOSE,
          onClose: () => closeModal(modals.alert),
        });
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const VAPID_PUBLIC_KEY =
        'BMTktqZlaL5Bqx7rR2h_fbqBsWROO4k2RnXxwbJXDsP99RSaihgNEkA3JT1iQVT2XRQMRHYMJUyDQS7_r8S5BMc';
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      const res = await http.post(`${SERVER_URL}/api/subscription/major`, {
        data: {
          subscription,
          major,
        },
      });
      if (res.status === 200) {
        localStorage.setItem('subscribe', JSON.stringify(subscription));
        setSubscribe(subscription);
      }
    } catch (error) {
      postSuggestion(error as string);
      openModal<typeof modals.alert>(modals.alert, {
        message: MODAL_MESSAGE.ALERT.FAIL_SUBSCRIBE_NOTI2,
        buttonMessage: MODAL_BUTTON_MESSAGE.CLOSE,
        onClose: () => closeModal(modals.alert),
      });
      return;
    }
  };

  useEffect(() => {
    const storedSubscribe = localStorage.getItem('subscribe');
    if (storedSubscribe) setSubscribe(JSON.parse(storedSubscribe));
  }, []);

  return (
    <>
      <Title>마이페이지</Title>
      <Major>
        <MajorCard>
          <CardList>
            {major ? (
              <>
                <div>{major}</div>
                <Icon
                  kind="edit"
                  onClick={routerToMajorDecision}
                  color={THEME.TEXT.GRAY}
                  data-testid="edit"
                />{' '}
              </>
            ) : (
              <div
                onClick={() => routerToMajorDecision()}
                css={css`
                  opacity: 0.5;
                  width: 100%;
                `}
              >
                학과 선택하러가기
              </div>
            )}
          </CardList>
          <CardList>
            <span>학과 공지사항 알림받기</span>
            <ToggleButton
              isOn={Boolean(subscribe)}
              changeState={handleNotiModal}
              animation={animation}
            />
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
