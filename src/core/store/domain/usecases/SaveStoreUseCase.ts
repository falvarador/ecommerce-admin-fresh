import { StoreRepository } from "@/src/core/store/domain/index.ts";
import { DataError, Either } from "@/src/core/common/domain/index.ts";
import { Store } from "@/generated/client/deno/edge.ts";

export class SaveStoreUseCase {
  private storeRepository: StoreRepository;

  constructor(cartRepository: StoreRepository) {
    this.storeRepository = cartRepository;
  }

  execute(userId: string, name: string): Promise<Either<DataError, Store>> {
    return this.storeRepository.save(userId, name);
  }
}
