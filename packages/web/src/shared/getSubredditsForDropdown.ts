export const getSubredditsForDropdown = (
  subs: {
    id: number;
    name: string;
    adultContent: boolean;
  }[],
  addHome: boolean
) => {
  const subsOptions: { value: string; label: string }[] = addHome
    ? [{ value: "home", label: "Home" }]
    : [];
  subs.forEach((sub) => {
    subsOptions.push({
      value: sub.name,
      label: sub.name,
    });
  });

  return subsOptions;
};
