import type { DataError, Either } from "~/core/common/domain";
import { Bloc } from "~/core/common/presentation";
import { storeInitialState, type StoreState } from "~/core/store/presentation";
import type {
  GetStoreByUserIdUseCase,
  GetStoreUseCase,
  SaveStoreUseCase,
} from "~/core/store/domain/usecases/";
import type { Store } from "@prisma/client";

export class StoreBloc extends Bloc<StoreState> {
  constructor(
    private getStoreByUserIdUseCase: GetStoreByUserIdUseCase,
    private getStoreUseCase: GetStoreUseCase,
    private saveStoreUseCase: SaveStoreUseCase
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
      (store) => store
    );
  }

  async loadStoreByUserId(userId: string): Promise<Either<DataError, Store>> {
    const result = await this.getStoreByUserIdUseCase.execute(userId);

    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (store) => store
    );

    return result;
  }

  async loadStore(
    userId: string,
    storeId: string
  ): Promise<Either<DataError, Store>> {
    const result = await this.getStoreUseCase.execute(userId, storeId);

    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (store) => store
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
