import { useDispatch } from "react-redux";
import superagent from "superagent";
import APIUrl from "../../requestInfo";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    submit: (values: {
      name: string;
      communityTopics: string[];
      description: string;
      adultContent: boolean;
    }) => void; //Promise<superagent.Response>;
  }) => JSX.Element;
}

export const CreateCommunityController = (props: Props) => {
  const dispatch = useDispatch();
  /* const submit = async (values: {
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
  };*/
  const submit = (values: {
    name: string;
    communityTopics: string[];
    description: string;
    adultContent: boolean;
  }) => {
    dispatch(allActions.createSubreddit(values));
  };

  return props.children({ submit });
};
