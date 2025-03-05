import { createTRPCRouter, publicProcedure } from "LA/server/api/trpc";
import { z } from "zod";

export const guardianRouter = createTRPCRouter({
    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                data: z.object({
                    firstName: z.string(),
                    middleName: z.string().nullable().optional(),
                    lastName: z.string(),
                    email: z.string().email(),
                    phone: z.string().nullable().optional(),
                    street: z.string(),
                    city: z.string(),
                    zipCode: z.string(),
                    country: z.string(),
                }),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const updatedGuardian = await ctx.db.childGuardian.update({
                where: { id: input.id },
                data: {
                    firstName: input.data.firstName,
                    middleName: input.data.middleName,
                    lastName: input.data.lastName,
                    email: input.data.email,
                    phone: input.data.phone,
                    street: input.data.street,
                    city: input.data.city,
                    zipCode: input.data.zipCode,
                    country: input.data.country,
                },
            });
            return updatedGuardian;
        }),
});
