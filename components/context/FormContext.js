import { createContext, useState } from "react";

const FormContext = createContext({});

function FormProvider({ children }) {
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState({});
  const [debug, setDebug] = useState(false);
  const [rating, setRating] = useState(null);

  const value = {
    formData,
    setFormData,
    userData,
    setUserData,
    debug,
    setDebug,
    rating,
    setRating,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export { FormContext, FormProvider };
