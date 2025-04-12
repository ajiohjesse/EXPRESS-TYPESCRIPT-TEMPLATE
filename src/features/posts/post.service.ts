import db from "@/database";
import { postTable } from "@/database/db-schemas";
import { ilike } from "drizzle-orm";
import type { CreatePostDTO, PostDTO, PostQueryDTO } from "./post.validator";

class PostService {
  async createPost(post: CreatePostDTO): Promise<PostDTO> {
    const [createdPost] = await db.insert(postTable).values(post).returning();
    return createdPost;
  }

  async getPost(id: number): Promise<PostDTO | undefined> {
    const post = await db.query.postTable.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, id);
      },
    });
    return post;
  }

  async getAllPosts(
    query: PostQueryDTO
  ): Promise<{ posts: PostDTO[]; totalPosts: number }> {
    const { search, limit, page } = query;
    const posts = await db
      .select()
      .from(postTable)
      .where(search ? ilike(postTable.title, `%${search}%`) : undefined)
      .limit(limit)
      .offset((page - 1) * limit);

    const totalPosts = await db.$count(
      postTable,
      search ? ilike(postTable.title, `%${search}%`) : undefined
    );

    return {
      posts,
      totalPosts,
    };
  }
}

export default new PostService();
