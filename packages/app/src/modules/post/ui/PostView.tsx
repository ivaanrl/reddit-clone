import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Vote from "../vote/Vote";
import HTML from "react-native-render-html";
import { ThemeColors } from "../../../themes/themes";
import { useTheme, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { postStyles, fontSizes } from "../../../styles";

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
  const navigation = useNavigation();
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

  const handleSubredditNameClick = () => {
    navigation.navigate("subreddit", { name: subreddit_name });
  };

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
      ...fontSizes.postTitleFont,
      ...postStyles.title,
      color: colors.textMain,
    },
    postContainer: { paddingLeft: 5 },
    postContent: { color: colors.textMain },
    imagePostContainer: {},
    imagePost: {
      aspectRatio: 16 / 9,
    },
    bottomBarContainer: {
      ...postStyles.bottomBarMainContainer,
    },
    voteContainer: {},
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
  });

  const handlePostPress = () => {
    navigation.navigate("fullpost", { id });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        {showSubredditName ? (
          <TouchableOpacity style={styles.subredditIcon}></TouchableOpacity>
        ) : null}
        <View style={styles.headerTextContainer}>
          {showSubredditName ? (
            <TouchableOpacity
              style={styles.subredditNameContainer}
              onPress={handleSubredditNameClick}
            >
              <Text style={styles.subredditName}>{subreddit_name}</Text>
            </TouchableOpacity>
          ) : null}
          <View style={styles.postCreatedByInfo}>
            {showSubredditName ? (
              <Text style={styles.postedBy}>Posted by </Text>
            ) : null}
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
        <TouchableOpacity
          style={styles.postContainer}
          onPress={handlePostPress}
        >
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
        <View style={styles.voteContainer}>
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
        <TouchableOpacity style={styles.commentCountContainer}>
          <Icon name="comment" style={styles.commentCountIcon} />
          <Text style={styles.bottomBarText}>{comment_count}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookmarkContainer}>
          <Icon name="bookmark" style={styles.bookmarIcon} />
          <Text style={styles.bottomBarText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostView;
