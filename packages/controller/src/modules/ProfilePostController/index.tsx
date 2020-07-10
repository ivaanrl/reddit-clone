import { formatDate } from "../../shared/formatDate";

interface Props {
  children: (data: {
    formatDate: (date: string) => string;
    vote: (id: string, voteValue: number, index: number) => void;
  }) => JSX.Element;
}

export const ProfilePostController = (props: Props) => {
  const vote = (id: string, voteValue: number, index: number) => {};

  return props.children({ formatDate, vote });
};
