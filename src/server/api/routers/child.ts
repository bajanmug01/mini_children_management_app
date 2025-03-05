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

    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                data: z.object({
                    firstName: z.string(),
                    lastName: z.string(),
                    // Expect the client to pass a date string in YYYY-MM-DD format.
                    dateOfBirth: z.string(),
                    gender: z.string(),
                    notes: z.string().nullable().optional(),
                }),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const updatedChild = await ctx.db.child.update({
                where: { id: input.id },
                data: {
                    firstName: input.data.firstName,
                    lastName: input.data.lastName,
                    // Convert the string to a Date.
                    dateOfBirth: new Date(input.data.dateOfBirth),
                    gender: input.data.gender,
                    notes: input.data.notes,
                },
            });
            return updatedChild;
        }),
});


