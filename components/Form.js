import { useContext, useEffect, useMemo, useState } from "react";
import styled, { ThemeProvider, css } from "styled-components";

import { useQuery, useMutation } from "react-query";

import { FormContext } from "./context/FormContext";
import { getForm, postForm } from "../queries/client";
import { getInputColors, getTextColor } from "./styles/themeValues";

import Navbar from "./Navbar";
import Block from "./Block";
import Title from "./Title";
import FormSkeleton from "./FormSkeleton";
import Debug from "./Debug";
import Wrapper from "./Wrapper";
import SubmitSuccess from "./SubmitSuccess";
import { useHotkeys } from "react-hotkeys-hook";
import translations from "./i18n/translations";

export default function Form({ formId }) {
  const { userData, isFormComplete, language, setLanguage } = useContext(FormContext);
  const [clickedSend, setClickedSend] = useState(false);
  const [userDataChanged, setUserDataChanged] = useState(false);

  useEffect(() => {
    setUserDataChanged(true);
  }, [userData]);

  if (process.env.NODE_ENV == "development") {
    useHotkeys("ctrl+b", () => refetch());
  }

  const {
    isLoading: isFormLoading,
    isError: isFormError,
    error: formError,
    data: formData,
    refetch,
  } = useQuery(["form", { formId }], getForm, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: data => {
      console.log(translations[data.meta.language].appTitle);
      console.log(data.meta.language);
      setLanguage(data.meta.language);
    },
  });

  const [
    mutate,
    {
      isLoading: isSubmitLoading,
      isError: isSubmitError,
      isSuccess: isSubmitSuccess,
      error: submitError,
      reset: submitReset,
    },
  ] = useMutation(postForm);

  const handleSubmit = async (event, formData) => {
    if (event) event.preventDefault();

    setClickedSend(true);
    setUserDataChanged(false);

    if (isFormComplete(blocksWithRating, true)) {
      const requestData = {
        formId,
        rating: userData["__Formux__Rating"],
        theme: formData.theme,
        data: formData.blocks
          .filter(block => block.key != undefined)
          .map(block => {
            return {
              key: block.key,
              value: userData[block.key],
            };
          }),
      };

      mutate(requestData);
    }
  };

  const blocksWithRating = useMemo(() => {
    const rating = {
      type: "rating",
      key: "__Formux__Rating",
      data: {
        required: true,
        title: translations[language].rating.title,
        description: translations[language].rating.description,
        help: translations[language].rating.help,
        total: translations[language].rating.total,
      },
    };

    return [...(formData ? formData.blocks : []), rating];
  }, [formData]);

  if (isFormLoading) {
    return (
      <Wrapper>
        <FormSkeleton />
      </Wrapper>
    );
  }

  if (isFormError) {
    return (
      <Wrapper>
        <Title>Error</Title>
        <p>{formError.message}</p>
      </Wrapper>
    );
  }

  return (
    <ThemeProvider theme={formData.theme}>
      <Wrapper>
        {formData.theme.showNavbar && <Navbar lang={language} />}

        {!isSubmitSuccess && (
          <form>
            {formData.theme.showImage && <Image src={formData.meta.image} />}

            <Debug />

            <Title>{formData.meta && formData.meta.title}</Title>

            {blocksWithRating.map((block, index) => (
              <Block block={block} key={index} index={index} />
            ))}

            {!isSubmitLoading &&
              !isSubmitError &&
              (!clickedSend || isFormComplete(blocksWithRating, false) || userDataChanged) && (
                <SubmitButton onClick={e => handleSubmit(e, formData)}>
                  {translations[language].submitButton.default}
                </SubmitButton>
              )}

            {clickedSend && !isFormComplete(blocksWithRating, false) && !userDataChanged && (
              <SubmitButton disabled>{translations[language].submitButton.fillOut}</SubmitButton>
            )}

            {isSubmitLoading && (
              <SubmitButton disabled>{translations[language].submitButton.sending}</SubmitButton>
            )}

            {isSubmitError && (
              <Error
                onClick={() => {
                  submitReset();
                  handleSubmit(null, formData);
                }}
              >
                <p>Error: {submitError.message}</p>
                <b>{translations[language].submitButton.tryAgain}</b>
              </Error>
            )}
          </form>
        )}

        {isSubmitSuccess && <SubmitSuccess lang={language} formId={formId} />}
      </Wrapper>
    </ThemeProvider>
  );
}

const SubmitButton = styled.button`
  margin-top: 64px;
  padding: 32px;
  font-size: 1.2em;
  border-radius: 4px;
  width: 100%;
  outline: none;
  border: 1.5px solid ${props => getInputColors(props).border};
  background: ${props => getInputColors(props).background};
  color: ${props => getTextColor(props)};

  &:focus {
    box-shadow: 0px 0px 0px 3px ${props => getInputColors(props).activeShadow};
    border: 1.5px solid ${props => getInputColors(props).activeBorder};
  }

  &:disabled {
    color: grey;
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: 300px;
  border-radius: 8px;
`;

const Error = styled.div`
  margin-top: 64px;
  padding: 32px;
  font-size: 1.2em;
  border-radius: 4px;
  width: 100%;
  background: #d44a4a;
  text-align: center;
  color: white;
  cursor: pointer;
`;
