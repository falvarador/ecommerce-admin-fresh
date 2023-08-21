import { load } from "https://deno.land/std@0.198.0/dotenv/mod.ts";
import { StoreRepository } from "@/src/core/store/domain/index.ts";
import { DataError, Either } from "@/src/core/common/domain/index.ts";
import { Store } from "@/generated/client/deno/edge.ts";
import { PrismaClient } from "@/generated/client/deno/edge.js";

export class StorePrismaRepository implements StoreRepository {
  private const prismadb: PrismaClient;
  
  constructor() {
    const envVars = await load();

    prismadb = new PrismaClient({
      datasources: {
        db: {
          url: envVars.DATABASE_URL,
        },
      },
    });
  }

  get(userId: string, storeId: string): Promise<Either<DataError, Store>> {
    return new Promise((resolve, _reject) => {
      setTimeout(async () => {
        try {
          const store = await this.prismadb.store.findUnique({
            where: {
              id: storeId,
              userId,
            },
          });

          resolve(Either.right(store as Store));
        } catch (error) {
          resolve(Either.left({ kind: "UnexpectedError", error } as DataError));
        }
      }, 100);
    });
  }

  getByUserId(userId: string): Promise<Either<DataError, Store>> {
    return new Promise(async (resolve, _reject) => {
      try {
        const store = await prismadb.store.findFirst({
          where: {
            userId,
          },
        });

        resolve(Either.right(store as Store));
      } catch (error) {
        resolve(Either.left({ kind: "UnexpectedError", error } as DataError));
      }
    });
  }

  save(userId: string, name: string): Promise<Either<DataError, Store>> {
    return new Promise(async (resolve, _reject) => {
      try {
        const store = await prismadb.store.create({
          data: {
            name,
            userId,
          },
        });

        resolve(Either.right(store));
      } catch (error) {
        resolve(Either.left({ kind: "UnexpectedError", error } as DataError));
      }
    });
  }
}
