import React from "react";
import { CreateCommunityController } from "@reddit-clone/controller";
import CreateCommunityView from "./ui/CreateCommunityView";

interface Props {
  closeForm: () => void;
}

const CreateCommunityConnector = (props: Props) => {
  return (
    <CreateCommunityController>
      {({ submit }) => (
        <CreateCommunityView submit={submit} closeForm={props.closeForm} />
      )}
    </CreateCommunityController>
  );
};

export default CreateCommunityConnector;
