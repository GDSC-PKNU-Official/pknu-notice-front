import postSuggestion from '@apis/suggestion/post-suggestion';
import Button from '@components/Common/Button';
import Modal from '@components/Common/Modal';
import InformUpperLayout from '@components/InformUpperLayout';
import { MODAL_BUTTON_MESSAGE, MODAL_MESSAGE } from '@constants/modal-messages';
import PLCACEHOLDER_MESSAGES from '@constants/placeholder-message';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useModals from '@hooks/useModals';
import { THEME } from '@styles/ThemeProvider/theme';
import React, { useRef, useState } from 'react';

const SuggestionPage = () => {
  const { openModal } = useModals();
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const [isInValidInput, setIsInValidInput] = useState<boolean>(true);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.currentTarget.value || e.currentTarget.value.length < 5) {
      setIsInValidInput(true);
      return;
    }
    setIsInValidInput(false);
  };

  const onButtonClick = () => {
    postSuggestion(areaRef.current?.value);
    openModal(
      <Modal>
        <Modal.ModalTitle title={MODAL_MESSAGE.SUCCEED.POST_SUGGESTION} />
        <Modal.ModalButton text={MODAL_BUTTON_MESSAGE.CONFIRM} />
      </Modal>,
    );
    areaRef.current ? (areaRef.current.value = '') : null;
  };

  const handlePostSuggestion = () => {
    openModal(
      <Modal>
        <Modal.ModalTitle title={MODAL_MESSAGE.CONFIRM.POST_SUGGESTION} />
        <Modal.ModalButton text={MODAL_BUTTON_MESSAGE.NO} />
        <Modal.ModalButton
          text={MODAL_BUTTON_MESSAGE.YES}
          onClick={onButtonClick}
        />
      </Modal>,
    );
  };

  return (
    <>
      <InformUpperLayout>
        <InformUpperLayout.InformTitle title="건의사항" />
        <InformUpperLayout.InformSubTitle subTitle="부림이 서비스 관련 문의사항은 언제든지 건의사항에 남겨주세요!" />
      </InformUpperLayout>
      <StyledTextArea
        minLength={5}
        placeholder={PLCACEHOLDER_MESSAGES.SUGGESTION}
        rows={10}
        ref={areaRef}
        onChange={onChange}
      />
      <Button
        disabled={isInValidInput}
        onClick={handlePostSuggestion}
        css={css`
          width: 50%;
          margin: 0 auto;
        `}
      >
        작성 완료
      </Button>
    </>
  );
};

export default SuggestionPage;

const StyledTextArea = styled.textarea`
  display: block;
  padding: 20px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 2rem;
  line-height: 1.5;
  resize: none;
  font-size: 16px;
  border-radius: 20px;
  overflow-y: scoll;
  border: 1px solid ${THEME.TEXT.GRAY};

  &::placeholder {
    color: ${THEME.TEXT.GRAY};
  }
`;
