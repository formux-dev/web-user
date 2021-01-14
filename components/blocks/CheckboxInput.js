import { useContext } from "react";
import styled from "styled-components";

import { FormContext } from "../context/FormContext";
import { getInputColors } from "../styles/themeValues";

import Question from "../Question";
import ErrorViewer from "../ErrorViewer";
import Fieldset from "../Fieldset";

export default function CheckboxInput({ block, index }) {
  const { userData, setUserDataByKey, errors, errorCheck } = useContext(FormContext);

  return (
    <Fieldset index={index}>
      <Question as="legend">{block.data.question}</Question>

      {block.data.options.map((text, i) => (
        <Label key={i}>
          <Checkbox
            tabIndex={index * 100 + i}
            type="checkbox"
            required={block.data.required}
            checked={userData[block.key] ? userData[block.key].includes(text) : false}
            onChange={({ target: { checked } }) => {
              setUserDataByKey(
                block,
                checked
                  ? userData[block.key]
                    ? [...userData[block.key], text]
                    : [text]
                  : userData[block.key].filter(x => x != text)
              );
            }}
            onBlur={() => errorCheck(block)}
          />
          <CheckboxSquare error={errors[block.key]} />
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

const CheckboxSquare = styled.span`
  display: block;
  margin-right: 8px;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 4px;
  border: 1.5px solid ${props => getInputColors(props).border};
  background-color: ${props => getInputColors(props).background};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80%;
  transition: all 100ms ease-in-out;
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked {
    & ~ ${CheckboxSquare} {
      background-image: url("/check.svg");
    }
  }

  &:focus {
    & ~ ${CheckboxSquare} {
      box-shadow: 0px 0px 0px 3px ${props => getInputColors(props).activeShadow};
      border-color: ${props => getInputColors(props).activeBorder};
    }
  }
`;
