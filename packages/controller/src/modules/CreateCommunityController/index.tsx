import superagent from "superagent";
import APIUrl from "../../requestInfo";

interface Props {
  children: (data: {
    submit: (values: {
      name: string;
      communityTopics: string[];
      description: string;
      adultContent: boolean;
    }) => Promise<superagent.Response>;
  }) => JSX.Element;
}

export const CreateCommunityController = (props: Props) => {
  const submit = async (values: {
    name: string;
    communityTopics: string[];
    description: string;
    adultContent: boolean;
  }) => {
    let response: superagent.Response;
    try {
      response = await superagent
        .agent()
        .withCredentials()
        .post(APIUrl + "/subreddit/createSubreddit")
        .send(values);
    } catch (error) {
      response = error.response;
    }
    return response;
  };

  return props.children({ submit });
};
