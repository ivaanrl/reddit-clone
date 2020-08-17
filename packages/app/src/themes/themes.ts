export interface ThemeColors {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  colorBackground: string;
  colorCard: string;
  colorLine: string;
  textMain: string;
  textMUted: string;
  textFlair: string;
  inputBackground: string;
  highlightSelection: string;
  highlightSelectionHover: string;
  highlightSelectionTextColor: string;
  defaultProfilePictureBackground: string;
  linkColor: string;
  linkColorLight: string;
  highlightColor: string;
  error: string;
  nsfw: string;
  textEditorButtonColor: string;
  upvoteColor: string;
  downvoteColor: string;
}

const sharedColors = {
  linkColor: "#0079d3",
  linkColorLight: "#24a0ed",
  highlightColor: "#ff4500",
  error: "#ea0027",
  nsfw: "#ff585b",
  textEditorButtonColor: "#878a8c",
  textEditorButtonColorHover: "#dae0e6",
  upvoteColor: "#ff3300",
  downvoteColor: "#7193ec",
};

export const lightTheme = {
  dark: false,
  colors: {
    primary: "#dae0e6",
    background: "#dae0e6",
    card: "#ffffff",
    text: "#1c1c1c",
    border: "#ccc",
    notification: "#ffffff",
    colorBackground: "#dae0e6",
    colorCard: "#ffffff",
    colorLine: "#ccc",
    textMain: "#1c1c1c",
    textMuted: "#787c7e",
    textFlair: "#1a1a1b",
    inputBackground: "#ffffff",
    highlightSelection: "#0079d3",
    highlightSelectionHover: "#3394dc",
    highlightSelectionTextColor: "#ffffff",
    defaultProfilePictureBackground: "#d7dfe2",
    ...sharedColors,
  },
};

export const darkTheme = {
  dark: true,
  colors: {
    primary: "#030303",
    background: "#030303",
    card: "#1a1a1b",
    text: "#d7dadc",
    border: "#343536",
    notification: "#ffffff",
    colorBackground: "#030303",
    colorCard: "#1a1a1b",
    colorLine: "#343536",
    textMain: "#d7dadc",
    textMuted: "#818384",
    textFlair: "#ffffff",
    inputBackground: "#272729",
    highlightSelection: "#d7dadc",
    highlightSelectionHover: "#ffffff",
    highlightSelectionTextColor: "#1a1a1b",
    defaultProfilePictureBackground: "#818384",
    ...sharedColors,
  },
};

/*export const lightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...sharedColors,
    colorBackground: "#dae0e6",
    colorCard: "#ffffff",
    colorLine: "#ccc",
    textMain: "#1c1c1c",
    textMuted: "#787c7e",
    textFlair: "#1a1a1b",
    inputBackground: "#ffffff",
    highlightSelection: "#0079d3",
    highlightSelectionHover: "#3394dc",
    highlightSelectionTextColor: "#ffffff",
    defaultProfilePictureBackground: "#d7dfe2",
    loadingPostBackground: "linear-gradient(90deg, black, #575454)",
  },
};

export const darkTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...sharedColors,
    colorBackground: "#030303",
    colorCard: "#1a1a1b",
    colorLine: "#343536",
    textMain: "#d7dadc",
    textMuted: "#818384",
    textFlair: "#ffffff",
    inputBackground: "#272729",
    highlightSelection: "#d7dadc",
    highlightSelectionHover: "#ffffff",
    highlightSelectionTextColor: "#1a1a1b",
    defaultProfilePictureBackground: "#818384",
    loadingPostBackground:
      "linear-gradient(90deg, #ffffff, #575454, blue, red)",
  },
}; */
