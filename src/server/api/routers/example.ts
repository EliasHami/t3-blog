import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
  save: publicProcedure
    .input(z.object({ title: z.string(), content: z.string(), published: z.boolean(), authorName: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({
          data: {
            title: input.title,
            content: input.content,
            published: input.published,
            authorName: input.authorName,
          }
        });
    }),
  getById: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.post.findUnique({
      where: {
        id: input.id,
      },
    });
  }),
});