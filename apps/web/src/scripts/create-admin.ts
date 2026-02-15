import { auth } from "@rnadventure/auth";
import { db } from "@rnadventure/db";
import { user } from "@rnadventure/db/schema";
import { eq } from "drizzle-orm";

/**
 * Script to create an admin user
 * Run with: bun run create-admin
 */

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@rnadventure.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const name = process.env.ADMIN_NAME || "Admin";

  console.log("🔧 Creating admin user...");
  console.log(`Email: ${email}`);
  console.log(`Name: ${name}`);

  try {
    // Step 1: Create user with signUpEmail (without role)
    const newUser = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    if (newUser.error) {
      console.error("❌ Error:", newUser.error.message);

      // If user exists, try to update role
      if (newUser.error.message.includes("already exists")) {
        console.log("⚠️  User already exists. Updating role to admin...");

        // Find user and update role
        const existingUser = await db.query.user.findFirst({
          where: eq(user.email, email),
        });

        if (existingUser) {
          await db.update(user).set({ role: "admin" }).where(eq(user.id, existingUser.id));

          console.log("✅ User role updated to admin!");
        }
      }

      if (!newUser.error.message.includes("already exists")) {
        process.exit(1);
      }
    } else {
      // Step 2: Update the user's role to admin in the database
      if (newUser.data?.user?.id) {
        await db.update(user).set({ role: "admin" }).where(eq(user.id, newUser.data.user.id));

        console.log("✅ Admin user created successfully!");
      }
    }

    console.log("\nLogin credentials:");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log("\nYou can now login at: http://localhost:3001/admin/login");
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  }

  process.exit(0);
}

createAdmin();
