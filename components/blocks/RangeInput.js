import { useContext, useRef, useState, useLayoutEffect } from "react";
import styled, { css } from "styled-components";
import { transparentize } from "polished";
import { isMobile } from "react-device-detect";

import useHorizontalScollPosition from "../hooks/useHorizontalScollPosition";
import useResize from "../hooks/useResize";

import { FormContext } from "../context/FormContext";
import { getBackgroundColor, getInputColors } from "../styles/themeValues";

import Question from "../Question";
import Fieldset from "../Fieldset";
import ErrorViewer from "../ErrorViewer";

export default function RangeInput({ block }) {
  const { userData, setUserDataByKey, errors, errorCheck } = useContext(FormContext);
  const [helpShown, setHelpShown] = useState(false);
  const [scrollable, setScrollable] = useState(true);
  const scrollContainer = useRef(null);
  const { farLeft, farRight } = useHorizontalScollPosition(scrollContainer);

  useResize(() => {
    const scrollElement = scrollContainer.current;

    if (scrollElement != null) {
      setScrollable(scrollElement.clientWidth < scrollElement.scrollWidth);
    }
  });

  useLayoutEffect(() => {
    if (!farLeft && !helpShown) {
      setHelpShown(true);
    }
  }, [farLeft, helpShown]);

  const scroll = (amount, index) => {
    const scrollElement = scrollContainer.current;

    if (scrollElement !== null) {
      const { scrollWidth, clientWidth } = scrollElement;

      const size = scrollWidth / amount;
      const left = -((clientWidth - size) / 2) + size * index;

      scrollElement.scrollTo({
        left,
        behavior: "smooth",
      });
    }
  };

  return (
    <Fieldset>
      <Question as="legend">{block.data.question}</Question>

      <Options farLeft={farLeft} farRight={farRight} scrollable={scrollable}>
        <OptionsContent ref={scrollContainer} scrollable={scrollable}>
          {block.data.options.map((text, i) => (
            <LabelBox selected={userData[block.key] == text} key={i}>
              <Radio
                type="radio"
                name={block.key}
                required={block.data.required}
                checked={userData[block.key] == text}
                onChange={() => {
                  scroll(block.data.options.length, i);
                  setUserDataByKey(block, text);
                }}
                onBlur={() => errorCheck(block)}
              />
              <RadioCircle error={errors[block.key]} />

              <LabelText>{text}</LabelText>
            </LabelBox>
          ))}
        </OptionsContent>
        {!helpShown && isMobile && <p>{`Scroll to view full list`}</p>}
      </Options>

      <ErrorViewer error={errors[block.key]} />
    </Fieldset>
  );
}

const Options = styled.div`
  position: relative;

  ${props =>
    props.scrollable &&
    css`
      &:after {
        content: "";
        position: absolute;
        z-index: 1;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        pointer-events: none;

        background: linear-gradient(
          90deg,
          ${props => transparentize(props.farLeft ? 1 : 0, getBackgroundColor(props))} 0%,
          ${props => transparentize(1, getBackgroundColor(props))} 20%,
          ${props => transparentize(1, getBackgroundColor(props))} 80%,
          ${props => transparentize(props.farRight ? 1 : 0, getBackgroundColor(props))} 100%
        );
        width: 100%;
      }
    `}
`;

const OptionsContent = styled.div`
  display: flex;
  justify-content: space-between;

  /* To make sure scrollbar is not hiding content */
  padding-bottom: 16px;
  margin-bottom: -16px;

  overflow-x: ${props => (props.scrollable ? "scroll" : "none")};
  position: relative;
`;

const LabelBox = styled.label`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 16px 8px;
  border-radius: 8px;
  transition: all 100ms ease-in-out;
  min-width: 120px;

  ${props =>
    props.selected &&
    css`
      background: ${props => getInputColors(props).background};
    `};
`;

const LabelText = styled.p`
  text-align: center;
  max-width: 50ch;
`;

const RadioCircle = styled.span`
  display: block;
  margin-bottom: 8px;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: ${props => getInputColors(props).background};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80%;
  border: 1.5px solid ${props => getInputColors(props).border};
  transition: all 100ms ease-in-out;
`;

const Radio = styled.input`
  display: block;
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
