
import styles from './crypto.module.css'
import type Crypto from '../../models/crypto';
import Tooltip from '../../components/tooltip';
import React, { useState, useMemo } from 'react';
import { Info, Star, ChevronLeft, ChevronRight, ChevronLast, ChevronFirst, Funnel, ArrowDownNarrowWide } from 'lucide-react';

interface CryptoTableProps {
    data: Crypto[];
}

const CryptoTable: React.FC<CryptoTableProps> = ({ data }) => {

    type SortState = 'none' | 'asc' | 'desc';
    const [currentPage, setCurrentPage] = useState(1);//pagination
    const [searchedValue, setSearchedValue] = useState<string>('') // searching 
    const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Initial selected value
    const [sortState, setSortState] = useState<SortState>('none'); // sorting according to name


    //sorting according to name
    const sortData = () => {
        setSortState(prev => {
            switch (prev) {
                case 'none': return 'asc';
                case 'asc': return 'desc';
                case 'desc': return 'none';
                default: return 'none';
            }
        });
    }

    const sortedData = useMemo(() => {

        const sorted = [...data];
        if (sortState === 'none') {
            return sorted;
        }

        sorted.sort((a: Crypto, b: Crypto) => {
            return sortState === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        });

        return sorted;
    }, [data, sortState]);

    //searched data
    const searchedData = useMemo(() => {

        if (!searchedValue.trim()) {
            return sortedData; // Return all data if search is empty
        }

        return sortedData.filter((c: Crypto) => {
            return c.name.toLowerCase().includes(searchedValue.toLowerCase()) ||
                c.symbol.toLowerCase().includes(searchedValue.toLowerCase());
        })
    }, [sortedData, searchedValue])

    /*
    const handleChange = (event: any) => {
        setItemsPerPage(event.target.value);
    };
    */
   
    // Calculate pagination
    const totalPages = Math.ceil(searchedData.length / itemsPerPage); // 10 000 / 10
    const startIndex = (currentPage - 1) * itemsPerPage; //for example, (1 - 1) * 10
    const endIndex = startIndex + itemsPerPage;
    const currentData = searchedData.slice(startIndex, endIndex);

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, 5);
            } else if (currentPage >= totalPages - 2) {
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
            }
        }

        return pages;
    };

    // prices and changes in prices formated to suit their units (shorter formation)
    const formatNumber = (num: number, decimals: number = 2) => {
        if (num >= 1e12) return `${(num / 1e12).toFixed(1)}T`;
        if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
        if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
        if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
        return num.toFixed(decimals);
    };

    // percentage change formatting
    const formatPercentage = (percent: number) => {
        const isPositive = (percent >= 0);
        const symbol = isPositive ? '▲' : '▼';
        return (
            <span className={`styles.percentage ${isPositive ? styles.positive : styles.negative}`}>
                {symbol} {Math.abs(percent).toFixed(2)}%
            </span>
        );
    };

    //max supply progress
    const getProgressPercentage = (crypto: Crypto) => {
        // Handle null/undefined values
        if (!crypto.circulating_supply || !crypto.max_supply) {
            return 0;
        }

        if (!crypto.max_supply || crypto.max_supply <= 0) {
            return 0;
        }

        const percentage = (crypto.circulating_supply / crypto.max_supply) * 100;

        // Cap at 100% and ensure it's a valid number
        return Math.min(Math.max(percentage, 0), 100);
    };

    const openNewLink = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }
    return (
        <div className="crypto-table-container">
            <div className="table-header">
                <div className="table-controls">
                    <div>
                        <span
                            onClick={() => sortData()}
                            className="control-item"> <ArrowDownNarrowWide size={20} />
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            placeholder='Search...'
                            value={searchedValue}
                            maxLength={20}
                            onChange={(e) => { setSearchedValue(e.target.value) }}
                        />
                        <span className="control-item"> <Funnel size={15} /> Price </span>
                        <span className="control-item"> <Funnel size={15} /> Market Cap</span>
                        <span className="control-item"> <Funnel size={15} /> Volume(24h)</span>
                    </div>
                </div>
            </div>
            <div className="table-wrapper">
                <table className="crypto-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>1h %</th>
                            <th>24h %</th>
                            <th>7d %</th>
                            <th>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    Market Cap
                                    <Tooltip
                                        content={
                                            <>
                                                The total market value of a cryptocurrency's circulating supply.
                                                It is analogous to the free-float capitalization in the stock market.
                                                <br /><br />
                                                <strong>Formula:</strong> Market Cap = Current Price × Circulating Supply
                                                <br /><br />
                                                <p
                                                    onClick={() => openNewLink('https://support.coinmarketcap.com/hc/en-us/articles/360043836811-Market-Capitalization-Cryptoasset-Aggregate')}
                                                    className='tooltip-link'>Read more
                                                </p>
                                            </>
                                        }
                                    >
                                        <Info size={15} className="tooltip-icon" />
                                    </Tooltip>
                                </span>
                            </th>
                            <th>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    Volume (24h)
                                    <Tooltip
                                        content={
                                            <>
                                                A measure of how much of a cryptocurrency was traded in the last 24 hours.
                                                <br /><br />
                                                <p
                                                    onClick={() => openNewLink('https://support.coinmarketcap.com/hc/en-us/articles/360043395912-Volume-Market-Pair-Cryptoasset-Exchange-Aggregate')}
                                                    className='tooltip-link'>Read more
                                                </p>
                                            </>
                                        }
                                    >
                                        <Info size={15} className="tooltip-icon" />
                                    </Tooltip>
                                </span>

                            </th>
                            <th>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    Circulating Supply
                                    <Tooltip
                                        content={
                                            <>
                                                The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market.
                                                <br /><br />
                                                <p
                                                    onClick={() => openNewLink('https://support.coinmarketcap.com/hc/en-us/articles/360043396252-Supply-Circulating-Total-Max')}
                                                    className='tooltip-link'>Read More</p>
                                            </>
                                        }
                                    >
                                        <Info size={15} className='tooltip-icon' />
                                    </Tooltip>

                                </span>

                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            currentData.map((c: Crypto, idx) => {
                                const globalIndex = startIndex + idx + 1;
                                return (
                                    <tr key={c.id}>
                                        <td><Star className={styles.rank} size={15} /></td>
                                        <td>{globalIndex}</td>
                                        <td>{c.name} <span className="secondary-text">{c.symbol}</span></td>
                                        <td className="price">R{c.quote.ZAR.price.toFixed(2)}</td>
                                        <td>{formatPercentage(c.quote.ZAR.percent_change_1h)}</td>
                                        <td>{formatPercentage(c.quote.ZAR.percent_change_24h)}</td>
                                        <td>{formatPercentage(c.quote.ZAR.percent_change_7d)}</td>
                                        <td className={styles.marketCap}>
                                            R
                                            {
                                                Math.abs(c.quote.ZAR.market_cap).toLocaleString('en-US', {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 2
                                                })
                                            }
                                            <br />
                                            <div className={styles.volumeChange}>{formatNumber(c.quote.ZAR.market_cap, 0)}</div>

                                        </td>
                                        <td className={styles.volume}>
                                            <div>
                                                R
                                                {
                                                    Math.abs(c.quote.ZAR.volume_24h).toLocaleString('en-US', {
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 2
                                                    })
                                                }</div>
                                            <div className={styles.volumeChange}>{formatNumber(c.quote.ZAR.volume_change_24h)}%</div>
                                        </td>
                                        <td className={styles.supply}>
                                            <div className={styles.supplyInfo}>

                                                <Tooltip
                                                    content={
                                                        <>
                                                            <div className={styles.percentage}>
                                                                <p>Percentage</p>
                                                                <p>{getProgressPercentage(c).toFixed(2)}%</p>
                                                            </div>

                                                            {
                                                                c.max_supply ? (
                                                                    <div className={styles.progressContainer}>
                                                                        <div className={styles.progressVisual}>
                                                                            <div className={styles.progressBarContainer}>
                                                                                <div
                                                                                    className={styles.progressBarFill}
                                                                                    style={{
                                                                                        width: `${getProgressPercentage(c)}%`
                                                                                    }}>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>) : null
                                                            }
                                                        </>
                                                    }
                                                >
                                                    <section>
                                                        <div>{formatNumber(c.circulating_supply, 2)} {c.symbol}</div>
                                                        {
                                                            c.max_supply ? (
                                                                <div className={styles.progressContainer}>
                                                                    <div className={styles.progressVisual}>
                                                                        <div className={styles.progressBarContainer}>
                                                                            <div
                                                                                className={styles.progressBarFill}
                                                                                style={{
                                                                                    width: `${getProgressPercentage(c)}%`
                                                                                }}>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>) : null
                                                        }
                                                    </section>


                                                </Tooltip>



                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div >

            {/* pagination */}
            <div className="pagination-container" >
                <div className={styles.specific}>
                    <select
                        id="pagination-dropdown"
                        value={itemsPerPage}
                        onChange={(e: any) => { setItemsPerPage(e.target.value) }}
                        className='pagination-btn'
                        style={{ display: 'flex', gap: '10px', alignContent: 'center' }}
                    >
                        <option value={10}>Show 10</option>
                        <option value={20}>Show 20</option>
                        <option value={30}>Show 30</option>
                    </select>
                </div>
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronFirst size={15} />
                    </button>
                    <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft size={15} />
                    </button>

                    {getPageNumbers().map(page => (
                        <button
                            key={page}
                            className={`btn pagination-btn ${currentPage === page ? 'active' : ''}`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight size={15} />
                    </button>
                    <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronLast size={15} />
                    </button>

                </div>
                <div className="pagination-info">
                    Showing {startIndex + 1}-{Math.min(endIndex, data.length)} of {data.length}
                </div>
            </div >
        </div >
    );
}
export default CryptoTable;