import { Store } from "@/generated/client/deno/edge.ts";
import {
  storeInitialState,
  StoreState,
} from "@/src/core/store/presentation/index.ts";
import { Bloc } from "@/src/core/common/presentation/index.ts";
import {
  GetStoreByUserIdUseCase,
  GetStoreUseCase,
  SaveStoreUseCase,
} from "@/src/core/store/domain/usecases/index.ts";
import { DataError, Either } from "@/src/core/common/domain/index.ts";

export class StoreBloc extends Bloc<StoreState> {
  constructor(
    private getStoreByUserIdUseCase: GetStoreByUserIdUseCase,
    private getStoreUseCase: GetStoreUseCase,
    private saveStoreUseCase: SaveStoreUseCase,
  ) {
    super(storeInitialState);
  }

  closeModalStore() {
    this.changeState({ ...this.state, open: false });
  }

  openModalStore() {
    this.changeState({ ...this.state, open: true });
  }

  async saveStore(userId: string, name: string) {
    const result = await this.saveStoreUseCase.execute(userId, name);

    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (store) => store,
    );
  }

  async loadStoreByUserId(userId: string): Promise<Either<DataError, Store>> {
    const result = await this.getStoreByUserIdUseCase.execute(userId);

    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (store) => store,
    );

    return result;
  }

  async loadStore(
    userId: string,
    storeId: string,
  ): Promise<Either<DataError, Store>> {
    const result = await this.getStoreUseCase.execute(userId, storeId);

    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (store) => store,
    );

    return result;
  }

  private handleError(error: DataError): StoreState {
    switch (error.kind) {
      case "UnexpectedError": {
        return {
          open: this.state.open,
          kind: "ErrorStoreState",
          error: "Sorry, an error has ocurred. Please try later again",
        };
      }
    }
  }
}
