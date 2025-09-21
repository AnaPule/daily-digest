
//react
import React, { useEffect, useState } from "react";

//components
import styles from './crypto.module.css';
import CryptoTable from "./cryptoTable";
import PageWidget from "../../components/page-widget";

//models
import type Crypto from '../../models/crypto';

const CryptoPage: React.FC = () => {

    const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
    useEffect(() => {
        fetch('http://localhost:5001/crypto')
            .then(
                res => {
                    return res.json()
                    //console.log('crypto response:',res.json())
                })
            .then(
                (data) => {
                    console.log('crypto response:', data.crypto)
                    setCryptoData(data.crypto)
                })
            .catch(error => console.error('Error fetching data:', error));
    }, [])

    return (
        <>
            <h1>Crypto Markey Overview</h1>
            <p className="secondary-text">Stap updated on the latest cryptocurrency trends, including bitcoin dominance, altcoin season, ETF net flows, and real-time market centiment, all conveniently accessible in one place</p>

            {/* stats header */}
            <section className="stats-wrapper">
                <PageWidget
                    Heading={'Bitcoin'}
                    Content={'$116 890.88'}
                    Subcontent={'0.35%'}
                    isPositive={false}
                    datapoints={[100, 105, 95, 110, 120, 115, 125, 130, 120, 115, 110, 105]}
                />
                <PageWidget
                    Heading="Ethereum"
                    Content="$3,245.67"
                    Subcontent="2.14%"
                    isPositive={true}
                    datapoints={[50, 52, 48, 55, 58, 62, 65, 70, 68, 72, 75, 78]}
                />

                <PageWidget
                    Heading="AAPL"
                    Content="$182.34"
                    Subcontent="0.12%"
                    isPositive={true}
                    datapoints={[100, 102, 99, 101, 103, 100, 98, 101, 99, 100, 102, 101]}
                />

                <PageWidget
                    Heading="AAPL"
                    Content="$182.34"
                    Subcontent="0.12%"
                    isPositive={true}
                    datapoints={[100, 102, 99, 101, 103, 100, 98, 101, 99, 100, 102, 101]}
                />

                <PageWidget
                    Heading="AAPL"
                    Content="$182.34"
                    Subcontent="0.12%"
                    isPositive={true}
                    datapoints={[100, 102, 99, 101, 103, 100, 98, 101, 99, 100, 102, 101]}
                />

                <PageWidget
                    Heading="AAPL"
                    Content="$182.34"
                    Subcontent="0.12%"
                    isPositive={true}
                    datapoints={[100, 102, 99, 101, 103, 100, 98, 101, 99, 100, 102, 101]}
                />
            </section>

            {/* table */}
            <CryptoTable
                data={cryptoData}
            />
        </>
    );
}
export default CryptoPage;