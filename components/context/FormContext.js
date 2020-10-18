import { createContext, useState } from "react";

const FormContext = createContext({});

function FormProvider({ children }) {
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});
  const [rating, setRating] = useState(null);
  const [isDebug, setIsDebug] = useState(false);

  const errorCheck = (block, value) => {
    if (!value) value = userData[block.key] ?? null;

    return new Promise(resolve => {
      const clear = () => {
        setErrors(
          prev => ({ ...prev, [block.key]: [] }),
          () => resolve()
        );
      };

      if (block.data.required) {
        // TODO: Check for only spaces too
        if (!value || value.length == 0) {
          setErrors(
            prev => ({ ...prev, [block.key]: ["Field is requiered"] }),
            () => resolve()
          );
        } else {
          clear();
        }
      }
    });
  };

  const setUserDataByKey = (block, value) => {
    setUserData(prev => ({ ...prev, [block.key]: value }));

    if (value.length > 0) errorCheck(block, value);
  };

  const formComplete = async formData => {
    for (const block of formData.blocks) {
      if (block.key) {
        await errorCheck(block);
      }
    }

    return Object.values(errors).every(error => error.length == 0);
  };

  const value = {
    userData,
    setUserDataByKey,
    errors,
    errorCheck,
    formComplete,
    isDebug,
    setIsDebug,
    rating,
    setRating,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export { FormContext, FormProvider };
