import { Web3UserContext } from "../../context";
import { shortenAddress } from "../../utils/constants";

const WalletConnect = () => {
  const { contextState, connectWallet } = Web3UserContext();

  const { isWalletConnected, account } = contextState;

  const handleWalletConnect = () => {
    !isWalletConnected && connectWallet();
  };

  return (
    <button onClick={handleWalletConnect}>
      {isWalletConnected ? <p>{shortenAddress(account)}</p> : <p>CONECTAR</p>}
    </button>
  );
};

export default WalletConnect;
