import { expo } from "@better-auth/expo";
import { db } from "@rnadventure/db";
import * as schema from "@rnadventure/db/schema/auth";
import { env } from "@rnadventure/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, organization } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",

    schema: schema,
  }),
  trustedOrigins: [env.CORS_ORIGIN, "mybettertapp://", "exp://"],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    expo(),
    admin(),
    organization({
      async sendInvitationEmail(data) {
        // TODO: Implement email sending for tour group invitations
        console.log("Invitation email:", data);
      },
    }),
  ],
});
