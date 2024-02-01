import http from '@apis/http';
import Button from '@components/Common/Button';
import ToggleButton from '@components/Common/Button/Toggle';
import Icon from '@components/Common/Icon';
import Modal from '@components/Common/Modal';
import { SERVER_URL } from '@config/index';
import { MODAL_BUTTON_MESSAGE, MODAL_MESSAGE } from '@constants/modal-messages';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import urlBase64ToUint8Array from '@hooks/urlBase64ToUint8Array';
import useMajor from '@hooks/useMajor';
import useModals from '@hooks/useModals';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import { MouseEventHandler, useEffect, useState } from 'react';

const My = () => {
  const [subscribe, setSubscribe] = useState<PushSubscription | null>(null);
  const [animation, setAnimation] = useState(false);
  const { major } = useMajor();
  const { routerTo } = useRouter();
  const { openModal } = useModals();

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

  const handleNotiModal: MouseEventHandler = () => {
    if (!major) {
      openModal(
        <Modal>
          <Modal.ModalTitle title={MODAL_MESSAGE.ALERT.SET_MAJOR} />
          <Modal.ModalButton
            text={MODAL_BUTTON_MESSAGE.CONFIRM}
            onClick={routerToMajorDecision}
          />
        </Modal>,
      );
      return;
    }

    if (subscribe) {
      openModal(
        <Modal>
          <Modal.ModalTitle title={MODAL_MESSAGE.CONFIRM.STOP_ALARM} />
          <Modal.ModalButton text={MODAL_BUTTON_MESSAGE.NO} />
          <Modal.ModalButton
            text={MODAL_BUTTON_MESSAGE.YES}
            onClick={async () => {
              await http.delete(`${SERVER_URL}/api/subscription/major`, {
                data: { subscription: subscribe, major },
              });
              setSubscribe(null);
              localStorage.removeItem('subscribe');
            }}
          />
        </Modal>,
      );
      return;
    }

    openModal(
      <Modal>
        <Modal.ModalTitle title={MODAL_MESSAGE.CONFIRM.GET_ALARM} />
        <Modal.ModalButton text={MODAL_BUTTON_MESSAGE.NO} />
        <Modal.ModalButton
          text={MODAL_BUTTON_MESSAGE.YES}
          onClick={handleSubscribeTopic}
        />
      </Modal>,
    );
  };

  const handleSubscribeTopic = async () => {
    if (!animation) setAnimation(true);

    if (!('serviceWorker' in navigator)) {
      postSuggestion();
      openModal(
        <Modal>
          <Modal.ModalTitle title={MODAL_MESSAGE.ALERT.FAIL_SUBSCRIBE_NOTI1} />
          <Modal.ModalButton text={MODAL_BUTTON_MESSAGE.CLOSE} />
        </Modal>,
      );
      return;
    }

    try {
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        openModal(
          <Modal>
            <Modal.ModalTitle
              title={MODAL_MESSAGE.ALERT.FAIL_SUBSCRIBE_NOTI1}
            />
            <Modal.ModalButton text={MODAL_BUTTON_MESSAGE.CLOSE} />
          </Modal>,
        );
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
      openModal(
        <Modal>
          <Modal.ModalTitle title={MODAL_MESSAGE.ALERT.FAIL_SUBSCRIBE_NOTI2} />
          <Modal.ModalButton text={MODAL_BUTTON_MESSAGE.CLOSE} />
        </Modal>,
      );
      return;
    }
  };

  useEffect(() => {
    const storedSubscribe = localStorage.getItem('subscribe');
    if (storedSubscribe) setSubscribe(JSON.parse(storedSubscribe));
  }, []);

  return (
    <>
      <MajorCard>
        <Title>마이페이지</Title>
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
      <MajorCard>
        <Title>관리</Title>
        <CardIconList>
          <Icon kind="bell" color={THEME.PRIMARY} size="35" />{' '}
          <ListText>알림 설정</ListText>
        </CardIconList>
        <CardIconList onClick={() => routerTo('/keyword')}>
          <Icon kind="keyboard" color={THEME.PRIMARY} size="35" />{' '}
          <ListText>키워드 알림 설정</ListText>
        </CardIconList>
        <CardIconList>
          <Icon kind="exclamation" color={THEME.PRIMARY} size="35" />{' '}
          <ListText>자주 묻는 질문</ListText>
        </CardIconList>
      </MajorCard>
      <Suggestion>
        <Button data-testid="modal">
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
  margin-top: 8%;
`;

const CardList = styled.div`
  padding: 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardIconList = styled.div`
  padding: 5%;
  display: flex;
  align-items: center;

  transition: 0.3s;
  &:active {
    transform: scale(0.95);
    opacity: 0.6;
  }
`;

const ListText = styled.p`
  padding-left: 1rem;
`;
