import styled from "styled-components";
import { useContext } from "react";

import { FormContext } from "../context/FormContext";

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
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;

  &:focus {
    border-color: transparent;
    box-shadow: 0px 0px 0px 3px #4aabff;
  }
`;
