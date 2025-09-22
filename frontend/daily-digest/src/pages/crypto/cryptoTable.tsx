

import React, { useState, useMemo } from 'react';
import styles from './crypto.module.css'
import type Crypto from '../../models/crypto';
import { Info, Star, ChevronLeft, ChevronRight, ChevronLast, ChevronFirst, ChevronDown, Funnel, ArrowDownNarrowWide } from 'lucide-react';

interface CryptoTableProps {
    data: Crypto[];
}

const CryptoTable: React.FC<CryptoTableProps> = ({ data }) => {

    const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Initial selected value

    //pagination
    const [currentPage, setCurrentPage] = useState(1);

    const handleChange = (event: any) => {
        setItemsPerPage(event.target.value);
    };

    // Calculate pagination
    const totalPages = Math.ceil(data.length / itemsPerPage); // 10 000 / 10
    const startIndex = (currentPage - 1) * itemsPerPage; //for example, (1 - 1) * 10
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

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

    return (
        <div className="crypto-table-container">
            <div className="table-header">
                <div className="table-controls">
                    <div>
                        <span className="control-item"> <ArrowDownNarrowWide size={20} /></span>
                    </div>
                    <div>
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
                                    Market Cap <Info size={15} />
                                </span>

                            </th>
                            <th>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    Volume (24h) <Info size={15} />
                                </span>

                            </th>
                            <th>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    Circulating Supply <Info size={15} />
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

                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>

            {/* pagination */}
            <div className="pagination-container">
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
            </div>
        </div>
    );
}
export default CryptoTable;