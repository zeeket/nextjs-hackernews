import { useState, useEffect } from "react";

import { useComment } from "../../../hooks/useComment";
import CommentPreviewItemStory from "./CommentPreviewItemStory";
import CommentPreviewItemContent from "./CommentPreviewItemContent";
import ItemIsDeadOrDeleted from "../../StatusMessage/ItemIsDeadOrDeleted";

const CommentPreviewItem = ({ commentId, userId }) => {
  const [contentId, setContentId] = useState(commentId)
  const { data, isLoading, isError } = useComment(contentId)
  const [parentComment, setParentComment] = useState(null);
  const [parentStory, setParentStory] = useState(null);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    // run indefinitely until parent story has been set
    if (data && !parentStory) {
      // assign comment, parentComment and/or parentStory
      if (!comment) {
        setComment(data);
      } else if (comment && !parentComment && !parentStory && data.id !== comment.id) {
        if (data.type === "comment") {
          setParentComment(data);
        } else {
          setParentStory(data);
        }
      } else if (comment && parentComment && !parentStory && data.id !== parentComment.id) {
        if (data.type !== "comment") {
          setParentStory(data);
        } 
      }
      // refetch data
      setContentId(null);
      setContentId(data.parent);
    }
  }, [contentId, data]);

  return !comment && isLoading ? <IsLoading heading="comment" isLoading={isLoading} isError={isError} /> : (!parentComment || !parentStory) && isLoading ? <IsLoading heading="parent story/comment" isLoading={isLoading} isError={isError} /> : parentStory && (  
    comment.deleted ? <ItemIsDeadOrDeleted type="comment" /> : (
    <div className="grid content-start bg-brandObjectBackground text-sm leading-snug transition-colors dark:bg-brandDarkAppBackground sm:border-brandDefault sm:border-brandBorder sm:rounded sm:shadow-sm sm:hover:cursor-pointer sm:dark:border-brandDarkBorder sm:dark:bg-brandDarkObjectBackground">
      {/* story */}
      <CommentPreviewItemStory
        storyData={parentStory}
        userId={userId}
        commentTime={comment.time}
      />

      {/* desktop border */}
      <div className="hidden mx-2 mb-[-2px] border-t-2 border-t-brandButtonOutline transition-colors dark:border-t-brandDarkBorder sm:block"></div>

      {/* comment and/or parent comment */}
      <CommentPreviewItemContent
        commentData={comment}
        parentData={parentComment}
        storyId={parentStory.id}
      />
    </div>
  ));
}

const IsLoading = ({ heading, isLoading, isError }) => {
  return (
    <div className="grid content-start px-4 py-2 bg-brandObjectBackground dark:bg-brandDarkAppBackground sm:border-brandBorder  sm:rounded sm:shadow-sm sm:dark:border-brandDarkBorder sm:dark:bg-brandDarkObjectBackground">
      {/* debug */}
      { (isLoading || isError) && (
        <span className="justify-self-start rounded mb-1 px-1 py-[0.125rem] bg-brandButtonOutline font-bold text-xs2 text-brandTextSecondary uppercase dark:bg-brandDarkButtonOutline dark:text-brandTextSecondary">
          { isLoading ? "isLoading" : isError && "isError" }
        </span>
      )}
      <p className="font-medium text-sm uppercase text-red-500">Loading { heading }...</p>
    </div>
  );
}
 
export default CommentPreviewItem;