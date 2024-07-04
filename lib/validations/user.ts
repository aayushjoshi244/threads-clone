import * as z from 'zod';

export const UserValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(3, { message: "Please Use real name"}).max(30),
    username: z.string().min(3, { message: "No special Character allowed"}).max(30),
    bio: z.string().min(3, { message: "Let people know about you more"}).max(500)
})