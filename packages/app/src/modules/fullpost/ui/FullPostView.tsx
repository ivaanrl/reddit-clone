import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import { postStyles, fontSizes, separatorStyles } from "../../../styles";
import { useTheme, useRoute } from "@react-navigation/native";
import { ThemeColors } from "../../../themes/themes";
import HTML from "react-native-render-html";
import Vote from "../../post/vote/Vote";
import Icon from "react-native-vector-icons/FontAwesome";
import CommentsConnector from "../comments/CommentsConnector";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
  getFullPost: (postId: string) => void;
  sanitizeContent: (content: string[]) => { __html: string };
  formatDate: (date: string) => string;
  vote: (id: string, voteValue: number) => void;
  comment: (postId: string, content: string[]) => void;
}

const FullPostView = (props: Props) => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;

  const styles = StyleSheet.create({
    mainContainer: {
      flexDirection: "column",
      padding: 10,
      backgroundColor: colors.colorCard,
    },
    subredditInfoContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    subredditImageContainer: {
      marginRight: 10,
    },
    subredditImage: {
      width: 25,
      height: 25,
      borderRadius: 100,
      backgroundColor: "pink",
    },
    subredditInfoTextContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    subredditNameContainer: {},
    subredditNameText: {
      color: colors.textMain,
    },
    postedByContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    postedByText: {
      color: colors.textMuted,
    },
    postTitleContainer: {
      marginBottom: 15,
    },
    postTitleText: {
      ...fontSizes.postTitleFont,
      color: colors.textMain,
    },
    postContentContainer: {},
    postContentText: {},
    bottomBarContainer: {
      ...postStyles.bottomBarMainContainer,
    },
    voteContainer: {
      flex: 1,
    },
    commentCountContainer: {
      ...postStyles.bottomBarContainer,
    },
    commentCountIcon: {
      color: colors.textMuted,
      fontSize: 15,
      marginRight: 10,
    },
    savePostContainer: {},
    bookmarkContainer: { ...postStyles.bottomBarContainer, marginRight: 10 },
    bookmarIcon: { color: colors.textMuted, fontSize: 15, marginRight: 10 },
    bottomBarText: {
      color: colors.textMuted,
    },
    dotSeparator: {
      ...separatorStyles.dotSeparator,
      backgroundColor: colors.textMuted,
    },
  });

  const { getFullPost, sanitizeContent, formatDate, vote, comment } = props;
  const route = useRoute();

  const user = useSelector((state: State) => state.auth);
  const {
    id,
    author_username,
    title,
    content,
    createdAt,
    updatedAt,
    subreddit_name,
    votes,
    user_vote,
    comments,
  } = useSelector((state: State) => state.fullPost);

  useEffect(() => {
    const id = (route.params as { id: string }).id;
    getFullPost(id);
  }, [getFullPost, route, route.params]);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.subredditInfoContainer}>
        <View style={styles.subredditImageContainer}>
          <View style={styles.subredditImage} />
        </View>
        <View style={styles.subredditInfoTextContainer}>
          <View style={styles.subredditNameContainer}>
            <Text style={styles.subredditNameText}>r/{subreddit_name}</Text>
          </View>
          <View style={styles.postedByContainer}>
            <Text style={styles.postedByText}>
              Posted by u/{author_username}
            </Text>
            <View style={styles.dotSeparator} />
            {createdAt ? (
              <Text style={styles.postedByText}>{formatDate(createdAt)}</Text>
            ) : null}
          </View>
        </View>
      </View>
      <View style={styles.postTitleContainer}>
        <Text style={styles.postTitleText}>{title}</Text>
      </View>
      <View style={styles.postContentContainer}>
        <HTML
          tagsStyles={{
            i: {
              color: colors.textMain,
            },
            p: { color: colors.textMain },
            b: { color: colors.textMain },
            color: colors.textMain,
          }}
          html={sanitizeContent(content).__html}
        />
      </View>
      <View style={styles.bottomBarContainer}>
        <View style={styles.voteContainer}>
          <Vote
            id={id}
            votes={votes}
            user_vote={user_vote}
            voteFullPost={vote}
            showCount={true}
            child={false}
          />
        </View>
        <TouchableOpacity style={styles.commentCountContainer}>
          <Icon name="comment" style={styles.commentCountIcon} />
          <Text style={styles.bottomBarText}>{comments.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookmarkContainer}>
          <Icon name="bookmark" style={styles.bookmarIcon} />
          <Text style={styles.bottomBarText}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 20 }} />
      <CommentsConnector />
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

export default FullPostView;
