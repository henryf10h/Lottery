import { useEffect } from "react";
import { Web3UserContext } from "../context";
import { TYPES } from "../context/reducer";

export const useInitWeb3Modal = () => {
  const { initializeWeb3Modal } = Web3UserContext();
  useEffect(() => {
    initializeWeb3Modal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useLoadWeb3 = () => {
  const { loadWeb3 } = Web3UserContext();

  useEffect(() => {
    loadWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useInitializeContract = () => {
  const { contextState, initializeContract } = Web3UserContext();

  const { isWeb3InstanceCreated, isCorrectChain } = contextState;

  useEffect(() => {
    isWeb3InstanceCreated && isCorrectChain && initializeContract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3InstanceCreated, isCorrectChain]);
};

export const useOnInitialWeb3Run = () => {
  const {
    dispatch,
    contextState: { acceptedChainId, isWeb3InstanceCreated },
    switchChain,
    getChainId,
  } = Web3UserContext();
  useEffect(() => {
    (async () => {
      if (!isWeb3InstanceCreated) return null;
      //  this method will fetch the current connected blockchain network
      const chainId = await getChainId();

      //  if the connected network is not as required it will ask to switch it
      if (parseInt(acceptedChainId) !== parseInt(chainId)) {
        try {
          await switchChain(acceptedChainId);
        } catch (err) {
          console.log(err);
        }
      } else
        dispatch({
          type: TYPES.UPDATE_CHAIN_DETAILS,
          payload: {
            isCorrectChain: true,
            connectedChainId: chainId,
          },
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3InstanceCreated]);
};

/**
 * @note this hook should only be called inside the Web3Context. otherwise it will not work properly
 * @dev  this custom hook will run when the webpage loads. it will listen for changes in network (blockchain network) and account.
 */
export const useAddWeb3ProviderListners = () => {
  const {
    dispatch,
    contextState: { account, provider, acceptedChainId },
    switchChain,
    getBalance,
  } = Web3UserContext();
  useEffect(() => {
    if (!provider) return;
    provider.on("accountsChanged", async (accounts) => {
      let payload = {
        isWalletConnected: false,
        account: null,
      };
      if (accounts && accounts.length) {
        payload = { isWalletConnected: true, account: accounts[0] };
        getBalance(accounts[0]);
      }
      dispatch({
        type: TYPES.UPDATE_CONNECTED_WALLET,
        payload: payload,
      });
    });
    //  network event listeners
    provider.on("chainChanged", async (chainId) => {
      const isCorrectChain = parseInt(acceptedChainId) === parseInt(chainId);
      dispatch({
        type: TYPES.UPDATE_CHAIN_DETAILS,
        payload: {
          isCorrectChain: isCorrectChain,
          connectedChainId: chainId,
        },
      });
      if (!isCorrectChain)
        try {
          await switchChain(acceptedChainId);
        } catch (err) {
          console.log(err);
        }

      account && getBalance(account);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);
};

export const useReadBalance = () => {
  const {
    contextState: {
      account,
      reFetchBalance,
      isWalletConnected,
      isWeb3InstanceCreated,
    },
    getBalance,
  } = Web3UserContext();

  useEffect(() => {
    isWalletConnected && isWeb3InstanceCreated && getBalance(account);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, reFetchBalance, isWalletConnected, isWeb3InstanceCreated]);
};
