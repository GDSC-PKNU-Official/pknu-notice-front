import React, { useState } from 'react';

import SuggestionInput from './SuggestionInput';
import SuggestionThxMessage from './SuggestionThxMessage';
import Modal from '..';

interface SuggestionModalProps {
  onClose: () => void;
}

const SuggestionModal = ({ onClose }: SuggestionModalProps) => {
  const [isSended, setIsSended] = useState<boolean>(false);
  return (
    <Modal onClose={onClose}>
      {isSended ? (
        <SuggestionThxMessage />
      ) : (
        <SuggestionInput setIsSended={setIsSended} />
      )}
    </Modal>
  );
};

export default SuggestionModal;
