import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? ''
    })
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account?.access_token) {
        token.name = account?.access_token
      }

      return token
    }
  }
}
export default NextAuth(authOptions)
