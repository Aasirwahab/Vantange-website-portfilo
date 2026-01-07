const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const email = "nawrifwahab342@gmail.com";

    await prisma.admin.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: "Super Admin",
            role: "superadmin"
        }
    });

    console.log(`✅ Admin seeded: ${email}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
