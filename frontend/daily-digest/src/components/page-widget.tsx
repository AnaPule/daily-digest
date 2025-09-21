
import styles from './widget.module.css';

interface WidgetProps {
    //compulsory
    Heading: string;
    Content: number;
    Subcontent: number;
    //optional
    Logo?: string;
    Subheading?: string;
    datapoints?: number[];
}

const PageWidget: React.FC<WidgetProps> = ({
    Logo,
    Heading,
    Content,
    Subcontent,
    datapoints = [],
}: WidgetProps) => {

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
    return (
        <>
            <div className="page-widget">
                {/* header */}
                <div className="widget-header">
                    {Logo ? (
                        <img src={Logo} alt="logo" className="widget-logo" />
                    ) : (
                        <div className="bitcoin-icon">₿</div>
                    )}
                    <span className="widget-title">{Heading}</span>
                </div>

                {/* content */}
                <div className="widget-content">
                    {/* prices */}
                    <div className="price-section">
                        <div className="main-price">R {Content.toFixed(2)}</div>

                        {/* line chart 
                        <div className="chart-container">
                            {datapoints.length > 0 && generateLineChart(datapoints)}
                        </div>*/}
                    </div>

                    {/* sub content */}
                    <div className={`price-change`}>
                        {formatPercentage(Subcontent)}
                    </div>

                </div> {/* end of content */}
            </div >
        </>
    );
}
export default PageWidget;