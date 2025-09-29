//components
import styles from './loader.module.css'

const Throbber: React.FC = () => {
    return (
        <div className={styles.loaderWrapper}>
            <div className={styles.loader}></div>
            <div className={styles.textContainer}>
                <span className={styles.loaderLetter}>L</span>
                <span className={styles.loaderLetter}>O</span>
                <span className={styles.loaderLetter}>A</span>
                <span className={styles.loaderLetter}>D</span>
                <span className={styles.loaderLetter}>I</span>
                <span className={styles.loaderLetter}>N</span>
                <span className={styles.loaderLetter}>G</span>
                <span className={styles.loaderLetter}>.</span>
                <span className={styles.loaderLetter}>.</span>
                <span className={styles.loaderLetter}>.</span>
            </div>
        </div>
    );
}

export default Throbber;