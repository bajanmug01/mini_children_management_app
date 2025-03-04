import { createTRPCRouter, publicProcedure } from "LA/server/api/trpc";

export const childRouter = createTRPCRouter({

    getAll: publicProcedure.query(async ({ ctx }) => {
        const children = await ctx.db.child.findMany({ take: 100, orderBy: [{ createdAt: "desc" }] });
        return children;
    }),
});