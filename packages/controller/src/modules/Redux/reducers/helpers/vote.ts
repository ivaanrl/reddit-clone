export const vote = (user_vote: number, value: number, votes: number) => {
  if (value === user_vote) {
    votes = votes - user_vote;
    user_vote = 0;
  } else if (user_vote === 1 && value === -1) {
    votes = votes - 2;
    user_vote = -1;
  } else if (user_vote === -1 && value === 1) {
    votes = votes + 2;
    user_vote = 1;
  } else {
    votes += value;
    user_vote = value;
  }

  return { user_vote, votes };
};
