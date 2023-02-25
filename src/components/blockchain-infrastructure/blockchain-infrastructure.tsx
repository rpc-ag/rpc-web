/* eslint-disable @next/next/no-img-element */
"use client";
import styles from "./blockchain-infrastructure.module.scss";

const BlockchainInfrastructure = () => {
  return (
    <section className={styles.main}>
      <div className="container">
        <h1 className={styles.title}>Homepage for Blockchain Infrastructure</h1>

        <div className={styles.items}>
          <div className={styles.item}>
            <div className={styles.item_body}>
              <h4 className={"item_title"}>Node Providers</h4>
              <p className={"item_text"}>Reach us to support developer community.</p>
            </div>
            <a href="/blockchain-infrastructure/node-providers" className={"item_link"}>
              <span>More Info</span>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.4038 8.66996L19.0738 4.99993L15.4038 1.32996"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M1.31543 4.99988H19.0735" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
          <div className={styles.item + " style-2"}>
            <div className={styles.item_body}>
              <h4 className={"item_title"}>Developers</h4>
              <p className={"item_text"}>Reach us to get your free endpoint for development purpose</p>
            </div>
            <a href="/blockchain-infrastructure/node-providers" className={"item_link"}>
              <span>More Info</span>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.4038 8.66996L19.0738 4.99993L15.4038 1.32996"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M1.31543 4.99988H19.0735" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
          <div className={styles.item}>
            <div className={styles.item_body}>
              <h4 className={"item_title"}>Project Owners</h4>
              <p className={"item_text"}>Reach us to share your node securely</p>
            </div>
            <a href="/blockchain-infrastructure/node-providers" className={"item_link"}>
              <span>More Info</span>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.4038 8.66996L19.0738 4.99993L15.4038 1.32996"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M1.31543 4.99988H19.0735" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlockchainInfrastructure;
