import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function runSeed() {
  console.log('Seeding profiles and permissions...');


  const modTickets = await prisma.module.upsert({ where: { code: 'TICKETS_MOD' }, update: {}, create: { name: 'Tickets', code: 'TICKETS_MOD' } });
  const modUsers = await prisma.module.upsert({ where: { code: 'USERS_MOD' }, update: {}, create: { name: 'Users', code: 'USERS_MOD' } });
  const modAdmin = await prisma.module.upsert({ where: { code: 'ADMIN_MOD' }, update: {}, create: { name: 'Admin', code: 'ADMIN_MOD' } });


  const optionsDef = [
    { code: 'VIEW_TICKETS', module: modTickets.id },
    { code: 'CREATE_TICKETS', module: modTickets.id },
    { code: 'EDIT_TICKETS', module: modTickets.id },

    { code: 'VIEW_USERS', module: modUsers.id },
    { code: 'CREATE_USERS', module: modUsers.id },
    { code: 'EDIT_USERS', module: modUsers.id },
    { code: 'DELETE_USERS', module: modUsers.id },

    { code: 'VIEW_PROFILES', module: modAdmin.id },
    { code: 'CREATE_PROFILES', module: modAdmin.id },
    { code: 'EDIT_PROFILES', module: modAdmin.id },
    { code: 'DELETE_PROFILES', module: modAdmin.id },

    { code: 'VIEW_OPTIONS', module: modAdmin.id },
    { code: 'CREATE_OPTIONS', module: modAdmin.id },
    { code: 'EDIT_OPTIONS', module: modAdmin.id },
    { code: 'DELETE_OPTIONS', module: modAdmin.id },

    { code: 'VIEW_MODULES', module: modAdmin.id },
    { code: 'CREATE_MODULES', module: modAdmin.id },
    { code: 'EDIT_MODULES', module: modAdmin.id },
    { code: 'DELETE_MODULES', module: modAdmin.id }
  ];

  for (const opt of optionsDef) {
    await prisma.option.upsert({
      where: { code: opt.code },
      update: {},
      create: { name: opt.code, code: opt.code, moduleId: opt.module }
    });
  }


  const adminProfile = await prisma.profile.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN', description: 'Administrador del sistema' }
  });

  const soporteProfile = await prisma.profile.upsert({
    where: { name: 'SOPORTE' },
    update: {},
    create: { name: 'SOPORTE', description: 'Personal de soporte técnico' }
  });

  const clienteProfile = await prisma.profile.upsert({
    where: { name: 'CLIENTE' },
    update: {},
    create: { name: 'CLIENTE', description: 'Cliente que reporta tickets' }
  });

  const allOptions = await prisma.option.findMany();
  for (const opt of allOptions) {
    await prisma.profileOption.upsert({
      where: { profileId_optionId: { profileId: adminProfile.id, optionId: opt.id } },
      update: {},
      create: { profileId: adminProfile.id, optionId: opt.id }
    });
  }

  const soporteOptions = allOptions.filter(o => ['VIEW_TICKETS', 'EDIT_TICKETS', 'VIEW_USERS'].includes(o.code));
  for (const opt of soporteOptions) {
    await prisma.profileOption.upsert({
      where: { profileId_optionId: { profileId: soporteProfile.id, optionId: opt.id } },
      update: {},
      create: { profileId: soporteProfile.id, optionId: opt.id }
    });
  }

  const clienteOptions = allOptions.filter(o => ['VIEW_TICKETS', 'CREATE_TICKETS'].includes(o.code));
  for (const opt of clienteOptions) {
    await prisma.profileOption.upsert({
      where: { profileId_optionId: { profileId: clienteProfile.id, optionId: opt.id } },
      update: {},
      create: { profileId: clienteProfile.id, optionId: opt.id }
    });
  }

  const userProfile = await prisma.profile.findUnique({ where: { name: 'USER' } });
  if (userProfile) {
    for (const opt of clienteOptions) {
      await prisma.profileOption.upsert({
        where: { profileId_optionId: { profileId: userProfile.id, optionId: opt.id } },
        update: {},
        create: { profileId: userProfile.id, optionId: opt.id }
      });
    }
  }

  const adminEmail = 'admin@viamatica.com';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        profileId: adminProfile.id,
        isActive: true
      }
    });
    console.log(`Default admin created: ${adminEmail} / admin123`);
  }

  console.log('Seed completed successfully. Profiles ADMIN, SOPORTE, CLIENTE are ready.');
}

if (require.main === module) {
  runSeed()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
}
