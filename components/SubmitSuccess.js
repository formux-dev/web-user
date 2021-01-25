import copy from "copy-to-clipboard";
import Tooltip from "react-tooltip-lite";

import styled from "styled-components";
import translations from "./i18n/translations";
import { getBorderColor, getInputColors, getTextColor } from "./styles/themeValues";

export default function SubmitSuccess({ formId, lang }) {
  const handleClick = () => {
    if (window) plausible("Copied link");
    copy("https://formux.web.app/" + formId);
  };

  return (
    <StyledSubmitSuccess>
      <h1>{translations[lang].submitSuccess.title}</h1>
      <p>{translations[lang].submitSuccess.subtitle}</p>
      <Callout>{translations[lang].submitSuccess.callout}</Callout>
      <LinkBox>
        <Link>https://formux.web.app/{formId}/</Link>
        <StyledTooltip
          direction="bottom"
          content={translations[lang].submitSuccess.button.message}
          eventOn="onClick"
          eventOff="onMouseOut"
          useHover={false}
        >
          <CopyButton onClick={() => handleClick()}>
            {translations[lang].submitSuccess.button.text}
          </CopyButton>
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
