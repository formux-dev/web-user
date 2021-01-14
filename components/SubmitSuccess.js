import copy from "copy-to-clipboard";
import Tooltip from "react-tooltip-lite";

import styled from "styled-components";
import { getBorderColor, getInputColors, getTextColor } from "./styles/themeValues";

export default function SubmitSuccess({ formID, lang }) {
  const handleClick = () => {
    copy("https://formux.web.app/" + formID);
  };

  return (
    <StyledSubmitSuccess>
      <h1>Tack för ditt svar</h1>
      <p>Ditt svar är skickat</p>
      <Callout>Dela gärna det här formuläret med dina vänner</Callout>
      <LinkBox>
        <Link>https://formux.web.app/{formID}/</Link>
        <StyledTooltip
          direction="bottom"
          content="Kopierat!"
          eventOn="onClick"
          eventOff="onMouseOut"
          useHover={false}
        >
          <CopyButton onClick={() => handleClick()}>Copy link</CopyButton>
        </StyledTooltip>
      </LinkBox>
    </StyledSubmitSuccess>
  );
}

const StyledSubmitSuccess = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: ${props => getTextColor(props)};
`;

const LinkBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  padding: 8px;
  background: ${props => getInputColors(props).background};
  border: 1.5px solid ${props => getInputColors(props).border};
  border-radius: 4px;
  color: ${props => getInputColors(props).getTextColor};
  text-decoration: none;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Link = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const CopyButton = styled.p`
  border-left: 1.5px solid ${props => getBorderColor(props)};
  margin-left: 8px;
  padding-left: 8px;
  cursor: pointer;

  @media (max-width: 600px) {
    border-left: none;
    border-top: 1.5px solid ${props => getBorderColor(props)};
    margin-left: none;
    padding-left: none;
    margin-top: 8px;
    padding-top: 8px;
  }
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
