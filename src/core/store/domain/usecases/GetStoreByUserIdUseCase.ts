import { StoreRepository } from "@/src/core/store/domain/StoreRepository.ts";
import { DataError, Either } from "@/src/core/common/domain/index.ts";
import { Store } from "@/generated/client/deno/edge.ts";

export class GetStoreByUserIdUseCase {
  private storeRepository: StoreRepository;

  constructor(cartRepository: StoreRepository) {
    this.storeRepository = cartRepository;
  }

  execute(userId: string): Promise<Either<DataError, Store>> {
    return this.storeRepository.getByUserId(userId);
  }
}
