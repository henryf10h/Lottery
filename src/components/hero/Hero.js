import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ethIcon from "../../assets/icons/ethIcon.png";
import { Web3UserContext } from "../../context";
import WalletConnect from "../walletConnect";
import "react-toastify/dist/ReactToastify.css";

import styles from "./hero.module.css";

const Hero = () => {
  const {
    contextState: {
      contract,
      web3Instance,
      isWalletConnected,
      isContractReady,
      account,
    },
  } = Web3UserContext();

  const [reclamerValue, setReclamerValue] = useState("");

  const [entrarValue, setEntrarValue] = useState("");
  const handleEntrarChange = (e) => {
    setEntrarValue(e.target.value);
  };

  useEffect(() => {
    (async () => {
      if (!isContractReady) return;
      const balance = await contract.methods.balance(account).call();
      const balanceInEth = web3Instance.utils.fromWei(
        balance.toString(),
        "ether"
      );
      setReclamerValue(balanceInEth);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isContractReady, account]);

  const handleReclamer = async () => {
    if (!isWalletConnected || !isContractReady)
      return toast("Please connect your wallet", { type: "warning" });

    if (reclamerValue <= 0)
      return toast("You do not have enough funds to claim", { type: "error" });

    try {
      await contract.methods.claim().send({
        from: account,
      });
      return toast("Transaction successful", { type: "success" });
    } catch (err) {
      return toast(err.message || err, { type: "error" });
    }
  };

  const handleEntrar = async () => {
    if (!isWalletConnected || !isContractReady)
      return toast("Please connect your wallet", { type: "warning" });

    if (!!!entrarValue) return toast("Amount must be grater than 0");

    try {
      const priceInWe = web3Instance.utils.toWei(
        entrarValue.toString(),
        "ether"
      );

      await contract.methods.enter().send({
        from: account,
        value: priceInWe,
      });
      return toast("Transaction successful", { type: "success" });
    } catch (err) {
      return toast(err.message || err, { type: "error" });
    }
  };
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <div className={styles.headerWrapper}>
              <div className={styles.left}>
                <div className={styles.leftInner}>Pote:</div>
              </div>
              <div className={styles.right}>
                <div className={styles.rightInner}>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="Settings__StyledMenuIcon-sc-fxnuer-0 llccoy"
                    >
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.bodyWrapper}>
              <div>
                <div className={styles.currencyInput}>
                  <div className={styles.currencyInputInner}>
                    <div className={styles.currencyInputInnerWrapper}>
                      <input
                        inputMode="decimal"
                        autoComplete="off"
                        autoCorrect="off"
                        type="number"
                        pattern="^[0-9]*[.,]?[0-9]*$"
                        placeholder="0.0"
                        minLength="1"
                        maxLength="79"
                        spellCheck="false"
                        value={reclamerValue}
                        readOnly
                      />
                      <button>
                        <span>
                          <div
                            className={styles.spanWrap}
                            onClick={handleReclamer}
                          >
                            <img src={ethIcon} alt="" />
                            <p>RECLAMAR</p>
                          </div>
                          <svg
                            width="12"
                            height="7"
                            viewBox="0 0 12 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`CurrencyInputPanel__StyledDropDown-sc-db1zdq-8 bTHhjV ${styles.svgs}`}
                          >
                            <path
                              d="M0.97168 1L6.20532 6L11.439 1"
                              stroke="#AEAEAE"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* <div className={styles.arrowWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6E727D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div> */}
                <div className={styles.currencyOutput}>
                  <div className={styles.currencyOutputInner}>
                    <div className={styles.currencyOutputInnerWrapper}>
                      <input
                        inputMode="decimal"
                        autoComplete="off"
                        autoCorrect="off"
                        type="number"
                        pattern="^[0-9]*[.,]?[0-9]*$"
                        placeholder="0.0"
                        minLength="1"
                        maxLength="79"
                        spellCheck="false"
                        value={entrarValue}
                        onChange={handleEntrarChange}
                      />
                      <button>
                        <span className={styles.output}>
                          <div
                            className={styles.outputContents}
                            onClick={handleEntrar}
                          >
                            <span>ENTRAR</span>
                          </div>
                          <svg
                            width="12"
                            height="7"
                            viewBox="0 0 12 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`CurrencyInputPanel__StyledDropDown-sc-db1zdq-8 HBfqJ ${styles.svgs}`}
                          >
                            <path
                              d="M0.97168 1L6.20532 6L11.439 1"
                              stroke="#fff"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.connectButton}>
                <WalletConnect />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Hero;
