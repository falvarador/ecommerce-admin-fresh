import Clerk from "@clerk/clerk-js";
import { load } from "https://deno.land/std@0.198.0/dotenv/mod.ts";
import { AuthRepository } from "@/src/core/auth/domain/index.ts";
import { DataError, Either } from "@/src/core/common/domain/index.ts";

const env = await load();
const clerkFrontendApi = `pk_${env.CLERK_PUBLISHABLE_KEY}`;
const clerk = new Clerk(clerkFrontendApi);

await clerk.load({
  // Set load options here...
});

export class AuthClerkRepository implements AuthRepository {
  async login(): Promise<void> {
    await clerk.signIn();
  }

  async logout(): Promise<Either<DataError, boolean>> {
    await clerk.signOut({ sessionId: clerk.session.id });
  }
}
