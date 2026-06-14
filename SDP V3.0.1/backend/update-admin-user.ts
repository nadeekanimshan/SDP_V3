import { PrismaClient } from './config/database/prisma/generated/prisma/client';
// @ts-ignore
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function updateAdminUser() {
  try {
    console.log('🔄 Starting admin user update...\n');

    // Step 1: Find John Doe
    const johnDoe = await prisma.user.findUnique({
      where: { email: 'john@gmail.com' }
    });

    if (johnDoe) {
      // Update John Doe to Chathura Herath
      const hashedPassword = await bcrypt.hash('admin1234', 10);
      
      const updatedUser = await prisma.user.update({
        where: { email: 'john@gmail.com' },
        data: {
          email: 'chathura.herath@gmail.com',
          firstName: 'Chathura',
          lastName: 'Herath',
          password: hashedPassword,
          contactNumber: '0771234567',
          district: 'Western'
        }
      });

      console.log('✅ Updated John Doe to Chathura Herath');
      console.log('📧 New Email:', updatedUser.email);
      console.log('👤 New Name:', updatedUser.firstName, updatedUser.lastName);
      console.log('🔑 Password: admin1234');
      console.log('\n✨ Admin user update completed successfully!');
    } else {
      console.log('ℹ️  John Doe not found, checking for existing Chathura Herath...');
      
      // Check if Chathura Herath already exists
      const existingChathura = await prisma.user.findUnique({
        where: { email: 'chathura.herath@gmail.com' }
      });

      if (existingChathura) {
        console.log('✅ Chathura Herath already exists');
        console.log('📧 Email:', existingChathura.email);
        console.log('👤 Name:', existingChathura.firstName, existingChathura.lastName);
      } else {
        // Create new admin user
        const adminType = await prisma.userType.findFirst({
          where: { name: 'ADMIN' }
        });

        if (!adminType) {
          console.error('❌ ADMIN user type not found!');
          return;
        }

        const hashedPassword = await bcrypt.hash('admin1234', 10);
        
        const chathuraHerath = await prisma.user.create({
          data: {
            email: 'chathura.herath@gmail.com',
            firstName: 'Chathura',
            lastName: 'Herath',
            password: hashedPassword,
            typeId: adminType.id,
            contactNumber: '0771234567',
            address: 'Colombo',
            city: 'Colombo',
            district: 'Western',
            deleteStatus: false
          }
        });

        console.log('✅ Created Chathura Herath as admin');
        console.log('📧 Email:', chathuraHerath.email);
        console.log('👤 Name:', chathuraHerath.firstName, chathuraHerath.lastName);
        console.log('🔑 Password: admin1234');
      }
      console.log('\n✨ Admin user update completed successfully!');
    }
  } catch (error) {
    console.error('❌ Error updating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminUser();
