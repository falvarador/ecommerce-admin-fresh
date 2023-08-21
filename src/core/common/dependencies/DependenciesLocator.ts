function storeBlocProvider(): StoreBloc {
  const storeRepository = new StorePrismaRepository();
  const getStoreByUserIdUseCase = new GetStoreByUserIdUseCase(storeRepository);
  const getStoreUseCase = new GetStoreUseCase(storeRepository);
  const saveStoreUseCase = new SaveStoreUseCase(storeRepository);

  const storeBloc = new StoreBloc(
    getStoreByUserIdUseCase,
    getStoreUseCase,
    saveStoreUseCase,
  );

  return storeBloc;
}

export const dependenciesLocator = {
  storeBlocProvider,
};
