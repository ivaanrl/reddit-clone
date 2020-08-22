import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Vote from "../vote/Vote";
import { postTitleFont } from "../../../styles/fontSizes";
import HTML from "react-native-render-html";
import { ThemeColors } from "../../../themes/themes";
import { useTheme } from "@react-navigation/native";

interface Props {
  sanitizeContent: (content: string[] | null) => { __html: string };
  formatDate: (date: string) => string;
  postInfo: {
    author_id: string;
    author_username: string;
    content: string[] | null;
    createdAt: string;
    updatedAt: string;
    subreddit_name: string;
    votes: string;
    title: string;
    id: string;
    user_vote: number;
    index: number;
    comment_count: number;
    link: string | null;
    type: string;
  };
  reducer: string;
  vote: (id: string, voteValue: number, index: number, reducer: string) => void;
  showSubredditName: boolean;
}

const PostView = (props: Props) => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const {
    sanitizeContent,
    formatDate,
    vote,
    showSubredditName,
    reducer,
    postInfo,
  } = props;
  const {
    author_username,
    content,
    createdAt,
    subreddit_name,
    votes,
    title,
    id,
    user_vote,
    index,
    comment_count,
    type,
    link,
  } = postInfo;

  const styles = StyleSheet.create({
    mainContainer: {
      padding: 10,
      marginBottom: 10,
      backgroundColor: colors.colorCard,
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    headerTextContainer: {},
    subredditIcon: {
      height: 30,
      width: 30,
      backgroundColor: "blue",
      borderRadius: 100,
      marginRight: 15,
    },
    subredditNameContainer: {},
    subredditName: {
      color: colors.textMain,
    },
    postCreatedByInfo: {
      flexDirection: "row",
    },
    postedBy: {
      color: colors.textMuted,
    },
    authorUsername: {},
    authorUsernameText: { color: colors.textMuted },
    dateText: { color: colors.textMuted },
    dotSeparator: {},
    titleContainer: {},
    title: {
      ...postTitleFont,
      color: colors.textMain,
      paddingLeft: 5,
      paddingTop: 10,
      paddingBottom: 10,
    },
    postContainer: { paddingLeft: 5 },
    postContent: { color: colors.textMain },
    imagePostContainer: {},
    imagePost: {
      aspectRatio: 16 / 9,
    },
    bottomBarContainer: { marginLeft: -2, marginTop: 20, marginBottom: 5 },
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.subredditIcon}></TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <TouchableOpacity style={styles.subredditNameContainer}>
            <Text style={styles.subredditName}>{subreddit_name}</Text>
          </TouchableOpacity>
          <View style={styles.postCreatedByInfo}>
            <Text style={styles.postedBy}>Posted by </Text>
            <TouchableOpacity style={styles.authorUsername}>
              <Text style={styles.authorUsernameText}>
                u/{author_username}{" "}
              </Text>
            </TouchableOpacity>
            <View style={styles.dotSeparator} />
            <Text style={styles.dateText}>{formatDate(createdAt)}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>

      {type === "post" ? (
        <TouchableOpacity style={styles.postContainer}>
          <HTML
            tagsStyles={{
              i: {
                color: colors.textMain,
              },
              p: { color: colors.textMain },
              b: { color: colors.textMain },
            }}
            html={sanitizeContent(content).__html}
          />
        </TouchableOpacity>
      ) : null}
      {type === "image" && link ? (
        <TouchableOpacity style={styles.imagePostContainer}>
          <Image style={styles.imagePost} source={{ uri: link }} />
        </TouchableOpacity>
      ) : null}
      <View style={styles.bottomBarContainer}>
        <Vote
          id={id}
          index={index}
          votes={votes}
          user_vote={user_vote}
          votePost={vote}
          showCount={true}
          child={false}
          reducer={reducer}
        />
      </View>
    </View>
  );
};

export default PostView;
