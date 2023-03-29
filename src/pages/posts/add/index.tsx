import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { api } from "~/utils/api";

const NewPostForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { mutate, error } = api.post.save.useMutation();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // You can submit the form data to your server or do whatever you want with it here

    try {
      // Create a new post using the TRPC mutation endpoint
      mutate({ title, content, published: true, authorName: 'John Doe' })
      // Redirect the user to the new post page
      // router.push(`/posts/${newPost?.id}`);
    } catch (error) {
      console.error(error);
    }


    console.log('Title:', title);
    console.log('Content:', content);
    setTitle('');
    setContent('');
  };

  return (
    <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Enter the title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
          Content
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="content"
          placeholder="Enter the content"
          value={content}
          onChange={handleContentChange}
        ></textarea>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewPostForm;
