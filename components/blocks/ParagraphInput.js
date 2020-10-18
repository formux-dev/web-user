import styled from "styled-components";
import { useContext } from "react";
import TextareaAutosize from "react-autosize-textarea";

import { FormContext } from "../context/FormContext";
import { getInputColors, getTextColor } from "../styles/themeValues";

import Question from "../Question";
import ErrorViewer from "../ErrorViewer";

export default function ParagraphInput({ block }) {
  const { userData, setUserDataByKey, errors, errorCheck } = useContext(FormContext);

  return (
    <div>
      <Question as="label" htmlFor={block.key}>
        {block.data.question}
      </Question>

      <TextArea
        id={block.key}
        rows={3}
        value={userData[block.key] || ""}
        required={block.data.required}
        onChange={({ target: { value } }) => setUserDataByKey(block, value)}
        onBlur={() => errorCheck(block)}
        error={errors[block.key]}
      />

      <ErrorViewer error={errors[block.key]} />
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
  transition: all 100ms ease-in-out;

  &:focus {
    box-shadow: 0px 0px 0px 3px ${props => getInputColors(props).activeShadow};
    border: 1.5px solid ${props => getInputColors(props).activeBorder};
  }
`;
