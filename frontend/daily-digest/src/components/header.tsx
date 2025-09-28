//react
import { useState } from 'react';

//components
import styles from './widget.module.css';

//models
import { Codesandbox } from 'lucide-react';

interface HeaderProps {
    heading?: string;
    subheading?: string;
}

const Header: React.FC<HeaderProps> = ({
    heading = 'Daily Digest',
    subheading = 'Your daily real-time information hub'
}) => {

    const [isMobile, setIsMobile] = useState(false);
    return (
        <div className={styles.Header}>
            <div className={styles.Center}>
                <div className={styles.Logo}>
                    <Codesandbox size={isMobile ? 28 : 35} />
                </div>
                <h2 className="primary-text">
                    {heading}
                    <br />
                    <p className="secondary-text">{subheading}</p>
                </h2>
            </div>
        </div>

    );
}
export default Header;