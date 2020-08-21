import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as SVG from "react-native-svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { voteButton } from "../../../styles/vote";
import { useTheme } from "@react-navigation/native";
import { ThemeColors } from "../../../themes/themes";

interface Props {
  id?: string;
  path?: string[];
  index?: number;
  votes: string | number;
  user_vote: number;
  reducer?: string;
  voteComment?: (path: string[], voteValue: number) => void;
  votePost?: (
    id: string,
    voteValue: number,
    index: number,
    reducer: string
  ) => void;
  voteFullPost?: (id: string, voteValue: number) => void;
  showCount: boolean;
  child: boolean;
}

const Vote = (props: Props) => {
  const { SvgXml } = SVG;
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const {
    votePost,
    path,
    voteComment,
    id,
    index,
    votes,
    reducer,
    user_vote,
    voteFullPost,
    showCount,
    child,
  } = props;

  //true for upvote
  //false for downvote
  //null for no vote
  const [voteColor, setVoteColor] = useState<boolean | null>(null);

  const [voteCountClass, setVoteCountClass] = useState<
    "voteCount" | "voteCountUpvote" | "voteCountDownvote"
  >("voteCount");

  useEffect(() => {
    if (user_vote === 1) {
      setVoteColor(true);
      setVoteCountClass("voteCountUpvote");
    } else if (user_vote === -1) {
      setVoteColor(false);
      setVoteCountClass("voteCountDownvote");
    }
  }, [user_vote]);

  const handleVote = (voteValue: number) => {
    if (votePost && reducer && (index || index === 0) && id) {
      votePost(id, voteValue, index, reducer);
    } else if (voteFullPost && id) {
      voteFullPost(id, voteValue);
    } else if (voteComment && path) {
      voteComment(path, voteValue);
    }

    if (voteValue === 1) {
      if (voteColor) {
        setVoteCountClass("voteCount");
      } else {
        setVoteCountClass("voteCountUpvote");
      }
      setVoteColor(true);
    } else {
      voteColor === false
        ? setVoteCountClass("voteCount")
        : setVoteCountClass("voteCountDownvote");
      setVoteColor(false);
    }
  };

  const voteXML = `
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      xmlns="http://www.w3.org/2000/svg"
    >
    <rect x="5.71429" y="4.73685" width="4.57143" height="9.26316" />
    <path d="M8 0L14.9282 7.5H1.0718L8 0Z" />
    </svg>`;

  const styles = StyleSheet.create({
    votesContainer: {
      flexDirection: "row",
      height: 20,
      alignItems: "center",
    },
    voteContainer: {},
    upvoteContainer: {},
    downvoteContainer: {},
    voteCountContainer: { marginLeft: 10, marginRight: 10 },
    voteCount: {
      color: colors.textMuted,
    },
    voteCountDownvote: {
      color: colors.downvoteColor,
    },
    voteCountUpvote: {
      color: colors.upvoteColor,
    },
    vote: {
      ...voteButton,
    },
  });

  const getVoteCountClass = () => {
    switch (voteCountClass) {
      case "voteCount":
        return styles.voteCount;
      case "voteCountDownvote":
        return styles.voteCountDownvote;
      case "voteCountUpvote":
        return styles.voteCountUpvote;
      default:
        return styles.voteCount;
    }
  };

  return (
    <View style={styles.votesContainer}>
      <View style={styles.voteContainer}>
        <TouchableOpacity style={styles.vote} onPress={() => handleVote(1)}>
          <SvgXml
            xml={voteXML}
            width="100%"
            height="100%"
            fill={voteColor ? colors.upvoteColor : colors.textMuted}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.voteCountContainer}>
        <Text style={getVoteCountClass()}>{votes}</Text>
      </View>
      <View style={styles.voteContainer}>
        <TouchableOpacity style={styles.vote} onPress={() => handleVote(-1)}>
          <SvgXml
            xml={voteXML}
            width="100%"
            height="100%"
            fill={voteColor === false ? colors.downvoteColor : colors.textMuted}
            rotation={180}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Vote;
