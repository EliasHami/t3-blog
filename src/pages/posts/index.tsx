import React from 'react';
import Link from 'next/link';
import { api } from "~/utils/api";
import { type Post } from '@prisma/client';

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 mx-2 my-4">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="mt-2">{post.content}</p>
      </div>
    </Link>
  );
};

const PostList = () => {
  const { data: posts } = api.post.getAll.useQuery();

  return (
    <div className="flex flex-wrap justify-center">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <div className="mx-2 my-4">
        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/posts/add">
          Add Post
        </Link>
      </div>
    </div>
  );
};

export default PostList;