export interface Article{
    article_id: string;

    title: string;
    
    category: string[];
    country: string[];
    creator: string[];
    description: string;
    image_url: string;
    keywords: string[];
    link: string;
    pubDate: Date | string;

    source_id: string;
    source_icon: string;
    source_name: string;
    source_url: string;
}

export interface Headline{
    author: string;
    category: string;
    country: string;
    description: string;
    image: string;
    source: string;
    published_at: string;
    title: string;
    url: string;
}