import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { separatorStyles } from "../../../../../../styles";
import { useTheme } from "@react-navigation/native";
import { ThemeColors } from "../../../../../../themes/themes";
import HTML from "react-native-render-html";

interface Props {
  commentId: string;
  commentAuthorId: string;
  commentAuthorUsername: string;
  commentContent: string[];
  commentCreatedAt: string;
  commentVoteValue: number;
  postId: string;
  postSubredditName: string;
  postAuthorUsername: string;
  postTitle: string;
  formatDate: (date: string) => string;
  sanitizeContent: (content: string[]) => { __html: string };
  comment: (commentId: string, content: string[]) => void;
}

const ProfileCommentView = (props: Props) => {
  const {
    commentId,
    commentAuthorId,
    commentAuthorUsername,
    commentContent,
    commentVoteValue,
    commentCreatedAt,
    postId,
    postTitle,
    postAuthorUsername,
    postSubredditName,
    formatDate,
    sanitizeContent,
    comment,
  } = props;
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;

  const styles = StyleSheet.create({
    mainContainer: {
      flexDirection: "column",
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.colorLine,
      backgroundColor: colors.card,
    },
    titleText: {
      color: colors.textMain,
    },
    subtitleContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    subtitleText: {
      color: colors.textMuted,
    },
    dotSeparator: {
      ...separatorStyles.dotSeparator,
      backgroundColor: colors.textMuted,
      marginRight: 7,
      marginLeft: 7,
    },
    contentContainer: {},
    contentText: {},
  });

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>{postTitle}</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitleText}>r/{postSubredditName}</Text>
        <View style={styles.dotSeparator} />
        <Text style={styles.subtitleText}>{formatDate(commentCreatedAt)}</Text>
        <View style={styles.dotSeparator} />
        <Text style={styles.subtitleText}>{commentVoteValue}</Text>
      </View>
      <View style={styles.contentContainer}>
        <HTML
          tagsStyles={{
            i: {
              color: colors.textMuted,
            },
            p: { color: colors.textMuted },
            b: { color: colors.textMuted },
          }}
          html={sanitizeContent(commentContent).__html}
        />
      </View>
    </View>
  );
};

export default ProfileCommentView;
