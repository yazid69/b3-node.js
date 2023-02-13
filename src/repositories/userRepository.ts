import { prisma } from "./prisma";
import { PrismaClient } from '@prisma/client';


export function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email
        }
    })
}
export function findUserById(id: string) {
    if (!id) {
        return null
    }
    return prisma.user.findUnique({
        where: {
            id
        }
    })
}

export async function createUser(name: string, email: string) {
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
        return null
    }

    return prisma.user.create({
        data: {
            name,
            email

        }
    })
}

export function updateUser(
    id: string,
    email: string,
    name: string
) {
    return prisma.user.update({
        where: {
            id
        },
        data: {
            email,
            name
        }
    })
}

export function deleteUser(id: string) {
    return prisma.user.delete({
        where: {
            id
        }
    })
}

export function createPost(content: string, userId: string) {
    return prisma.post.create({
        data: {
            content,
            userId,
        },
    });
}


