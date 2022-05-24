import { TYPES } from "./reducer";
import { ABI, CONTRACT_ADDRESS } from "../contract/contract-config";
import { networkConfigs } from "../utils/constants.js";

export default function actions(state, dispatch = () => {}) {
  /************************************/
  /************************************/
  const { Web3, web3Modal, web3Instance, provider } = state;

  /************************************/
  /************************************/

  const loadWeb3 = async () => {
    const { default: web3 } = await import("web3");
    dispatch({
      type: TYPES.WEB_3_LOADED,
      payload: web3,
    });
  };

  const initializeWeb3Modal = async () => {
    let { default: web3Modal } = await import("web3modal");
    const { default: WalletConnectProvider } = await import(
      "@walletconnect/web3-provider"
    );

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "91c105a5db5a40cdb0099212ba17cb5f", // required
        },
      },
    };
    web3Modal = new web3Modal({ providerOptions });

    dispatch({
      type: TYPES.INII_WEB3_MODAL,
      payload: web3Modal,
    });
  };

  const connectWallet = async () => {
    if (!web3Modal) return;
    try {
      const provider = await web3Modal.connect();

      const web3Instance = new Web3(provider);

      let account = await web3Instance.eth.getCoinbase();
      if (!account) {
        await provider.request({ method: "eth_requestAccounts" });
        account = await web3Instance.eth.getCoinbase();
      }

      dispatch({
        type: TYPES.WALLET_CONNECTED,
        payload: { web3Instance, account, provider },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const initializeContract = () => {
    if (!web3Instance) return;
    const contract = new web3Instance.eth.Contract(ABI, CONTRACT_ADDRESS);

    dispatch({
      type: TYPES.CONTRACT_INITIALIZED,
      payload: contract,
    });
  };

  /**
   *
   * @dev this function creates request for the network changes in metmaks. if the requested netwok is not available it will request to add it in metmask.
   * @params chainId is the hex string of the chain Id. default is set to Binance mainnet
   */
  const switchChain = async (chainId) => {
    if (!chainId) return;
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    } catch (err) {
      // if no chain found request to add
      if (err.code === 4902 || /Unrecognized chain ID/.test(err.message))
        return await provider.request({
          method: "wallet_addEthereumChain",
          params: networkConfigs[chainId],
        });
      throw err;
    }
  };

  /**
   * @dev it returns current selected blockchain network in metamask
   */
  const getChainId = async () => {
    if (!web3Instance) return null;
    const chainId = await web3Instance.eth.getChainId();
    return chainId;
  };

  /**
   * @dev reads both balance of connected wallet.
   */
  const getBalance = async (account) => {
    let balance = await web3Instance.eth.getBalance(account);
    balance = web3Instance.utils.fromWei(balance.toString(), "ether");
    dispatch({
      type: TYPES.UPDATE_BALANCED,
      payload: balance,
    });
  };

  const refetchBalance = () => dispatch({ type: TYPES.REFRESH_BALANCED });

  return {
    contextState: state,
    dispatch,
    loadWeb3,
    initializeWeb3Modal,
    initializeContract,
    connectWallet,
    switchChain,
    getChainId,
    refetchBalance,
    getBalance,
  };
}
