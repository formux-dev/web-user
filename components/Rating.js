import { useState, useContext } from "react";
import styled, { css } from "styled-components";

import { getFontFamily } from "./styles/themeValues";
import { FormContext } from "./context/FormContext";

export default function Rating() {
  const { rating, setRating } = useContext(FormContext);
  const [focused, setFocused] = useState(false);

  return (
    <RatingContainer>
      <Description>Please rate the overall design of this form</Description>

      <CurrentRating>{rating}/5 stars</CurrentRating>

      <StarContainer>
        {[...Array(5)].map((_, index) => (
          <div key={"rating" + index}>
            <HiddenInput
              type="radio"
              name="rating"
              aria-label={"Rate " + index + 1}
              name="rating"
              id={"rating" + index}
              onChange={() => setRating(index + 1)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />

            {rating >= index + 1 ? (
              <Star
                focused={focused && rating == index + 1}
                aria-hidden={true}
                src="/star-filled.svg"
                onClick={() => setRating(index + 1)}
              />
            ) : (
              <Star aria-hidden={true} src="/star.svg" onClick={() => setRating(index + 1)} />
            )}
          </div>
        ))}
      </StarContainer>
    </RatingContainer>
  );
}

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 64px;
`;

const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Description = styled.p`
  font-size: 1.1em;
  max-width: 25ch;
  text-align: center;
  margin-bottom: 32px;
  font-family: ${props => getFontFamily(props)};
`;

const CurrentRating = styled.h2`
  font-size: 2em;
  margin-bottom: 8px;
`;

const HiddenInput = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Star = styled.img`
  width: 40px;
  cursor: pointer;

  ${props =>
    props.focused &&
    css`
      border-radius: 4px;
      border: 2px solid rgba(0, 0, 0, 0.1);
    `};
`;
