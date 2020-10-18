import { createContext, useState, useMemo } from "react";

const FormContext = createContext({});

function FormProvider({ children }) {
  const [userData, setUserData] = useState({});
  const [rating, setRating] = useState(null);
  const [isDebug, setIsDebug] = useState(false);

  const setUserDataByKey = (key, value) => {
    setUserData(prev => ({ ...prev, [key]: value }));
  };

  const value = {
    userData,
    setUserData,
    setUserDataByKey,
    isDebug,
    setIsDebug,
    rating,
    setRating,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export { FormContext, FormProvider };
