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

    // Check if user was created successfully
    if ("user" in newUser && newUser.user?.id) {
      // Step 2: Update the user's role to admin in the database
      await db.update(user).set({ role: "admin" }).where(eq(user.id, newUser.user.id));

      console.log("✅ Admin user created successfully!");
    }

    console.log("\nLogin credentials:");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log("\nYou can now login at: http://localhost:3001/admin/login");
  } catch (error: any) {
    console.error("❌ Error creating admin user:", error);

    // If user exists, try to update role
    if (error?.message?.includes("already exists") || error?.message?.includes("unique")) {
      console.log("⚠️  User already exists. Updating role to admin...");

      // Find user and update role
      const existingUser = await db.query.user.findFirst({
        where: eq(user.email, email),
      });

      if (existingUser) {
        await db.update(user).set({ role: "admin" }).where(eq(user.id, existingUser.id));

        console.log("✅ User role updated to admin!");
        console.log("\nLogin credentials:");
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log("\nYou can now login at: http://localhost:3001/admin/login");
        process.exit(0);
      }
    }

    process.exit(1);
  }

  process.exit(0);
}

createAdmin();
