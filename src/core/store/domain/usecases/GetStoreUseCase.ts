import { StoreRepository } from "@/src/core/store/domain/index.ts";
import { DataError, Either } from "@/src/core/common/domain/index.ts";
import { Store } from "@/generated/client/deno/edge.ts";

export class GetStoreUseCase {
  private storeRepository: StoreRepository;

  constructor(cartRepository: StoreRepository) {
    this.storeRepository = cartRepository;
  }

  execute(userId: string, storeId: string): Promise<Either<DataError, Store>> {
    return this.storeRepository.get(userId, storeId);
  }
}
