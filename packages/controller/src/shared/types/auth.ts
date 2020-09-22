export type authReducerState = {
  username: string;
  email: string;
  karma: number;
  userSubs: { name: string; adultContent: boolean }[];
  unreadNotifications: number;
  message: {
    status: number;
    text: string;
  };
};
