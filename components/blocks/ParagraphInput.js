import styled from "styled-components";

import { Question } from "./styles"
import TextareaAutosize from 'react-autosize-textarea';

export default function ParagraphInput({ block, value, onChange }) {
  return (
    <div>
      <Question>{block.data.question}</Question>
      <TextArea rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
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