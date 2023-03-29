import { useRouter } from 'next/router';

import { type GetStaticProps, type GetStaticPaths, type NextPage } from 'next';
import { prisma } from '~/server/db';

const PostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.post.getById.useQuery({ id });

  if (!data) return <div>Not Found</div>

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-700 text-lg mb-4">{data.content}</p>
      <p className="text-gray-600 font-bold mb-2">Author: {data.authorName}</p>
    </div>
  );
};

import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '~/server/api/root';
import superjson from 'superjson';
import { api } from '~/utils/api';

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson
  })
  const id = context.params?.id;
  if (typeof id !== "string") throw Error("No id");

  const newId = id.replace("@", "");

  await ssg.post.getById.prefetch({ id: newId })
  return { props: { trpcState: ssg.dehydrate(), id: newId }, revalidate: 60 };
};

export default PostPage;

