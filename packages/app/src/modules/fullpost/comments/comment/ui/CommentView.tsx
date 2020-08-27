import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Comment } from "@reddit-clone/controller/dist/modules/Redux/reducers/post";
import { postStyles, separatorStyles } from "../../../../../styles";
import { useTheme } from "@react-navigation/native";
import { ThemeColors } from "../../../../../themes/themes";
import HTML from "react-native-render-html";
import Vote from "../../../../post/vote/Vote";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  commentInfo: Comment;
  index: number;
  depth: number;
  sanitizeContent: (content: string[]) => { __html: string };
  formatDate: (date: string) => string;
  vote: (path: string[], voteValue: number) => void;
  comment: (postId: string, content: string[]) => void;
  child: boolean;
}

const CommentView = (props: Props) => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const {
    commentInfo,
    index,
    sanitizeContent,
    formatDate,
    vote,
    comment,
    child,
    depth,
  } = props;
  const {
    path,
    id,
    author_username,
    content,
    updatedAt,
    voteValue,
    user_vote,
    replies,
  } = commentInfo;

  const [showComment, setShowComment] = useState(true);

  useEffect(() => {
    if (voteValue < 0) {
      setShowComment(false);
    }

    if (index > 3 && depth > 5) {
      setShowComment(false);
    }
  }, [depth, index, voteValue]);

  const styles = StyleSheet.create({
    mainContainer: {},
    mainContainerChild: {
      borderLeftWidth: 1,
      borderLeftColor: colors.colorLine,
      paddingLeft: 10,
      paddingTop: 10,
    },
    headerContainer: {
      flexDirection: "row",
      flexWrap: "nowrap",
      alignItems: "center",
    },
    profilePicContainer: {
      marginRight: 10,
    },
    profilePic: {
      height: 15,
      width: 15,
      borderRadius: 100,
      backgroundColor: "skyblue",
    },
    username: {
      color: colors.textMain,
      fontWeight: "bold",
    },
    dotSeparator: {
      ...separatorStyles.dotSeparator,
      backgroundColor: colors.textMuted,
    },
    createdAt: {
      color: colors.textMuted,
    },
    contentContainer: {},
    contentText: {
      color: colors.textMain,
    },

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
    repliesContainer: {
      flexDirection: "column",
      paddingLeft: 10,
    },
    hiddenCommentPreviewContainer: {
      lineHeight: 20,
      maxHeight: 20,
    },
  });

  const handleLongPress = () => {
    setShowComment(!showComment);
  };

  const handleHiddenCommentPress = () => {
    setShowComment(true);
  };

  return (
    <React.Fragment>
      {showComment ? (
        <TouchableOpacity
          style={child ? styles.mainContainerChild : styles.mainContainer}
          activeOpacity={1}
          onLongPress={handleLongPress}
        >
          <View style={styles.headerContainer}>
            <View style={styles.profilePicContainer}>
              <View style={styles.profilePic} />
            </View>
            <Text style={styles.username}>{author_username}</Text>
            <View style={styles.dotSeparator} />
            <Text style={styles.createdAt}> {formatDate(updatedAt)}</Text>
          </View>
          <View style={styles.contentContainer}>
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
          </View>
          <View style={styles.bottomBarContainer}>
            <View style={styles.voteContainer}>
              <Vote
                path={path}
                index={index}
                votes={voteValue}
                user_vote={user_vote}
                voteComment={vote}
                showCount={false}
                child={child}
              />
            </View>
            <TouchableOpacity style={styles.commentCountContainer}>
              <Icon name="comment" style={styles.commentCountIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bookmarkContainer}>
              <Icon name="bookmark" style={styles.bookmarIcon} />
              <Text style={styles.bottomBarText}>Save</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.repliesContainer}>
            {replies.map((reply, index) => {
              if (reply) {
                return (
                  <CommentView
                    key={index}
                    comment={comment}
                    vote={vote}
                    formatDate={formatDate}
                    sanitizeContent={sanitizeContent}
                    index={index}
                    commentInfo={reply}
                    child={true}
                    depth={depth + 1}
                  />
                );
              }
            })}
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleHiddenCommentPress}
          onLongPress={handleHiddenCommentPress}
          style={child ? styles.mainContainerChild : styles.mainContainer}
          activeOpacity={1}
        >
          <View style={styles.headerContainer}>
            <View style={styles.profilePicContainer}>
              <View style={styles.profilePic} />
            </View>
            <Text style={styles.username}>{author_username}</Text>
            <View style={styles.dotSeparator} />
            <Text style={styles.createdAt}> {formatDate(updatedAt)}</Text>
            <View style={styles.dotSeparator} />
            <View style={styles.hiddenCommentPreviewContainer}>
              <HTML
                tagsStyles={{
                  i: {
                    color: colors.textMuted,
                  },
                  p: { color: colors.textMuted },
                  b: { color: colors.textMuted },
                }}
                html={sanitizeContent(content).__html}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </React.Fragment>
  );
};

export default CommentView;
