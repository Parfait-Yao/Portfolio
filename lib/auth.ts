import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL || "parfaitericyao123@gmail.com"
        const adminPassword = process.env.ADMIN_PASSWORD || "Eric2003***"

        if (
          credentials?.email === adminEmail && 
          credentials?.password === adminPassword
        ) {
          return { 
            id: "admin-1", 
            email: adminEmail, 
            name: "Admin" 
          }
        }

        return null
      }
    })
  ],
  pages: { signIn: '/admin/login' },
  session: { strategy: "jwt" },
})
