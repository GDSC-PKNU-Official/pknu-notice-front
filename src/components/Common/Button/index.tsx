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
  height: 50px;
  width: 100%;
  padding: 10px;
  margin: 4px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${THEME.BUTTON.BLUE};
  color: #ffffff;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    background-color: ${THEME.BUTTON.GRAY};
    color: #868686;
    cursor: auto;
  }
  & > svg {
    margin-right: 5px;
  }
`;
