/* eslint-disable @next/next/no-img-element */
import styles from "./header.module.scss";
const Header = () => {
  return (
    <header className={styles.main}>
      <div className="container-fluid">
        <div className={styles.wrap}>
          <a className={styles.logo} href="/">
            <img src="/images/rpc-logo.png" alt="rpc" />
          </a>

          <nav className={styles.menu}>
            <ul>
              <li>
                <a href="#">Docs</a>
              </li>
              <li>
                <a href="#">GitHub</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
