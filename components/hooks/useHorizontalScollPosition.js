import { useState, useEffect } from "react";

export default function useHorizontalScollPosition(refEl) {
  const [farLeft, setFarLeft] = useState(true);
  const [farRight, setFarRight] = useState(false);

  useEffect(() => {
    const element = refEl.current;

    function handleScoll(e) {
      setFarLeft(e.target.scrollLeft < 10);
      setFarRight(e.target.scrollWidth - e.target.scrollLeft - e.target.clientWidth < 10);
    }

    if (element !== null) {
      element.addEventListener("scroll", handleScoll, { passive: true });
    }

    return () => {
      if (element !== null) {
        element.removeEventListener("scroll", handleScoll);
      }
    };
  });

  return { farLeft, farRight };
}
