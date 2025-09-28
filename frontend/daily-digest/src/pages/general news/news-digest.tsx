

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
    const [newsFeed, setNewsFeed] = useState<string[]>([]);
   

    useEffect(() => {
        const fetchGeneral = async () => {
            await fetch('http://localhost:5001/news')
                .then(
                    res => {
                        //console.log('news response:',res.json())
                        return res.json()
                    })
                .then(
                    (data) => {
                        //console.log('news response:', data.articles)
                        setArticleData(data.articles)
                        //console.log('Testing', data.crypto.filter((data: Crypto) => data.name === 'Bitcoin'))
                    })
                .catch(error => console.error('Error fetching data:', error));
        }
        fetchGeneral();
        const interval = setInterval(fetchGeneral, 300000); // Every 5 minutes
        return () => clearInterval(interval);
    }, [])

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
                        setHeadlines(data.headlines)
                        let feed:  string[] = [];
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
        <PageTemplate>

            <div className={styles.newspaperContainer}>
                {/* Header */}
                <header className={styles.newspaperHeader}>
                    {/* Center Logo/Title */}
                    <div className={styles.headerCenter}>
                        <div className={styles.newspaperLogo}><Codesandbox size={35} /></div>
                        <h2 className='primary-text'>
                            Daily Digest
                            <br />
                            <h4 className='secondary-text'>Your daily real-time information hub</h4>
                        </h2>
                    </div>
                </header>

                {/* healines line */}
                <NewsFeed headlines={newsFeed}/>
            
                {/* Main Content Grid */}
                <div className={styles.mainContent}>
                    {/* Right Sidebar */}
                    <aside className={styles.leftSidebar}>
                        {/* Multiple small articles */}
                        <article className={styles.sidebarArticle}>
                            <div className={styles.articleHeader}>
                                <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop" alt="Author" className={styles.authorPhoto} />
                                <div className={styles.articleMeta}>
                                    <h4>عنوان مقاله</h4>
                                    <span>نام نویسنده</span>
                                </div>
                            </div>
                            <p>متن مقاله که در سایدبار چپ قرار می‌گیرد و شامل اطلاعات مهم روز است که برای خوانندگان جالب خواهد بود.</p>
                        </article>

                        <article className={styles.sidebarArticle}>
                            <div className={styles.articleHeader}>
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" alt="Author" className={styles.authorPhoto} />
                                <div className={styles.articleMeta}>
                                    <h4>عنوان مقاله دوم</h4>
                                    <span>نام نویسنده دوم</span>
                                </div>
                            </div>
                            <p>متن مقاله دوم که در سایدبار چپ قرار می‌گیرد و شامل اطلاعات مهم روز است.</p>
                        </article>

                        <article className={styles.sidebarArticle}>
                            <div className={styles.articleHeader}>
                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" alt="Author" className={styles.authorPhoto} />
                                <div className={styles.articleMeta}>
                                    <h4>عنوان مقاله سوم</h4>
                                    <span>نام نویسنده سوم</span>
                                </div>
                            </div>
                            <p>متن مقاله سوم که در سایدبار چپ قرار می‌گیرد.</p>
                        </article>

                        <article className={styles.sidebarArticle}>
                            <div className={styles.articleHeader}>
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" alt="Author" className={styles.authorPhoto} />
                                <div className={styles.articleMeta}>
                                    <h4>عنوان مقاله چهارم</h4>
                                    <span>نام نویسنده چهارم</span>
                                </div>
                            </div>
                            <p>متن مقاله چهارم که در سایدبار چپ قرار می‌گیرد.</p>
                        </article>

                        {/* Bottom section with logo */}
                        <div className={styles.sidebarBottom}>
                            <div className={styles.bottomLogo}>ایران</div>
                            <p>نشر قدیمی‌ترین</p>
                            <img src="https://images.unsplash.com/photo-1606146485063-2d1885ae5b35?w=200&h=120&fit=crop" alt="Building" className={styles.sidebarImage} />
                        </div>~
                    </aside>

                    {/* Center Main Content */}
                    <main className={styles.centerContent}>
                        {/* Main headline */}
                        <h1 className={styles.mainHeadline}>Headlines</h1>

                        {/* Main article image */}
                        <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=300&fit=crop" alt="Main article" className={styles.mainImage} />
                        <p className={styles.imageCaption}>توضیح تصویر</p>

                        {/* Main article content in columns */}
                        <div className={styles.articleColumns}>
                            <div className={styles.column}>
                                <p>متن اصلی مقاله که در ستون‌های مختلف قرار می‌گیرد. این متن شامل جزئیات کاملی از موضوع اصلی مقاله است و به صورت چندستونه نمایش داده می‌شود تا خوانایی بهتری داشته باشد.</p>
                                <p>ادامه متن مقاله که اطلاعات بیشتری در مورد موضوع ارائه می‌دهد و برای خوانندگان مفید خواهد بود.</p>
                            </div>
                            <div className={styles.column}>
                                <p>ستون دوم از متن اصلی مقاله که ادامه مطالب را شامل می‌شود. این بخش نیز حاوی اطلاعات مهم و کاربردی است.</p>
                                <p>پایان متن اصلی مقاله که تمام نکات مهم را پوشش می‌دهد.</p>
                            </div>
                        </div>

                        {/* Quote box */}
                        <div className={styles.quoteBox}>
                            <p>این یک نقل قول مهم از متن اصلی است که در یک باکس جداگانه قرار گرفته تا توجه بیشتری را جلب کند.</p>
                        </div>

                        {/* Bottom section */}
                        <div className={styles.bottomSection}>
                            <h2>سرمقاله</h2>
                            <div className={styles.bottomContent}>
                                <div className={styles.bottomText}>
                                    <p>متن سرمقاله که در پایین صفحه قرار می‌گیرد و دیدگاه روزنامه در مورد مسائل مهم روز را بیان می‌کند.</p>
                                    <p>ادامه سرمقاله که نظرات و تحلیل‌های عمیق‌تری ارائه می‌دهد.</p>
                                </div>
                                <div className={styles.bottomImage}>
                                    <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop" alt="Editorial" />
                                    <p>ریس پارلمان کویت</p>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Left Sidebar */}
                    <aside className={styles.rightSidebar}>
                        {/* Top logo section */}

                        {/* Main right article */}

                        {/* Side articles */}
                        {
                            articleData ? (
                                articleData
                                    .filter((a) => a.category.includes('top'))
                                    .map((a) => (
                                        <article className={styles.rightSidebarArticle}>
                                            <div className={styles.articleHeader}>
                                                <div className={styles.articleMeta}>
                                                    <h4>{a.title}</h4>
                                                    <span className={styles.sourceName}>{a.source_name}</span>
                                                </div>
                                            </div>
                                        </article>
                                    ))
                            ) : null
                        }

                        {/* Quote section */}
                        <div className={styles.rightQuote}>
                            <div className={styles.quoteContent}>
                                <p>نقل قول مهم که در سایدبار راست قرار گرفته</p>
                            </div>
                        </div>

                        {/* Bottom section */}
                        <div className={styles.rightBottom}>
                            <h3>سرمقاله</h3>
                            <p>متن کوتاه سرمقاله در سایدبار راست</p>
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250&h=150&fit=crop" alt="Bottom" className={styles.rightBottomImage} />

                            {/* QR Code area */}
                            <div className={styles.qrSection}>
                                <div className={styles.qrPlaceholder}>QR</div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Footer */}
                <footer className={styles.newspaperFooter}>
                    <div className={styles.footerContent}>
                        <span>شماره صفحه</span>
                        <span>تاریخ انتشار</span>
                        <span>شماره نشریه</span>
                    </div>
                </footer>

            </div>
        </PageTemplate>
    );
}

export default NewsDigest;