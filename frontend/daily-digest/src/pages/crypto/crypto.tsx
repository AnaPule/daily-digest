
//react
import React, { useEffect, useState } from "react";

//components
import CryptoTable from "./cryptoTable";
import Header from "@/components/header";
import PageWidget from "@/components/page-widget";

//models
import type Crypto from "@/models/crypto";

const CryptoPage: React.FC = () => {

    const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            await fetch('http://localhost:5001/crypto')
                .then(
                    res => {
                        return res.json()
                        //console.log('crypto response:',res.json())
                    })
                .then(
                    (data) => {
                        //console.log('crypto response:', data.crypto)
                        setCryptoData(data.crypto)
                        //console.log('Testing', data.crypto.filter((data: Crypto) => data.name === 'Bitcoin'))
                    })
                .catch(error => console.error('Error fetching data:', error));
        }
        fetchData();
        const interval = setInterval(fetchData, 60000); // Every 1 minutes
        return () => clearInterval(interval);
    }, [])

    const sortedData = cryptoData.sort((c: Crypto) => c.cmc_rank).slice(0, 6)

    const getDataPoints = (name: string) => {
        const data: Crypto[] = cryptoData.filter((c: Crypto) => c.name === name)
        const datapoints: number[] = [];
        data.map((d: Crypto) => {
            datapoints.push(d.quote.ZAR.volume_change_24h)
        })
        if (datapoints.length > 1) return datapoints;
        else
            for (let i = 0; i <= 12; i++) {
                datapoints.push(Math.random())
            }
        return datapoints;
    }

    return (
        <>
            <header>
                <Header
                    heading={'Crypto Markey Overview'}
                    subheading={'Stap updated on the latest cryptocurrency trends, including bitcoin dominance, altcoin season, ETF net flows, and real-time market centiment, all conveniently accessible in one place'}
                />
            </header>

            {/* stats header */}
            <section className="stats-wrapper">
                {
                    sortedData.map((c: Crypto) => (
                        <PageWidget
                            Heading={c.name}
                            Content={c.quote.ZAR.price}
                            Subcontent={c.quote.ZAR.percent_change_1h}
                            isPositive={c.quote.ZAR.volume_change_24h > 0 ? true : false}
                            datapoints={getDataPoints(c.name)}
                        />
                    ))
                }

                {/*
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
                */}
            </section>

            {/* table */}
            <CryptoTable
                data={cryptoData}
            />
        </>
    );
}
export default CryptoPage;