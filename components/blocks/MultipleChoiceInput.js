import { useContext } from "react";
import styled from "styled-components";

import { FormContext } from "../context/FormContext";
import { getInputColors } from "../styles/themeValues";

import Question from "../Question";
import Fieldset from "../Fieldset";
import ErrorViewer from "../ErrorViewer";

export default function MultipleChoiceInput({ block, index }) {
  const { userData, setUserDataByKey, errors, errorCheck } = useContext(FormContext);

  return (
    <Fieldset>
      <Question as="legend">{block.data.question}</Question>
      {block.data.options.map((text, i) => (
        <Label key={i}>
          <Radio
            tabIndex={index * 100 + i}
            type="radio"
            required={block.data.required}
            checked={userData[block.key] == text}
            onChange={() => setUserDataByKey(block, text)}
            onBlur={() => errorCheck(block)}
          />

          <RadioCircle error={errors[block.key]} />
          {text}
        </Label>
      ))}
      <ErrorViewer error={errors[block.key]} />
    </Fieldset>
  );
}

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 2px;
`;

const RadioCircle = styled.span`
  display: block;
  margin-right: 8px;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  border: 1.5px solid ${props => getInputColors(props).border};
  background-color: ${props => getInputColors(props).background};
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70%;
  transition: all 100ms ease-in-out;
`;

const Radio = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked {
    & ~ ${RadioCircle} {
      background-image: url("/dot.svg");
    }
  }

  &:focus {
    & ~ ${RadioCircle} {
      box-shadow: 0px 0px 0px 3px ${props => getInputColors(props).activeShadow};
      border-color: ${props => getInputColors(props).activeBorder};
    }
  }
`;
