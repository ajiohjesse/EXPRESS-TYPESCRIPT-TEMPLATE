import { createChannel } from 'better-sse';
import type { GetPostDTO } from './post.validator';

export const postEventChannel = createChannel();

export const broadcastNewPost = (post: GetPostDTO) => {
  postEventChannel.broadcast(post, 'new-post');
};
