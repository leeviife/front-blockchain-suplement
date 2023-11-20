import { Web3 } from 'web3';
import { abi } from './abi';
import { environment } from 'src/environments/environment';

const getWeb3Instance = (): Web3 | null => {
  if (window.ethereum) {
    window.ethereum.enable();
    return new Web3(window.ethereum);
  }
  return null;
};

export const getSupplementTrackerContract = () => {
  const web3 = getWeb3Instance();

  if (!web3) return null;

  const contract = new web3.eth.Contract(
    abi,
    environment.web3.contracts.supplementTracker
  );

  const addSupplement = async (
    name: string,
    manufacturer: string,
    proteins: number,
    carbs: number,
    fats: number,
    expiryDate: string
  ) => {
    const accounts = await web3.eth.getAccounts();

    const message = `${name} ${manufacturer} ${proteins} ${carbs} ${fats} ${expiryDate}`;
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

  const getSupplementInfo = async (id: number) => {
    return contract.methods.getSupplementInfo(id).call();
  };

  return {
    addSupplement,
    getSupplementInfo,
  };
};