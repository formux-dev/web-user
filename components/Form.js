import { useContext } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { useQuery, useMutation } from "react-query";

import { FormContext } from "./context/FormContext";
import { fetchForm, submitForm } from "./queries/endpoints";
import { getInputColors, getTextColor } from "./styles/themeValues";

import Navbar from "./Navbar";
import Block from "./Block";
import Title from "./Title";
import Rating from "./Rating";
import FormSkeleton from "./FormSkeleton";
import Debug from "./Debug";
import Wrapper from "./Wrapper";

export default function Form({ formID }) {
  const { rating, userData } = useContext(FormContext);

  const {
    isLoading: isFormLoading,
    isError: isFormError,
    error: formError,
    data: formData,
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
      isIdle: isSubmitIdle,
      error: submitError,
      reset: submitReset,
    },
  ] = useMutation(submitForm);

  const handleSubmit = (e, userData) => {
    e.preventDefault();

    // TODO: Add validation

    if (userData) {
      const { blocks, theme } = formData;

      const requestData = {
        formID,
        rating: {
          value: rating,
          theme,
        },
        userData: blocks
          .map(block => {
            return {
              key: block.key,
              value: userData[block.key],
            };
          })
          .filter(block => block.key != undefined),
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
        <Navbar />

        {(isSubmitIdle || isSubmitLoading || isSubmitError) && (
          <form>
            <Debug />

            <Title>{formData.meta && formData.meta.title}</Title>

            {formData.blocks.map((block, index) => (
              <Block block={block} key={index} index={index} />
            ))}

            <Rating />

            {isSubmitIdle && (
              <SubmitButton onClick={e => handleSubmit(e, userData)}>
                Submit my reponse
              </SubmitButton>
            )}

            {isSubmitLoading && <SubmitButton disabled>Submitting...</SubmitButton>}

            {isSubmitError && (
              <Error>
                <p>Something went wrong</p>
                <b onClick={() => submitReset()}>Try again</b>
              </Error>
            )}
          </form>
        )}

        {isSubmitSuccess && (
          <div>
            <Title>Thanks for your response!</Title>
            <p>Data submitted successfully</p>
          </div>
        )}
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

const Error = styled.div`
  margin-top: 64px;
  padding: 32px;
  font-size: 1.2em;
  border-radius: 4px;
  width: 100%;
  background: #d93232;
  text-align: center;
  color: white;
`;
