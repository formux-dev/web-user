import { createContext, useState } from "react";
import translations from "../i18n/translations";

const FormContext = createContext({});

function FormProvider({ children }) {
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});
  const [isDebug, setIsDebug] = useState(false);

  const errorCheck = (block, value) => {
    // Returns true if no errors

    value = value ?? userData[block.key];

    if (block.data.required) {
      // We won't check for other things because it
      // does not matter a lot for this experiment

      // Ugly i18n hack. I know

      if (!value || value.length == 0) {
        setErrors(prev => ({
          ...prev,
          [block.key]: navigator.languages.includes("sv")
            ? translations.sv.validation.required
            : translations.en.validation.required,
        }));
        return false;
      } else {
        setErrors(prev => ({ ...prev, [block.key]: null }));
      }
    }

    return true;
  };

  const setUserDataByKey = (block, value) => {
    setUserData(prev => ({ ...prev, [block.key]: value }));
    errorCheck(block, value);
  };

  const isFormComplete = formData => {
    return formData.blocks.every(block => (block.key ? errorCheck(block) : true));
  };

  const value = {
    userData,
    setUserDataByKey,
    errors,
    errorCheck,
    isFormComplete,
    isDebug,
    setIsDebug,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export { FormContext, FormProvider };
