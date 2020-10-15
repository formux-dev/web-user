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
        <Label key={index}>
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
      ))}
    </div>
  );
}

const Label = styled.label`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const RadioCircle = styled.span`
  display: block;
  margin-right: 8px;
  width: 1.2rem;
  height: 1.2em;
  border-radius: 50%;
  background: ${props => getInputColors(props).background};
  border: 1.5px solid ${props => getInputColors(props).border};
`;

const Radio = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked {
    & ~ ${RadioCircle} {
      background: radial-gradient(#4aabff 40%, ${props => getInputColors(props).background} 41%);
    }
  }

  &:focus {
    & ~ ${RadioCircle} {
      box-shadow: 0px 0px 0px 3px #4aabff;
      border: 1.5px solid #387eff;
    }
  }
`;
