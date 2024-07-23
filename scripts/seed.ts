const {PrismaClient} = require('@prisma/client')

const database = new PrismaClient();

async function main() {
    try{
        await database.category.createMany({
            data: [
                {
                    name: 'Computer Science'
                },
                {
                    name: 'Mathematics'
                },
                {
                    name: 'Physics'
                },
                {
                    name: 'Biology'
                },
                {
                    name: 'Chemistry'
                },
                {
                    name: 'History'
                },
                {
                    name: 'Geography'
                },
                {
                    name: 'Literature'
                },
                {
                    name: 'Music'
                },
                {
                    name: 'Art'
                },
                {
                    name: 'Physical Education'
                }
            ]
        })
        console.log("Database seeded successfully")
    } catch (error) {
        console.log("Error seeding the database", error)
    } finally {
        await database.$disconnect()
    }
}

main();