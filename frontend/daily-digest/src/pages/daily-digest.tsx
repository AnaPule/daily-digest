import styles from './digest.module.css'
import { HugeiconsIcon } from '@hugeicons/react';
import React, { useEffect, useState } from 'react';
import { Facebook01FreeIcons, InstagramIcon, NewTwitterRectangleIcon, Linkedin01Icon } from '@hugeicons/core-free-icons';

//models
import type Crypto from '../models/crypto';

const DailyDigest: React.FC = () => {

    const [cryptoData, setCryptoData] = useState<Crypto[]>([]);

    useEffect(() => {
        fetch('http://localhost:5001/crypto') // Specify the full backend URL
            .then(
                res => {
                    return res.json()
                    // console.log('crypto response:',res.json())
                })
            .then(
                (data) => {
                    // console.log('crypto response:', data.crypto)
                    setCryptoData(data.crypto)
                })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.topBar}>
                    <div className={styles.socialIcons}>
                        <a href="#" aria-label="Facebook"> <HugeiconsIcon icon={Facebook01FreeIcons} /> </a>
                        <a href="#" aria-label="Instagram"> <HugeiconsIcon icon={InstagramIcon} /></a>
                        <a href="#" aria-label="Twitter"> <HugeiconsIcon icon={NewTwitterRectangleIcon} /> </a>
                        <a href="#" aria-label="LinkedIn"> <HugeiconsIcon icon={Linkedin01Icon} /> </a>
                    </div>

                    <h1 className={styles.logo}>News For Today</h1>

                    <div className={styles.phoneNumber}>
                        📞 (063) 519-9397
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className={styles.navigation}>
                <div className={styles.navContainer}>
                    <ul className={styles.navMenu}>
                        <li><a href="#" aria-label="Menu">☰</a></li>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">International</a></li>
                        <li><a href="#">Business</a></li>
                        <li><a href="#">Politics</a></li>
                        <li><a href="#">Technology</a></li>
                        <li><a href="#">Fashion</a></li>
                        <li><a href="#">Corona</a></li>
                        <li><a href="#">Sports</a></li>
                        <li><a href="#">Video</a></li>
                    </ul>

                    <div className={styles.dateDisplay}>
                        Monday, 02 February 2023
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className={styles.mainContent}>
                {/* Left Sidebar */}
                <aside className="sidebar">
                    <h2>Recent News</h2>

                    <article className={styles.sidebarItem}>
                        <h3>Twitter users vote to oust Musk as CEO. So Twitter users voted in poll for Elon Musk to step down as chief executive of media.</h3>
                        <div className={styles.sidebarMeta}>
                            <span>Cristian Romero</span>
                            <span>10 Janu, 2023</span>
                        </div>
                    </article>

                    <article className={styles.sidebarItem}>
                        <h3>The Perseverance rover set to make store of rocks that can be brought home by us a future mission.</h3>
                        <div className={styles.sidebarMeta}>
                            <span>De Paul</span>
                            <span>10 Janu, 2023</span>
                        </div>
                    </article>

                    <article className={styles.sidebarItem}>
                        <h3>Argentina defeat France o penalties to win the World Cup in a tournament that saw more goals and shocks record numbers.</h3>
                        <div className={styles.sidebarMeta}>
                            <span>Paulo Dybala</span>
                            <span>10 Janu, 2023</span>
                        </div>
                    </article>

                    <article className={styles.sidebarItem}>
                        <h3>China has developed and produced its own vaccines, which have been shown to less effective at protecting people against.</h3>
                        <div className={styles.sidebarMeta}>
                            <span>Juan Foyth</span>
                            <span>10 Janu, 2023</span>
                        </div>
                    </article>
                </aside>

                {/* Main Featured Article */}
                <main>
                    <article className={styles.featuredArticle}>
                        <img
                            src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=300&fit=crop"
                            alt="War in Ukraine - people waiting in line"
                            className={styles.featuredImage}
                        />
                        <div className={styles.featuredContent}>
                            <h1 className={styles.featuredTitle}>
                                In Focus : War in Ukraine is going to crisis for women and girls
                            </h1>
                            <p className={styles.featuredDescription}>
                                The war has severely impacted social cohesion, community security and resilience of local communities, especially women and girls. Lack of access to social services including schools & strained community resources have increased the care burden of local women and is responsible for the care for children.
                            </p>

                            <div className={styles.articleMeta}>
                                <div className={styles.authorInfo}>
                                    <div className={styles.authorAvatar}></div>
                                    <div className={styles.authorDetails}>
                                        <div className={styles.authorName}>By Alexis Mac</div>
                                        <div className={styles.publishDate}>10-01-23</div>
                                    </div>
                                </div>

                                <div className={styles.engagement}>
                                    <div className={styles.engagementItem}>
                                        👍 25 Likes
                                    </div>
                                    <div className={styles.engagementItem}>
                                        💬 39 Comments
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </main>

                {/* Right Sidebar */}
                <aside className="right-sidebar">
                    <article className={styles.rightSidebarItem}>
                        <img
                            src="https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=180&fit=crop"
                            alt="Argentina World Cup celebration"
                            className={styles.rightSidebarImage}
                        />
                        <div className={styles.rightSidebarContent}>
                            <h3 className={styles.rightSidebarTitle}>
                                Argentina won the Fifa World Cup
                            </h3>
                            <div className={styles.rightSidebarMeta}>
                                Argentina vs France, FIFA World Cup 2022 Argentina bested France 4-2 penalties to win their third World Cup, after 36 years.
                            </div>
                        </div>
                    </article>

                    <article className={styles.rightSidebarItem}>
                        <img
                            src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=180&fit=crop"
                            alt="Elon Musk"
                            className={styles.rightSidebarImage}
                        />
                        <div className={styles.rightSidebarContent}>
                            <h3 className={styles.rightSidebarTitle}>
                                Twitter users vote oust Musk, CEO
                            </h3>
                            <div className={styles.rightSidebarMeta}>
                                Twitter users voted in a poll for Elon Musk to step down as chief executive of media.
                            </div>
                        </div>
                    </article>
                </aside>
            </div >

            {/* International Section */}
            <section>
                <div className="container">
                    <h2 className={styles.sectionHeader}>International</h2>
                    <div className={styles.internationalGrid}>
                        <article className={styles.internationalItem}>
                            <img
                                src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=200&fit=crop"
                                alt="China Covid"
                                className={styles.internationalImage}
                            />
                            <div className={styles.internationalContent}>
                                <h3 className={styles.internationalTitle}>
                                    China Covid: Everyone know is getting a fever in Chaizha.
                                </h3>
                                <p className={styles.internationalDescription}>
                                    In the past two weeks, the Chinese internet has been flooded with posts of how people were pulling through.
                                </p>
                            </div>
                        </article>

                        <article className={styles.internationalItem}>
                            <img
                                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop"
                                alt="Zelensky speech"
                                className={styles.internationalImage}
                            />
                            <div className={styles.internationalContent}>
                                <h3 className={styles.internationalTitle}>
                                    Zelensky invokes World War II, says 'no compromises'.
                                </h3>
                                <p className={styles.internationalDescription}>
                                    Invoking memories of the United State's victory over a Nazi Germany in a key World War II battle.
                                </p>
                            </div>
                        </article>

                        <article className={styles.internationalItem}>
                            <img
                                src="https://images.unsplash.com/photo-1540910419892-4308791ba307?w=400&h=200&fit=crop"
                                alt="Biden Netanyahu call"
                                className={styles.internationalImage}
                            />
                            <div className={styles.internationalContent}>
                                <h3 className={styles.internationalTitle}>
                                    Biden congratulates Israel's Netanyahu in phone call.
                                </h3>
                                <p className={styles.internationalDescription}>
                                    Joe Biden has congratulated Israel's Benjamin on his election victory as the incoming Israeli prime minister
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* Sports Section */}
            <section>
                <div className="container">
                    <h2 className={styles.sectionHeader}>Sports</h2>
                    <div className={styles.sportsGrid}>
                        <article className={styles.sportsItem}>
                            <img
                                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=200&fit=crop"
                                alt="Golden Ball award ceremony"
                                className={styles.sportsImage}
                            />
                            <div className={styles.sportsContent}>
                                <h3 className={styles.sportsTitle}>
                                    Being awarded the Golden Ball, Golden Glove and Golden Boot
                                </h3>
                            </div>
                        </article>

                        <article className={styles.sportsItem}>
                            <img
                                src="https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop"
                                alt="Argentina team celebration"
                                className={styles.sportsImage}
                            />
                        </article>

                        <article className={styles.sportsItem}>
                            <div className={styles.sportsContent}>
                                <h3 className={styles.sportsTitle}>
                                    Being awarded the Golden Ball, Golden Glove and Golden Boot
                                </h3>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* Entertainment Section */}
            <h2 className={styles.sectionHeader}>Entertainment</h2>
            <div className={styles.mainContent}>
                {/* Left Sidebar */}
                <aside className="sidebar">
                    <article className={styles.rightSidebarItem}>
                        <img
                            src="https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=180&fit=crop"
                            alt="Argentina World Cup celebration"
                            className={styles.rightSidebarImage}
                        />
                        <div className={styles.rightSidebarContent}>
                            <div className={styles.rightSidebarMeta}>
                                Argentina vs France, FIFA World Cup 2022 Argentina bested France 4-2 penalties to win their third World Cup, after 36 years.
                            </div>
                        </div>
                    </article>

                    <article className={styles.rightSidebarItem}>
                        <img
                            src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=180&fit=crop"
                            alt="Elon Musk"
                            className={styles.rightSidebarImage}
                        />
                        <div className={styles.rightSidebarContent}>
                            <div className={styles.rightSidebarMeta}>
                                Twitter users voted in a poll for Elon Musk to step down as chief executive of media.
                            </div>
                        </div>
                    </article>

                </aside>

                {/* Main Featured Article */}
                <main>
                    <article className={styles.featuredArticle}>
                        <img
                            src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=300&fit=crop"
                            alt="War in Ukraine - people waiting in line"
                            className={styles.featuredImage}
                        />
                        <div className={styles.featuredContent}>
                            <p className={styles.featuredDescription}>
                                The war has severely impacted social cohesion, community security and resilience of local communities, especially women and girls. Lack of access to social services including schools & strained community resources have increased the care burden of local women and is responsible for the care for children.
                            </p>
                        </div>
                    </article>
                </main>

                {/* Right Sidebar */}
                <aside className="right-sidebar">
                    <h2>Most popular</h2>
                    <article className={styles.sidebarItem}>
                        <h3>China has developed and produced its own vaccines, which have been shown to less effective at protecting people against.</h3>
                        <div className={styles.sidebarMeta}>
                            <span>Juan Foyth</span>
                            <span>10 Janu, 2023</span>
                        </div>
                    </article>

                    <article className={styles.sidebarItem}>
                        <h3>China has developed and produced its own vaccines, which have been shown to less effective at protecting people against.</h3>
                        <div className={styles.sidebarMeta}>
                            <span>Juan Foyth</span>
                            <span>10 Janu, 2023</span>
                        </div>
                    </article>

                    <article className={styles.sidebarItem}>
                        <h3>China has developed and produced its own vaccines, which have been shown to less effective at protecting people against.</h3>
                        <div className={styles.sidebarMeta}>
                            <span>Juan Foyth</span>
                            <span>10 Janu, 2023</span>
                        </div>
                    </article>
                </aside>
            </div>
        </>
    );
}

export default DailyDigest;