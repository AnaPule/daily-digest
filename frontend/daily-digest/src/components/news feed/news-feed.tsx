
import styles from './feed.module.css';

interface FeedProps {
    headlines: string[];
}

const NewsFeed: React.FC<FeedProps> = ({ headlines }) => {

    if (!headlines || headlines.length === 0) {
        return null;
    }

    return (

        <div className={styles.headlineStrip}>
            <div className={styles.tickerWrapper}>
                <div className={styles.tickerContent}>
                    {headlines.map((h, idx) => (
                        <span key={`dup-${idx}`} className={styles.tickerItem}>
                            <section>•</section>
                            <section>{h}</section>
                        </span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {headlines.map((h, idx) => (
                        <span key={`dup-${idx}`} className={styles.tickerItem}>
                            <section>•</section>
                            <section>{h}</section>
                        </span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {headlines.map((h, idx) => (
                        <span key={`dup-${idx}`} className={styles.tickerItem}>
                            <section>•</section>
                            <section>{h}</section>
                        </span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {headlines.map((h, idx) => (
                        <span key={`dup-${idx}`} className={styles.tickerItem}>
                            <section>•</section>
                            <section>{h}</section>
                        </span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {headlines.map((h, idx) => (
                        <span key={`dup-${idx}`} className={styles.tickerItem}>
                            <section>•</section>
                            <section>{h}</section>
                        </span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {headlines.map((h, idx) => (
                        <span key={`dup-${idx}`} className={styles.tickerItem}>
                            <section>•</section>
                            <section>{h}</section>
                        </span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {headlines.map((h, idx) => (
                        <span key={`dup-${idx}`} className={styles.tickerItem}>
                            <section>•</section>
                            <section>{h}</section>
                        </span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {headlines.map((h, idx) => (
                        <span key={`dup-${idx}`} className={styles.tickerItem}>
                            <section>•</section>
                            <section>{h}</section>
                        </span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {headlines.map((h, idx) => (
                        <span key={`dup-${idx}`} className={styles.tickerItem}>
                            <section>•</section>
                            <section>{h}</section>
                        </span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {headlines.map((h, idx) => (
                        <span key={`dup-${idx}`} className={styles.tickerItem}>
                            <section>•</section>
                            <section>{h}</section>
                        </span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {headlines.map((h, idx) => (
                        <span key={`dup-${idx}`} className={styles.tickerItem}>
                            <section>•</section>
                            <section>{h}</section>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewsFeed;