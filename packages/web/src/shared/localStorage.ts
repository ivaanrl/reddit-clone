export const loadUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    if (user === null) {
      return undefined;
    }
    return JSON.parse(user);
  } catch (error) {
    return undefined;
  }
};

export const deleteUserFromLocalStorage = () => {
  try {
    localStorage.removeItem("user");
    return;
  } catch (error) {
    return;
  }
};

export const setThemeInLocalStorage = (theme: string) => {
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    return undefined;
  }
};

export const getThemeFromLocalStorage = () => {
  try {
    const theme = localStorage.getItem("theme");

    if (theme === null) {
      return "light";
    }
    return theme;
  } catch (error) {
    return "light";
  }
};
