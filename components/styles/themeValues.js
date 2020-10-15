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

  switch (colorTheme) {
    case "light":
      return {
        background: "white",
        border: getBorderColor(props),
        activeBorder: "#387eff",
        activeShadow: "#4aabff",
      };
    case "dark":
      return {
        background: "rgba(255, 255, 255, 0.1)",
        border: getBorderColor(props),
        activeBorder: "#387eff",
        activeShadow: "#4aabff",
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
