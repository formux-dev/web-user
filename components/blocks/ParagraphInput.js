import styled from "styled-components";
import { useContext } from "react";

import { FormContext } from "../context/FormContext";
import { getBorderColor, getInputColors, getTextColor } from "../styles/themeValues";

import Question from "../Question";
import TextareaAutosize from "react-autosize-textarea";

export default function ParagraphInput({ block }) {
  const { userData, setUserData } = useContext(FormContext);

  return (
    <div>
      <Question>{block.data.question}</Question>
      <TextArea
        rows={3}
        value={userData[block.key] || ""}
        onChange={({ target: { value } }) => {
          setUserData(prev => ({ ...prev, [block.key]: value }));
        }}
      />
    </div>
  );
}

const TextArea = styled(TextareaAutosize)`
  resize: none;
  padding: 12px 8px;
  border-radius: 4px;
  width: 100%;
  outline: none;
  background: ${props => getInputColors(props).background};
  color: ${props => getTextColor(props)};
  border: 1.5px solid ${props => getInputColors(props).border};

  &:focus {
    box-shadow: 0px 0px 0px 3px #4aabff;
    border: 1.5px solid #387eff;
  }
`;
