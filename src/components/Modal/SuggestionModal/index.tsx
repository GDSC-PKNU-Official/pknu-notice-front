import http from '@apis/http';
import Button from '@components/Button';
import Icon from '@components/Icon';
import { SERVER_URL } from '@config/index';
import { MODAL_MESSAGE } from '@constants/modal-messages';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useModals from '@hooks/useModals';
import { THEME } from '@styles/ThemeProvider/theme';
import { areaResize } from '@utils/styles/textarea-resize';
import React, { useRef, useState } from 'react';

import Modal from '..';
import AlertModal from '../AlertModal';
import ConfirmModal from '../ConfirmModal';

interface SuggestionModalProps {
  title: string;
  buttonMessage: string;
  onClose: () => void;
}

const SuggestionModal = ({
  title,
  buttonMessage,
  onClose,
}: SuggestionModalProps) => {
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const [isInvalid, setIsInvalid] = useState<boolean>(true);
  const { openModal, closeModal } = useModals();

  const postSuggestion = async () => {
    await http.post(
      `${SERVER_URL}/api/suggestion`,
      {
        content: areaRef.current?.value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };

  const handleSuggestionPostModal = () => {
    postSuggestion();
    onClose();
    closeModal(ConfirmModal);
    openModal(AlertModal, {
      message: MODAL_MESSAGE.SUCCEED.postSuggestion,
      buttonMessage: '확인',
      onClose: () => closeModal(AlertModal),
    });
  };

  const handleSuggestionConfirmModal = () => {
    openModal(ConfirmModal, {
      message: MODAL_MESSAGE.CONFIRM.postSuggestion,
      onConfirmButtonClick: () => handleSuggestionPostModal(),
      onCancelButtonClick: () => closeModal(ConfirmModal),
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.currentTarget.value || e.currentTarget.value.length < 5) {
      setIsInvalid(true);
      return;
    }
    setIsInvalid(false);
  };
  const onResize = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    areaResize(e.currentTarget);
  };

  return (
    <Modal onClose={onClose}>
      <>
        <SuggestionHeader>
          <span
            css={css`
              color: ${THEME.TEXT.BLACK};
              font-weight: bold;
            `}
          >
            {title}
          </span>
          <Icon kind="cancel" onClick={onClose} color={THEME.BUTTON.GREEN} />
        </SuggestionHeader>
        <SuggestionArea
          minLength={5}
          placeholder="건의사항을 5글자 이상 남겨주세요"
          rows={1}
          ref={areaRef}
          onKeyDown={onResize}
          onKeyUp={onResize}
          onChange={onChange}
        ></SuggestionArea>
        <Button disabled={isInvalid} onClick={handleSuggestionConfirmModal}>
          {buttonMessage}
        </Button>
      </>
    </Modal>
  );
};

export default SuggestionModal;

const SuggestionArea = styled.textarea`
  line-height: 1.5;
  padding: 10px;
  resize: none;
  overflow-y: hidden;

  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;

  &::placeholder {
    color: ${THEME.TEXT.GRAY};
    font-weight: lighter;
  }
`;

const SuggestionHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
