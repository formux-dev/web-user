import { useContext } from "react";
import styled from "styled-components";

import { FormContext } from "../context/FormContext";
import { getInputColors } from "../styles/themeValues";

import Question from "../Question";

export default function MultipleChoiceInput({ block }) {
  const { userData, setUserData } = useContext(FormContext);

  return (
    <div>
      <Question>{block.data.question}</Question>
      {block.data.options.map((text, index) => (
        <div key={index}>
          <Label>
            <Radio
              type="radio"
              checked={userData[block.key] == text}
              onChange={_ => {
                setUserData(prev => ({ ...prev, [block.key]: text }));
              }}
            />
            <RadioCircle />
            {text}
          </Label>
        </div>
      ))}
    </div>
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
  height: 1.2em;
  border-radius: 50%;
  background: radial-gradient(${props => getInputColors(props).activeShadow} 100%);
  border: 1.5px solid ${props => getInputColors(props).border};
  transition: all 100ms ease-in-out;
`;

const Radio = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked {
    & ~ ${RadioCircle} {
      background: radial-gradient(
        ${props => getInputColors(props).activeShadow} 40%,
        ${props => getInputColors(props).background} 41%
      );
    }
  }

  &:focus {
    & ~ ${RadioCircle} {
      box-shadow: 0px 0px 0px 3px ${props => getInputColors(props).activeShadow};
      border: 1.5px solid ${props => getInputColors(props).activeBorder};
    }
  }
`;
