function getTextColor({ theme: { colorTheme } }) {
  switch (colorTheme) {
    case "light":
      return "black";
    case "dark":
      return "white";
    case "beige":
      return "black";
  }
}

function getBackgroundColor({ theme: { colorTheme } }) {
  switch (colorTheme) {
    case "light":
      return "#f2f2f2";
    case "dark":
      return "#303030";
    case "beige":
      return "#fff6e8";
  }
}

function getBorderColor({ theme: { colorTheme } }) {
  switch (colorTheme) {
    case "light":
      return "rgba(0, 0, 0, 0.2)";
    case "dark":
      return "rgba(255, 255, 255, 0.3)";
    case "beige":
      return "rgba(0, 0, 0, 0.2)";
  }
}

function getFontFamily({ theme: { fontCategory } }) {
  switch (fontCategory) {
    case "sans-serif":
      return `"Inter", sans-serif`;
    case "serif":
      return `"Lora", sans-serif`;
  }
}

function getBoldFontWeight({ theme: { fontCategory } }) {
  switch (fontCategory) {
    case "sans-serif":
      return 600;
    case "serif":
      return 500;
  }
}

function getAccentColors({ theme: { colorAccent } }) {
  switch (colorAccent) {
    case "blue":
      return { activeBorder: "#387eff", activeShadow: "#4aabff" };
    case "orange":
      return { activeBorder: "#ffa238", activeShadow: "#ffab4a" };
  }
}

function getInputColors(props) {
  const { colorTheme } = props.theme;

  const base = {
    border: props.error == null ? getBorderColor(props) : getErrorColor(props),
    activeBorder: getAccentColors(props).activeBorder,
    activeShadow: getAccentColors(props).activeShadow,
  };

  switch (colorTheme) {
    case "light":
      return {
        ...base,
        background: "white",
      };
    case "dark":
      return {
        ...base,
        background: "rgba(255, 255, 255, 0.1)",
      };
    case "beige":
      return {
        ...base,
        background: "white",
      };
  }
}

function getErrorColor({ theme: { colorTheme } }) {
  switch (colorTheme) {
    case "light":
    case "beige":
      return "#d6351e";
    case "dark":
      return "#9c2313";
  }
}

function getIcon({ theme: { colorAccent } }) {
  switch (colorAccent) {
    case "blue":
      return {
        check: "url(/check-blue.svg)",
        dot: "url(/dot-blue.svg)",
      };
    case "orange":
      return {
        check: "url(/check-orange.svg)",
        dot: "url(/dot-orange.svg)",
      };
  }
}

function getTagBackground({ theme: { colorTheme } }) {
  switch (colorTheme) {
    case "light":
      return "rgba(0, 0, 0, 0.1)";
    case "dark":
      return "rgba(255, 255, 255, 0.1)";
    case "beige":
      return "rgba(0, 0, 0, 0.1)";
  }
}

export {
  getTextColor,
  getBackgroundColor,
  getBorderColor,
  getFontFamily,
  getBoldFontWeight,
  getInputColors,
  getErrorColor,
  getTagBackground,
  getIcon,
};
