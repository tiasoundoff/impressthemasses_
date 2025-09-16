
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Creating admin user...')

  const adminEmail = 't.t.coop@gmail.com'

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  })

  if (existingAdmin) {
    console.log('Admin user already exists:', adminEmail)
    
    // Update existing user to have admin role
    const updatedAdmin = await prisma.user.update({
      where: { email: adminEmail },
      data: {
        role: 'SUPER_ADMIN',
        isActive: true
      }
    })
    
    console.log('Updated existing user to Super Admin:', updatedAdmin.email)
    return
  }

  // Create new admin user
  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      name: 'Admin User',
      firstName: 'Admin',
      lastName: 'User',
      role: 'SUPER_ADMIN',
      isActive: true,
    }
  })

  console.log('Admin user created successfully!')
  console.log('Email:', admin.email)
  console.log('Role:', admin.role)
  console.log('\nIMPORTANT: To login as admin, you need to set up NextAuth properly.')
  console.log('The admin user has been created but you\'ll need to handle authentication.')
}

main()
  .catch((e) => {
    console.error('Error creating admin user:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
