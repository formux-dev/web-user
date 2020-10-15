import styled from "styled-components";
import { getInputColors, getTextColor } from "./styles/themeValues";

export default function SubmitButton() {
  const handleSubmit = e => {
    e.preventDefault();
    alert("submit not implemented");
  };

  return <StyledButton onClick={handleSubmit}>Submit my response</StyledButton>;
}

const StyledButton = styled.button`
  margin-top: 128px;
  padding: 32px;
  font-size: 1.2em;
  border-radius: 4px;
  width: 100%;
  outline: none;
  border: 1.5px solid ${props => getInputColors(props).border};
  background: ${props => getInputColors(props).background};
  color: ${props => getTextColor(props)};

  &:focus {
    border-color: transparent;
    box-shadow: 0px 0px 0px 3px #4aabff;
    border: 1.5px solid #387eff;
  }
`;
