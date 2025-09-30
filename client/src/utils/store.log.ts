import { type StateCreator, type StoreMutatorIdentifier } from "zustand";

type Logger = <
  T,
  Mps extends Array<[StoreMutatorIdentifier, unknown]> = [],
  Mcs extends Array<[StoreMutatorIdentifier, unknown]> = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f) => (set, get, store) => {
  const loggedSet = ((...args: Parameters<typeof set>) => {
    set(...args);
  }) as typeof set;
  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as Logger;
