
//react
import { useState, useEffect } from "react";

//components
import NavBar from "../navigation/nav";
import styles from '../nav.module.css';
import CryptoPage from "../../pages/crypto/crypto";
import DailyDigest from "../../pages/general news/news-digest";

type ActiveSection = 'crypto' | 'news';
interface PageProps {
    children: any;
}

const PageTemplate: React.FC<PageProps> = () => {

    const [activeSection, setActiveSection] = useState<ActiveSection>('crypto');
    const [, setIsMobile] = useState(window.innerWidth <= 768);
    const [, setIsNavCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderContent = () => {
    switch (activeSection) {
      case 'crypto':
        return <CryptoPage />;
      case 'news':
        return <DailyDigest />;
      default:
        return <CryptoPage />;
    }
  };

  const handleNavCollapse = (collapsed: boolean) => {
        setIsNavCollapsed(collapsed);
    };

    return (
        <div className={styles.app}>
            <NavBar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                onCollapseChange={handleNavCollapse}
            />
            <main className={styles.mainContent}>
                {renderContent()}
            </main>
        </div>
    );
}
export default PageTemplate;