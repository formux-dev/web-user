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
      return "rgba(0, 0, 0, 0.05)";
    case "dark":
      return "rgba(0, 0, 0, 0.85)";
  }
}

function getBorderColor({ theme: { colorTheme } }) {
  switch (colorTheme) {
    case "light":
      return "rgba(0, 0, 0, 0.2)";
    case "dark":
      return "rgba(255, 255, 255, 0.2)";
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
      };
    case "dark":
      return {
        background: "rgba(255, 255, 255, 0.1)",
        border: getBorderColor(props),
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
