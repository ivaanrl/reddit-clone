import { registerThemes } from "react-native-themed-styles";
import { useColorScheme } from "react-native-appearance";

const light = { backgroundColor: "white", textColor: "black" };
const dark = { backgroundColor: "black", textColor: "white" };

const styleSheetFactory = registerThemes({ light, dark }, () => {
  const colorScheme = useColorScheme();
  return ["light", "dark"].includes(colorScheme)
    ? (colorScheme as "light" | "dark")
    : "light";
});

const styleSheet = styleSheetFactory((theme) => {
  container: {
    backgroundColor: theme.backgroundColor;
    flex: 1;
  }
  text: {
    color: theme.textColor;
  }
});

export { styleSheetFactory, styleSheet };
