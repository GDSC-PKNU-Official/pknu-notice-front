import { css } from '@emotion/react';

const SuggestionThxMessage = () => {
  return (
    <>
      <span
        css={css`
          display: flex;
          justify-content: center;
          line-height: 30px;
        `}
      >
        🙇‍♂️ 건의사항을 남겨 주셔서 정말 감사드립니다! 🙇‍♂️ <br />더 좋은 서비스를
        제공할 수 있도록 노력하겠습니다.
      </span>
    </>
  );
};

export default SuggestionThxMessage;
