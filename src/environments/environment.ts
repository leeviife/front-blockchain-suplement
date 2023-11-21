import { localEnvironment } from './environment.local';

export const environment = {
  production: true,
  web3: {
    contracts: {
      supplementTracker: localEnvironment.supplementTracker,
    },
    account: {
      privateKey: localEnvironment.privateKey,
    },
  },
};
