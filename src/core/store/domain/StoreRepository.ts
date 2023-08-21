import { DataError, Either } from "@/src/core/common/domain/index.ts";
import { Store } from "@/generated/client/deno/edge.ts";

export interface StoreRepository {
  get(userId: string, storeId: string): Promise<Either<DataError, Store>>;
  getByUserId(userId: string): Promise<Either<DataError, Store>>;
  save(userId: string, name: string): Promise<Either<DataError, Store>>;
}
