import { createTRPCRouter, publicProcedure } from "LA/server/api/trpc";
import { z } from "zod";

export const childRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const children = await ctx.db.child.findMany({
            take: 100,
            orderBy: [{ createdAt: "desc" }],
        });
        return children;
    }),
    getById: publicProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            const child = await ctx.db.child.findUnique({
                where: { id: input },
                include: { guardians: true },
            });
            if (!child) {
                throw new Error("Child not found");
            }
            return { ...child, dateOfBirth: child.dateOfBirth.toISOString() };
        }),
});
