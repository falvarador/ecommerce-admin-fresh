import { Store } from "@/generated/client/deno/edge.ts";

export interface CommonStoreState {
  open: boolean;
}

export interface LoadingStoreState {
  kind: "LoadingStoreState";
}

export interface LoadedStoreState {
  kind: "LoadedStoreState";
  store: Store;
}

export interface ErrorStoreState {
  kind: "ErrorStoreState";
  error: string;
}

export type StoreState =
  & (
    | LoadingStoreState
    | LoadedStoreState
    | ErrorStoreState
  )
  & CommonStoreState;

export const storeInitialState: StoreState = {
  kind: "LoadingStoreState",
  open: false,
};
