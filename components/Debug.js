import styled from "styled-components";
import { useContext } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import beautify from "json-beautify";

import { FormContext } from "./context/FormContext";

export default function Debug() {
  const { debug, setDebug, userData } = useContext(FormContext);
  useHotkeys("ctrl+q", () => setDebug(prev => !prev));

  if (debug) {
    return <WhiteSpace>Userdata: {beautify(userData, null, 2, 80)}</WhiteSpace>;
  } else {
    return false;
  }
}

const WhiteSpace = styled.p`
  white-space: "pre-wrap";
`;
