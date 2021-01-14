import styled from "styled-components";
import { useContext } from "react";

import { FormContext } from "../context/FormContext";
import { getInputColors, getTextColor } from "../styles/themeValues";

import Question from "../Question";
import ErrorViewer from "../ErrorViewer";

export default function ShortInput({ block }) {
  const { userData, setUserDataByKey, errors, errorCheck } = useContext(FormContext);

  return (
    <div>
      <Question as="label" htmlFor={block.key}>
        {block.data.question}
      </Question>

      <Input
        name={block.key}
        id={block.key}
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

const Input = styled.input`
  padding: 12px 8px;
  border-radius: 4px;
  width: 100%;
  outline: none;
  border: 1.5px solid ${props => getInputColors(props).border};
  background: ${props => getInputColors(props).background};
  color: ${props => getTextColor(props)};
  transition: all 100ms ease-in-out;

  &:focus {
    box-shadow: 0px 0px 0px 3px ${props => getInputColors(props).activeShadow};
    border: 1.5px solid ${props => getInputColors(props).activeBorder};
  }
`;
