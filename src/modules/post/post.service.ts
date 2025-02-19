import type { CreatePostDTO, GetPostDTO } from './post.validator';

class PostService {
  async createPost(post: CreatePostDTO): Promise<GetPostDTO> {
    const createdPost = { ...post, id: '1' };
    return createdPost;
  }

  async getPost(id: string): Promise<GetPostDTO> {
    return { id, title: 'Test', content: 'Test' };
  }
}

export default new PostService();
