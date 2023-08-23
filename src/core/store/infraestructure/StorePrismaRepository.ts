import { load } from "https://deno.land/std@0.198.0/dotenv/mod.ts";
import { StoreRepository } from "@/src/core/store/domain/index.ts";
import { DataError, Either } from "@/src/core/common/domain/index.ts";
import { Store } from "@/generated/client/deno/edge.ts";
import { PrismaClient } from "@/generated/client/deno/edge.js";

const env = await load();

export class StorePrismaRepository implements StoreRepository {
  private prisma = new PrismaClient(
    {
      datasources: {
        db: {
          url: env.DATABASE_URL,
        },
      },
    },
  );

  get(userId: string, storeId: string): Promise<Either<DataError, Store>> {
    return new Promise((resolve, _reject) => {
      try {
        const store = this.prisma.store.findUnique({
          where: {
            id: storeId,
            userId,
          },
        });

        resolve(Either.right(store as Store));
      } catch (error) {
        resolve(Either.left({ kind: "UnexpectedError", error } as DataError));
      }
    });
  }

  getByUserId(userId: string): Promise<Either<DataError, Store>> {
    return new Promise((resolve, _reject) => {
      try {
        const store = this.prisma.store.findFirst({
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
    return new Promise((resolve, _reject) => {
      try {
        const store = this.prisma.store.create({
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
