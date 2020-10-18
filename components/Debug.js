import styled from "styled-components";
import { useContext } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import beautify from "json-beautify";

import { FormContext } from "./context/FormContext";

export default function Debug() {
  const { isDebug, setIsDebug, userData, rating } = useContext(FormContext);
  useHotkeys("ctrl+q", () => setIsDebug(prev => !prev));

  if (isDebug) {
    return (
      <React.Fragment>
        <WhiteSpace>Userdata: {beautify(userData, null, 2, 80)}</WhiteSpace>
        <WhiteSpace>Rating: {String(rating)}</WhiteSpace>
      </React.Fragment>
    );
  } else {
    return false;
  }
}

const WhiteSpace = styled.p`
  white-space: pre-wrap;
`;
