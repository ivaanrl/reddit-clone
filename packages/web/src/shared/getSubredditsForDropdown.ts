export const getSubredditsForDropdown = (
  subs: {
    name: string;
    adultContent: boolean;
  }[],
  addHome: boolean
) => {
  const subsOptions: { value: string; label: string }[] = addHome
    ? [{ value: "home", label: "Home" }]
    : [];
  if (subs) {
    subs.forEach((sub) => {
      subsOptions.push({
        value: sub.name,
        label: sub.name,
      });
    });
  }

  return subsOptions;
};
