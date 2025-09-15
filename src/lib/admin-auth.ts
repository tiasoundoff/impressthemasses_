
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getAdminSession() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
    return null
  }

  return {
    ...session,
    user: {
      ...session.user,
      id: user.id,
      role: user.role,
      isActive: user.isActive,
    }
  }
}

export async function requireAdmin() {
  const session = await getAdminSession()
  
  if (!session) {
    throw new Error('Admin access required')
  }

  return session
}

export async function logAdminAction(
  userId: string, 
  action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE', 
  entity: string, 
  entityId?: string, 
  details?: string,
  ipAddress?: string,
  userAgent?: string
) {
  await prisma.adminLog.create({
    data: {
      userId,
      action,
      entity,
      entityId,
      details,
      ipAddress,
      userAgent,
    }
  })
}
