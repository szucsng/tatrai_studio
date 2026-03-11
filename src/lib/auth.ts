import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "@/lib/prisma"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql"
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  secret: process.env.BETTER_AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXTAUTH_URL || "http://localhost:3000",
  session: {
    updateAge: 60 * 60,
    expiresIn: 60 * 60 * 24 * 7,
  },
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || process.env.NEXTAUTH_URL || "http://localhost:3000",
    "http://localhost:3000",
    "http://localhost:3001"
  ],
  // Advanced: hibakezelés MySQL 1020 error esetén
  advanced: {
    // Disableli az automatic session touch-ot minden requestnél
    disableCSRFCheck: false,
  },
})

export type Session = typeof auth.$Infer.Session

