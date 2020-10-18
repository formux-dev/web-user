import { useContext } from "react";
import styled from "styled-components";

import { FormContext } from "../context/FormContext";
import { getInputColors } from "../styles/themeValues";

import Question from "../Question";

export default function CheckboxInput({ block }) {
  const { userData, setUserData, setUserDataByKey } = useContext(FormContext);

  return (
    <div>
      <Question>{block.data.question}</Question>
      {block.data.options.map((text, index) => (
        <div key={index}>
          <Label>
            <Checkbox
              type="checkbox"
              checked={userData[block.key] ? userData[block.key].includes(text) : false}
              onChange={({ target: { checked } }) => {
                setUserDataByKey(
                  block.key,
                  checked
                    ? userData[block.key]
                      ? [...userData[block.key], text]
                      : [text]
                    : userData[block.key].filter(x => x != text)
                );
              }}
            />
            <CheckboxSquare />
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

const CheckboxSquare = styled.span`
  display: block;
  margin-right: 8px;
  width: 1.2rem;
  height: 1.2em;
  border-radius: 4px;
  background: ${props => getInputColors(props).background};
  border: 1.5px solid ${props => getInputColors(props).border};
  transition: all 100ms ease-in-out;
  background-position: 50% 50%;
  background-size: 80%;
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked {
    & ~ ${CheckboxSquare} {
      background: url("/check.svg") ${props => getInputColors(props).background};
      background-position: 50% 50%;
      background-size: 80%;
      background-repeat: no-repeat;
    }
  }

  &:focus {
    & ~ ${CheckboxSquare} {
      box-shadow: 0px 0px 0px 3px ${props => getInputColors(props).activeShadow};
      border: 1.5px solid ${props => getInputColors(props).activeBorder};
    }
  }
`;
