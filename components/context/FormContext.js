import { createContext, useState } from "react";

const FormContext = createContext({});

function FormProvider({ children }) {
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});
  const [isDebug, setIsDebug] = useState(false);

  const errorCheck = (block, value) => {
    value = value ?? userData[block.key];

    if (block.data.required) {
      // TODO: Check for actual things (maybe a switch?)

      console.log(block.type, value);

      if (!value || value.length == 0) {
        setErrors(prev => ({ ...prev, [block.key]: ["Field is requiered"] }));
        return false;
      } else {
        setErrors(prev => ({ ...prev, [block.key]: [] }));
      }
    }

    return true;
  };

  const setUserDataByKey = (block, value) => {
    setUserData(prev => ({ ...prev, [block.key]: value }));
    errorCheck(block, value);
  };

  const isFormComplete = async formData => {
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
