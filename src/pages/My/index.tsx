import Button from '@components/Button';
import Icon from '@components/Icon';
import SuggestionModal from '@components/Modal/SuggestionModal';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useMajor from '@hooks/useMajor';
import useRoter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import { useState } from 'react';

const My = () => {
  const { major } = useMajor();
  const { routerTo } = useRoter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onClick = () => routerTo('/major-decision');

  return (
    <>
      {isModalOpen && (
        <SuggestionModal onClose={() => setIsModalOpen((prev) => !prev)} />
      )}
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
            onClick={onClick}
            color={THEME.TEXT.GRAY}
            data-testid="edit"
          />
        </div>
      </Major>

      <Suggestion>
        <Button
          onClick={() => setIsModalOpen((prev) => !prev)}
          data-testid="modal"
        >
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

  width: 90%;

  Button {
    display: flex;
    align-items: center;
    padding: 10px;
    & > svg {
      margin-right: 15px;
    }
  }
`;
