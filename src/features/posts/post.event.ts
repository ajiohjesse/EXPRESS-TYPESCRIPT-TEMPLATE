import { createChannel } from "better-sse";
import type { PostDTO } from "./post.validator";

export const postEventChannel = createChannel();

export const broadcastNewPost = (post: PostDTO) => {
  postEventChannel.broadcast(post, "new-post");
};
