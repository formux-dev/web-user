import { createContext, useState, useMemo } from "react";

const FormContext = createContext({});

function FormProvider({ children }) {
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState({});
  const [rating, setRating] = useState(null);
  const [isDebug, setIsDebug] = useState(false);

  // const value = {
  //   formData,
  //   setFormData,
  //   userData,
  //   setUserData,
  //   isDebug,
  //   setIsDebug,
  //   rating,
  //   setRating,
  // };

  const value = useMemo(() => {
    return {
      formData,
      setFormData,
      userData,
      setUserData,
      isDebug,
      setIsDebug,
      rating,
      setRating,
    };
  }, [formData, userData, isDebug, rating]);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export { FormContext, FormProvider };
