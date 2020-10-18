function getTextColor({ theme: { colorTheme } }) {
  switch (colorTheme) {
    case "light":
      return "black";
    case "dark":
      return "white";
  }
}

function getBackgroundColor({ theme: { colorTheme } }) {
  switch (colorTheme) {
    case "light":
      return "#f2f2f2";
    case "dark":
      return "#303030";
  }
}

function getBorderColor({ theme: { colorTheme } }) {
  switch (colorTheme) {
    case "light":
      return "rgba(0, 0, 0, 0.2)";
    case "dark":
      return "rgba(255, 255, 255, 0.3)";
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

function getInputColors(props) {
  const {
    theme: { colorTheme },
  } = props;

  const base = {
    border: props.error == null ? getBorderColor(props) : "rgba(209, 30, 6, 0.7)",
    activeBorder: "#387eff",
    activeShadow: "#4aabff",
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
  }
}

function getTagBackground({ theme: { colorTheme } }) {
  switch (colorTheme) {
    case "light":
      return "rgba(0, 0, 0, 0.1)";
    case "dark":
      return "rgba(255, 255, 255, 0.1)";
  }
}

export {
  getTextColor,
  getBackgroundColor,
  getBorderColor,
  getFontFamily,
  getBoldFontWeight,
  getInputColors,
  getTagBackground,
};
