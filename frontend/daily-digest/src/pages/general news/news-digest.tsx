import { HugeiconsIcon } from '@hugeicons/react';
import React, { useEffect, useState } from 'react';
import { Facebook01FreeIcons, InstagramIcon, NewTwitterRectangleIcon, Linkedin01Icon } from '@hugeicons/core-free-icons';

import { Codesandbox, Newspaper, ChartNoAxesCombined } from 'lucide-react';

//components
import NewsFeed from '../../components/news feed/news-feed';
import PageTemplate from '../../components/page/page-template';

//models
import styles from './news.module.css';
import type { Article, Headline } from '../../models/news';

const NewsDigest: React.FC = () => {

    const [articleData, setArticleData] = useState<Article[]>([]);
    const [headlines, setHeadlines] = useState<Headline[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile screen size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        const fetchGeneral = async () => {
            try {
                const response = await fetch('http://localhost:5001/news');
                const data = await response.json();
                setArticleData(data.articles);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchGeneral();
        const interval = setInterval(fetchGeneral, 300000); // Every 5 minutes
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchHeadlines = async () => {
            try {
                const response = await fetch('http://localhost:5001/news/headlines');
                const data = await response.json();
                setHeadlines(data.headlines);
            } catch (error) {
                console.error('Error fetching headlines:', error);
            }
        };

        fetchHeadlines();
        const interval = setInterval(fetchHeadlines, 300000); // Every 5 minutes
        return () => clearInterval(interval);
    }, []);

    const splitTextIntoColumns = (text: string) => {
        if (!text) return { column1: '', column2: '' };

        const words = text.split(' ');
        const midPoint = Math.ceil(words.length / 2);

        // Find a good break point (prefer ending with punctuation)
        let breakPoint = midPoint;
        for (let i = midPoint - 5; i <= midPoint + 5; i++) {
            if (i > 0 && i < words.length && /[.!?]$/.test(words[i])) {
                breakPoint = i + 1;
                break;
            }
        }

        const column1 = words.slice(0, breakPoint).join(' ');
        const column2 = words.slice(breakPoint).join(' ');

        return { column1, column2 };
    };

    const renderSidebarSection = (title: string, category: string) => (
        <div key={category}>
            <div className={styles.rightQuote}>
                <div className={styles.quoteContent}>
                    <p>{title}</p>
                </div>
            </div>
            {articleData
                .filter((a) => a.category.includes(category))
                .map((article, index) => (
                    <article key={`${category}-${index}`} className={styles.rightSidebarArticle}>
                        <div className={styles.articleHeader}>
                            <div className={styles.articleMeta}>
                                <h4>{article.title}</h4>
                                <span
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexWrap: 'wrap',
                                        gap: '8px',
                                        fontWeight: '700',
                                        fontSize: '11px',
                                    }}
                                    className={`secondary-text`}
                                >
                                    <span>{article.source_name}</span>
                                    <div
                                        onClick={() => window.open(article.link, '_blank')}
                                        className="tooltip-link"
                                        style={{
                                            fontSize: 'x-small',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            color: '#007acc'
                                        }}
                                    >
                                        Read More
                                    </div>
                                </span>
                            </div>
                        </div>
                    </article>
                ))
            }
        </div >
    );

    return (
        <PageTemplate>
            <div className={styles.newspaperContainer}>
                {/* Header */}
                <header className={styles.newspaperHeader}>
                    <div className={styles.headerCenter}>
                        <div className={styles.newspaperLogo}>
                            <Codesandbox size={isMobile ? 28 : 35} />
                        </div>
                        <h2 className="primary-text">
                            Daily Digest
                            <br />
                            <h4 className="secondary-text">Your daily real-time information hub</h4>
                        </h2>
                    </div>
                </header>

                {/* Headlines line */}
                <NewsFeed />

                {/* Main Content Grid */}
                <div className={styles.mainContent}>
                    {/* Left Sidebar - Politics & Sports */}
                    <aside className={styles.leftSidebar}>
                        {renderSidebarSection('Politics', 'politics')}
                        {renderSidebarSection('Sports', 'sports')}
                    </aside>

                    {/* Center Main Content - Headlines */}
                    <main>
                        <h1 className={styles.mainHeadline}>Headlines</h1>

                        <div className={styles.centerContent}>
                            {headlines.map((headline, idx) => {
                                const { column1, column2 } = splitTextIntoColumns(headline.description);
                                return (
                                    <div key={idx} className={styles.headlineArticle}>
                                        <img
                                            src={headline.image}
                                            className={styles.headlineImage}
                                            alt={headline.title}
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=300&fit=crop';
                                            }}
                                        />
                                        <p className="secondary-text">
                                            From: <strong>{headline.source}</strong>
                                        </p>
                                        <h3 style={{
                                            margin: '10px 0',
                                            fontSize: isMobile ? '1rem' : '1.2rem',
                                            lineHeight: '1.4'
                                        }}>
                                            {headline.title}
                                        </h3>

                                        <div className={styles.articleColumns}>
                                            <div className={styles.column}>
                                                <p>{column1}</p>
                                            </div>
                                            <div className={styles.column}>
                                                <p>{column2}</p>
                                            </div>
                                        </div>

                                        <div
                                            onClick={() => window.open(headline.url, '_blank')}
                                            className="tooltip-link"
                                            style={{
                                                fontSize: isMobile ? 'x-small' : 'small',
                                                cursor: 'pointer',
                                                color: '#007acc',
                                                textDecoration: 'underline'
                                            }}
                                        >
                                            Read Full Article
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </main>

                    {/* Right Sidebar - Business & Entertainment */}
                    <aside className={styles.rightSidebar}>
                        {renderSidebarSection('Business', 'business')}
                        {renderSidebarSection('Entertainment', 'entertainment')}
                    </aside>
                </div>

                {/* Footer */}
                <footer className={styles.newspaperFooter}>
                    <div className={styles.footerContent}>
                        <span></span>
                        <span>© 2025 Morwetsana Pule</span>
                        <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            flexWrap: 'wrap'
                        }}>
                            Daily Digest
                            <Codesandbox size={isMobile ? 12 : 16} />
                        </span>
                    </div>
                </footer>
            </div>
        </PageTemplate>
    );
};

export default NewsDigest;