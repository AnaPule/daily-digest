//react
import { useState, useEffect } from 'react';
import styles from './feed.module.css';

//models
import type { Headline } from '../../models/news';

const NewsFeed: React.FC = () => {

    const [headlines, setNewsFeed] = useState<string[]>([]);

    useEffect(() => {
        const fetchHeadlines = async () => {
            await fetch('http://localhost:5001/news/headlines')
                .then(
                    res => {
                        //console.log('raw headline response:', res)
                        return res.json()
                    })
                .then(
                    (data) => {
                        //console.log('headline response:', data.headlines)
                        //setHeadlines(data.headlines)

                        let feed: string[] = [];
                        data.headlines.map((h: Headline) => (
                            feed.push(h.title)
                        ))
                        //console.log('news feed', feed)
                        setNewsFeed(feed)
                    })
                .catch(error => console.error('Error fetching data:', error));
        }
        fetchHeadlines();
        const interval = setInterval(fetchHeadlines, 300000); // Every 5 minutes
        return () => clearInterval(interval);
    }, [])

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
                    ))}{/* Duplicate for seamless loop */}
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