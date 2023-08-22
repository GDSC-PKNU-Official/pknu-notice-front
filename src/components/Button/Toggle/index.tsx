import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import { MouseEventHandler } from 'react';

interface Props {
  isOn: boolean;
  changeState: MouseEventHandler<HTMLElement>;
  animation: boolean;
}

interface Circle {
  isOn: boolean;
  animation: boolean;
}

const ToggleButton = (props: Props) => {
  const { isOn, changeState, animation } = props;

  return (
    <Button onClick={changeState} isOn={isOn} animation={animation}>
      <Circle isOn={isOn} animation={animation} />
    </Button>
  );
};

export default ToggleButton;

const Button = styled.button<Circle>`
  position: relative;
  border: none;
  width: 3.2rem;
  height: 1.8rem;

  transition: ${(prop) => (prop.animation ? 'all 0.3s ease-in-out' : 'none')};

  background-color: ${(prop) => (prop.isOn ? THEME.PRIMARY : THEME.BACKGROUND)};
  border-radius: 1rem;
`;

const Circle = styled.div<Circle>`
  position: absolute;
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  transition: ${(prop) => (prop.animation ? 'all 0.3s ease-in-out' : 'none')};

  background-color: #f5f5f5;
  top: 0.3rem;
  left: ${(prop) => (prop.isOn ? '1.7rem' : '0.4rem')};
`;
