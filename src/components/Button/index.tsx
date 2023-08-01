import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
}

const Button = ({ children, disabled = false, ...props }: ButtonProps) => {
  return (
    <StyledButton type="button" disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  width: 100%;
  height: 50px;
  margin: 4px 0;

  border-radius: 8px;
  padding: 10px;

  background-color: ${THEME.BUTTON.GREEN};
  color: #ffffff;
  font-weight: bold;

  &:disabled {
    background-color: ${THEME.BUTTON.GRAY};
    color: #868686;
    cursor: auto;
  }
  & > svg {
    margin-right: 5px;
  }
`;
