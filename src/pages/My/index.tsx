import http from '@apis/http';
import Button from '@components/Button';
import Icon from '@components/Icon';
import SuggestionModal from '@components/Modal/SuggestionModal';
import { SERVER_URL } from '@config/index';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import urlBase64ToUint8Array from '@hooks/urlBase64ToUint8Array';
import useMajor from '@hooks/useMajor';
import useModals from '@hooks/useModals';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
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

  return (
    <>
      <h1>마이페이지</h1>
      <Major>
        <span>전공</span>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          <span>{major}</span>
          <Icon
            kind="edit"
            onClick={routerToMajorDecision}
            color={THEME.TEXT.GRAY}
            data-testid="edit"
          />
        </div>
        <Button data-testid="modal" onClick={subscribe}>
          구독!
        </Button>
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
