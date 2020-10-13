const fetchForm = async (key, {formID}) => {
  const res = await fetch(`https://us-central1-formux-8d67b.cloudfunctions.net/form?formID=${formID}`);
  return res.json();
}

export { fetchForm }