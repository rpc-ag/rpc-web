/* eslint-disable @next/next/no-img-element */
import styles from "./header.module.scss";
const Header = () => {
  return (
    <header className={styles.main}>
      <div className="container-fluid">
        <div className={styles.wrap}>
          <a className={styles.logo} href="/">
            <img src="/images/rpc-logo-old.png" alt="rpc" />
          </a>

          <nav className={styles.menu}>
            <ul>
              <li>
                <a href="https://docs.rpc.ag/" target={"_blank"}>
                  Docs
                </a>
              </li>
              <li>
                <a href="https://github.com/rpc-ag" target={"_blank"}>
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.8989 0.38678C5.30404 0.38678 0.781128 4.94303 0.781128 10.5797C0.781128 15.0855 3.67911 18.8995 7.69939 20.2494C8.20202 20.3508 8.38614 20.03 8.38614 19.7602C8.38614 19.5239 8.36957 18.7139 8.36957 17.87C5.55505 18.4776 4.96895 16.6549 4.96895 16.6549C4.51663 15.4736 3.84645 15.17 3.84645 15.17C2.92526 14.5455 3.91355 14.5455 3.91355 14.5455C4.9354 14.6131 5.47158 15.5918 5.47158 15.5918C6.376 17.1443 7.83338 16.7056 8.41969 16.4356C8.50336 15.7774 8.77155 15.3218 9.05632 15.0687C6.81154 14.8324 4.44974 13.9549 4.44974 10.0396C4.44974 8.92582 4.85152 8.01457 5.48815 7.30586C5.38771 7.05279 5.03584 6.0063 5.5888 4.60566C5.5888 4.60566 6.4431 4.3356 8.36936 5.65195C9.19406 5.42883 10.0446 5.31532 10.8989 5.31437C11.7532 5.31437 12.6241 5.43262 13.4283 5.65195C15.3547 4.3356 16.209 4.60566 16.209 4.60566C16.762 6.0063 16.4099 7.05279 16.3095 7.30586C16.9629 8.01457 17.3481 8.92582 17.3481 10.0396C17.3481 13.9549 14.9863 14.8154 12.7247 15.0687C13.0934 15.3893 13.4115 15.9967 13.4115 16.9587C13.4115 18.3256 13.3949 19.4226 13.3949 19.76C13.3949 20.03 13.5792 20.3508 14.0817 20.2496C18.1019 18.8993 20.9999 15.0855 20.9999 10.5797C21.0165 4.94303 16.477 0.38678 10.8989 0.38678Z"
                      fill="white"
                    />
                  </svg>
                  <span className="mobile-hidden">GitHub</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@rpc.ag" target={"_blank"}>
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
