import { createContext, useState } from "react";
import translations from "../i18n/translations";

const FormContext = createContext({});

function FormProvider({ children }) {
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});
  const [isDebug, setIsDebug] = useState(false);
  const [language, setLanguage] = useState("en");

  const errorCheck = (updateErrors, block, value) => {
    // Returns true if no errors

    value = value ?? userData[block.key];

    if (block.data.required) {
      // We won't check for other things because it
      // does not matter a lot for this experiment

      if (!value || (value && value.toString().trim().length == 0)) {
        if (updateErrors) {
          setErrors(prev => ({
            ...prev,
            [block.key]: translations[language].validation.required,
          }));
        }

        return false;
      } else {
        if (updateErrors) setErrors(prev => ({ ...prev, [block.key]: null }));
      }
    }

    return true;
  };

  const setUserDataByKey = (block, value) => {
    setUserData(prev => ({ ...prev, [block.key]: value }));
    errorCheck(true, block, value);
  };

  const isFormComplete = (updateErrors, blocks) => {
    return blocks.every(block => (block.key ? errorCheck(updateErrors, block) : true));
  };

  const value = {
    userData,
    setUserDataByKey,
    errors,
    errorCheck,
    isFormComplete,
    isDebug,
    setIsDebug,
    language,
    setLanguage,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export { FormContext, FormProvider };
