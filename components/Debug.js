import styled, { ThemeContext } from "styled-components";
import { useContext } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import beautify from "json-beautify";

import { FormContext } from "./context/FormContext";

export default function Debug() {
  const { isDebug, setIsDebug, userData, rating, errors } = useContext(FormContext);
  const themeContext = useContext(ThemeContext);

  if (process.env.NODE_ENV == "development") {
    useHotkeys("ctrl+q", () => setIsDebug(prev => !prev));
  }

  const beautifyData = data => beautify(data, null, 2, 80);

  if (isDebug) {
    return (
      <React.Fragment>
        <WhiteSpace>Theme: {beautifyData(themeContext)}</WhiteSpace>
        <WhiteSpace>Userdata: {beautifyData(userData)}</WhiteSpace>
        <WhiteSpace>Errors: {beautifyData(errors)}</WhiteSpace>
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
