import { DataError, Either } from "@/src/core/common/domain/index.ts";

export interface AuthRepository {
  login(): Promise<Either<DataError, boolean>>;
  logout(): Promise<Either<DataError, boolean>>;
}
