import React from "react";
import styles from "./header.module.css";
import ethIcon from "../../assets/icons/ethIcon.png";
import logo from "../../assets/images/logo.png";
import WalletConnect from "../walletConnect";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.right}>
          <div className={styles.network}>
            <img src={ethIcon} alt="" className={styles.networkIcon} />
            <div className={styles.networkTitle}>Polygon</div>
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
              className="NetworkSelector__StyledChevronDown-sc-1e6r0ji-14 eLXWsb"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className={styles.connectWallet}>
            <div className={styles.connectWalletInner}>
              <WalletConnect />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
