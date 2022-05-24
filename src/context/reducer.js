export const TYPES = {
  WEB_3_LOADED: "WEB_3_LOADED",
  WALLET_CONNECTED: "WALLET_CONNECTED",
  UPDATE_CONNECTED_WALLET: "UPDATE_CONNECTED_WALLET",
  INII_WEB3_MODAL: "INII_WEB3_MODAL",
  CONTRACT_INITIALIZED: "CONTRACT_INITIALIZED",

  UPDATE_CHAIN_DETAILS: "UPDATE_CHAIN_DETAILS",
  UPDATE_BALANCED: "UPDATE_BALANCED",
  REFRESH_BALANCED: "REFRESH_BALANCED",
};
// state of the application
export const initialState = {
  acceptedChainId: "0x13881", // Polygon Mumbai network Id
  // acceptedChainId: "0x89", // Polygon mainnet

  connectedChainId: null,
  isCorrectChain: false,

  account: null,
  isWalletConnected: false,

  balance: 0,
  balanceLoaded: false,
  reFetchBalance: false,

  contract: null,
  isContractReady: false,

  provider: null,

  Web3: null,
  Web3Instance: null,
  isWeb3InstanceCreated: false,
  web3Modal: null,
};

export default function reducer(state, action) {
  switch (action.type) {
    case TYPES.INII_WEB3_MODAL:
      return {
        ...state,
        web3Modal: action.payload,
      };

    case TYPES.WEB_3_LOADED:
      return {
        ...state,
        Web3: action.payload,
      };

    case TYPES.WALLET_CONNECTED:
      return {
        ...state,
        ...action.payload,
        isWalletConnected: true,
        isWeb3InstanceCreated: true,
      };

    case TYPES.CONTRACT_INITIALIZED:
      return {
        ...state,
        contract: action.payload,
        isContractReady: true,
      };

    case TYPES.UPDATE_CHAIN_DETAILS:
      return {
        ...state,
        ...action.payload,
      };

    case TYPES.UPDATE_CONNECTED_WALLET:
      return {
        ...state,
        ...action.payload,
      };

    case TYPES.UPDATE_BALANCED:
      return {
        ...state,
        balance: action.payload,
        balanceLoaded: true,
      };

    case TYPES.REFRESH_BALANCED:
      return {
        ...state,
        balanceLoaded: true,
        refetchBalance: !state.reFetchBalance,
      };

    default:
      return state;
  }
}
