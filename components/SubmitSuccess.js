import copy from "copy-to-clipboard";
import Tooltip from "react-tooltip-lite";

import styled from "styled-components";
import { getTextColor } from "./styles/themeValues";

export default function SubmitSuccess({ formID }) {
  const handleClick = () => {
    copy("https://formux.web.app/" + formID);
  };

  return (
    <StyledSubmitSuccess>
      <h1>Thanks for your response</h1>
      <p>Data submitted successfully</p>
      <Callout>Please share this form with your friends</Callout>
      <Link>
        <p>https://formux.web.app/{formID}/</p>
        <StyledTooltip
          direction="bottom"
          content="Copied!"
          eventOn="onClick"
          eventOff="onMouseOut"
          useHover={false}
        >
          <CopyButton onClick={() => handleClick()}>Copy link</CopyButton>
        </StyledTooltip>
      </Link>
    </StyledSubmitSuccess>
  );
}

const StyledSubmitSuccess = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => getTextColor(props)};
`;

const CopyButton = styled.p`
  border-left: 1.5px solid #c0c0c0;
  margin-left: 8px;
  padding-left: 8px;
  cursor: pointer;
`;

const StyledTooltip = styled(Tooltip)`
  & > .react-tooltip-lite {
    color: white;
    background: black;
    border-radius: 4px;
  }
`;

const Callout = styled.b`
  margin-top: 64px;
`;

const Link = styled.div`
  display: flex;
  margin-top: 8px;
  padding: 8px;
  background: #e0e0e0;
  border: 1.5px solid grey;
  border-radius: 4px;
  color: grey;
  text-decoration: none;
`;
