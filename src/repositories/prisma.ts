import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

prisma.user.createMany({
    data: [{
        email: 'johndoe@test.com' ,
        name: 'John Doe',
    }, {
        email: 'foobar@test.com',
        name: 'Foo Bar',
    }]
}).then (() => {
    console.log('Seeded users')
}, (error) => {
    console.error(error)
})
