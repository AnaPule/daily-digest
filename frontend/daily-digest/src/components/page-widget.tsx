
import logo from '../assets/react.svg';

interface WidgetProps {
    //compulsory
    Heading: string;
    Content: string;
    Subcontent: string;
    //optional
    Logo?: string;
    Subheading?: string;
    datapoints?: number[];
    isPositive?: boolean;
}

const PageWidget: React.FC<WidgetProps> = ({
    Logo,
    Heading,
    Content,
    Subcontent,
    datapoints = [],
    isPositive = false
}: WidgetProps) => {

    // Simple SVG line chart generator
    const generateLineChart = (data: number[]) => {
        if (data.length < 2) return null;

        const width = 80;
        const height = 30;
        const padding = 2;

        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min || 1;

        const points = data.map((value, index) => {
            const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
            const y = height - padding - ((value - min) / range) * (height - 2 * padding);
            return `${x},${y}`;
        }).join(' ');

        return (
            <svg width={width} height={height} className="line-chart">
                <polyline
                    points={points}
                    fill="none"
                    stroke={isPositive ? "#22c55e" : "#ef4444"}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
            </svg>
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
                        <div className="main-price">{Content}</div>

                        {/* line chart */}
                        <div className="chart-container">
                            {datapoints.length > 0 && generateLineChart(datapoints)}
                        </div>
                    </div>

                    {/* sub content */}
                    <div className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
                        <span className="change-indicator">
                            {isPositive ? '▲' : '▼'}
                        </span>
                        {Subcontent}
                    </div>

                </div> {/* end of content */}
            </div >
        </>
    );
}
export default PageWidget;