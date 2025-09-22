export default interface Crypto {
    id: number;
    max_supply: number;
    circulating_supply: number;
    cmc_rank: number;
    date_added: Date;
    infinite_supply: boolean;
    last_updated: Date;
    name: string;
    num_market_pairs: number;
    self_reported_circulating_supply: number;
    self_reported_market_cap: number;
    slug: string;
    symbol: string;
    total_supply: number;
    tags: string[];
    quote: {
        ZAR: {
            fully_diluted_market_cap: number;
            last_updated: Date;
            market_cap: number;

            market_cap_dominance: number;

            percent_change_24h: number;
            percent_change_1h: number;
            percent_change_7d: number;

            price: number;

            volume_change_24h: number;
            volume_24h: number;
        }
    };
}