import styled from "styled-components";
import { useContext } from "react";

import { FormContext } from "../context/FormContext";
import { getInputColors, getTextColor } from "../styles/themeValues";

import Question from "../Question";

export default function ShortInput({ block }) {
  const { userData, setUserData } = useContext(FormContext);

  return (
    <div>
      <Question>{block.data.question}</Question>

      <Input
        value={userData[block.key] || ""}
        onChange={({ target: { value } }) => {
          setUserData(prev => ({ ...prev, [block.key]: value }));
        }}
      />
    </div>
  );
}

const Input = styled.input`
  padding: 12px 8px;
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
