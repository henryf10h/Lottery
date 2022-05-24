import {
  useAddWeb3ProviderListners,
  useInitializeContract,
  useInitWeb3Modal,
  useLoadWeb3,
  useOnInitialWeb3Run,
  useReadBalance,
} from "./hooks/web3.hooks";

const HooksWrapper = ({ children }) => {
  useInitWeb3Modal();
  useLoadWeb3();
  useInitializeContract();
  useOnInitialWeb3Run();
  useAddWeb3ProviderListners();
  useReadBalance();
  return <>{children}</>;
};

export default HooksWrapper;
