import CommentItem from "./CommentItem";
import classes from "./CommentsList.module.css";

const CommentsList = (props) => {
  const content = props.comments.map((comment) => (
    <CommentItem key={comment.id} text={comment.text} />
  ));

  return <ul className={classes.comments}>{content}</ul>;
};

export default CommentsList;
