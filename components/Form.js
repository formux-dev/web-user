import { useContext } from "react";
import styled, { ThemeProvider, css } from "styled-components";

import { useQuery, useMutation } from "react-query";

import { FormContext } from "./context/FormContext";
import { fetchForm, submitForm } from "./queries/endpoints";
import { getInputColors, getTextColor } from "./styles/themeValues";

import Navbar from "./Navbar";
import Block from "./Block";
import Title from "./Title";
import FormSkeleton from "./FormSkeleton";
import Debug from "./Debug";
import Wrapper from "./Wrapper";
import SubmitSuccess from "./SubmitSuccess";
import { useHotkeys } from "react-hotkeys-hook";

export default function Form({ formID }) {
  const { userData, isFormComplete } = useContext(FormContext);

  useHotkeys("ctrl+b", () => refetch());

  const {
    isLoading: isFormLoading,
    isError: isFormError,
    error: formError,
    data: formData,
    refetch,
  } = useQuery(["form", { formID }], fetchForm, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
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
  ] = useMutation(submitForm);

  const handleSubmit = async (e, formData) => {
    if (e) e.preventDefault();

    if (isFormComplete(formData)) {
      const requestData = {
        formID,
        rating: userData["__Formux__Rating"],
        data: formData.blocks
          .filter(block => block.key != undefined)
          .filter(block => block.key != "__Formux__Rating")
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

  if (isFormLoading) {
    return (
      <Wrapper>
        <Navbar />
        <FormSkeleton />
      </Wrapper>
    );
  }

  if (isFormError) {
    return (
      <Wrapper>
        <Navbar />
        <Title>Failed to load form</Title>
        <p>{formError.message}</p>
      </Wrapper>
    );
  }

  return (
    <ThemeProvider theme={formData.theme}>
      <Wrapper>
        {formData.theme.showNavbar && <Navbar />}

        {!isSubmitSuccess && (
          <form>
            {formData.theme.showImage && <Image src={formData.meta.image} />}

            <Debug />

            <Title>{formData.meta && formData.meta.title}</Title>

            {formData.blocks.map((block, index) => (
              <Block block={block} key={index} index={index} />
            ))}

            {!isSubmitLoading && !isSubmitError && (
              <SubmitButton onClick={e => handleSubmit(e, formData)}>
                Submit my reponse
              </SubmitButton>
            )}

            {isSubmitLoading && <SubmitButton disabled>Submitting...</SubmitButton>}

            {isSubmitError && (
              <Error
                onClick={() => {
                  submitReset();
                  handleSubmit(null, formData);
                }}
              >
                <p>Error: {submitError.message}</p>
                <b>Try again</b>
              </Error>
            )}
          </form>
        )}

        {isSubmitSuccess && <SubmitSuccess lang={formData.meta.lang} formID={formID} />}
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
    border-color: transparent;
    box-shadow: 0px 0px 0px 3px #4aabff;
    border: 1.5px solid #387eff;
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
  background: #d93232;
  text-align: center;
  color: white;
  cursor: pointer;
`;
