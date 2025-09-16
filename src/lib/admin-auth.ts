
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function getAdminSession() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return null
  }

  // For local development, we'll bypass the database check
  // and grant admin access to a specific user.
  if (session.user.email === "t.t.coop@gmail.com") {
    return {
      ...session,
      user: {
        ...session.user,
        id: "local-admin-id",
        role: "SUPER_ADMIN",
        isActive: true,
      }
    }
  }

  return null
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
  // For local development, we'll just log to the console.
  console.log("Admin Action:", { 
    userId, action, entity, entityId, details, ipAddress, userAgent 
  });
}
