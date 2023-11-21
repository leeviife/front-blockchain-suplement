import { Web3 } from 'web3';
import { abi } from './abi';
import { environment } from 'src/environments/environment';
import {
  Signature,
  SupplementInfo,
  SupplementInfoWithSignature,
} from '../home/home.component';

const getWeb3Instance = (): Web3 | null => {
  if (window.ethereum) {
    window.ethereum.enable();
    return new Web3(window.ethereum);
  }
  return null;
};

export const getAccountAddress = async () => {
  const web3 = getWeb3Instance();

  if (!web3) return null;

  const accounts = await web3.eth.getAccounts();

  return accounts[0];
};

const getSupplementMessage = (supplement: SupplementInfo) => {
  return `${supplement.name} ${supplement.manufacturer} ${supplement.proteins} ${supplement.carbs} ${supplement.fats} ${supplement.expiryDate}`;
};

export const getSupplementTrackerContract = () => {
  const web3 = getWeb3Instance();

  if (!web3) return null;

  const contract = new web3.eth.Contract(
    abi,
    environment.web3.contracts.supplementTracker
  );

  const signSupplement = async (
    supplementId: number,
    supplementInfo: SupplementInfo
  ) => {
    const accounts = await web3.eth.getAccounts();

    const message = getSupplementMessage(supplementInfo);

    const ownerSignature = await web3.eth.accounts.sign(
      message,
      environment.web3.account.privateKey
    );

    return contract.methods
      .signSupplement(
        supplementId,
        ownerSignature.signature,
        ownerSignature.messageHash
      )
      .send({
        from: accounts[0],
      });
  };

  const addSupplement = async (
    name: string,
    manufacturer: string,
    proteins: number,
    carbs: number,
    fats: number,
    expiryDate: string
  ) => {
    const accounts = await web3.eth.getAccounts();

    const message = getSupplementMessage({
      name,
      manufacturer,
      proteins,
      carbs,
      fats,
      expiryDate,
    });

    const ownerSignature = await web3.eth.accounts.sign(
      message,
      environment.web3.account.privateKey
    );

    return contract.methods
      .addSupplement(
        name,
        manufacturer,
        proteins,
        carbs,
        fats,
        expiryDate,
        ownerSignature.signature,
        ownerSignature.messageHash
      )
      .send({
        from: accounts[0],
      });
  };

  const getSupplements = async () => {
    const supplements = (await contract.methods
      .getSupplements()
      .call()) as SupplementInfo[];

    const supplementsWithSignatures: SupplementInfoWithSignature[] = [];

    for (let index = 0; index < supplements.length; index++) {
      const supplement = supplements[index];
      const signatures = (await getSupplementSignatures(index)) as Signature[];

      supplementsWithSignatures.push({
        ...supplement,
        signatures,
      });
    }

    return supplementsWithSignatures;
  };

  const getSupplementSignatures = async (id: number) => {
    return contract.methods.getSupplementSignatures(id).call();
  };

  return {
    signSupplement,
    addSupplement,
    getSupplements,
    getSupplementSignatures,
  };
};
