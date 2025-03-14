import { ButtonContainer } from "./Button.styles";

interface ButtonProps {
  color?: "primary" | "secondary" | "danger" | "success";
}

export function Button({ color = "primary" }: ButtonProps) {
  return <ButtonContainer>Enviar</ButtonContainer>;
}
