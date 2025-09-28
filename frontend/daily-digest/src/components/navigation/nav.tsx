
//react
import { useState } from 'react';

//components
import styles from '../nav.module.css';
import { Codesandbox, Newspaper, ChartNoAxesCombined } from 'lucide-react';

interface NavbarProps {
    onSectionChange: (section: 'crypto' | 'news') => void;
    activeSection: 'crypto' | 'news';
    onCollapseChange?: (collapsed: boolean) => void;
}

const NavBar: React.FC<NavbarProps> = ({ onSectionChange, activeSection, onCollapseChange }: NavbarProps) => {

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
        const newCollapsedState = !isCollapsed;
        setIsCollapsed(newCollapsedState);
        onCollapseChange?.(newCollapsedState); // Notify parent
    };

    return (
         <>
      {/* Overlay for mobile when nav is expanded */}
      {isCollapsed && window.innerWidth <= 768 && (
        <div className={styles.overlay} onClick={toggleCollapse} />
      )}
      
      <nav className={`${styles.sidenav} ${isCollapsed ? styles.collapsed : ''}`}>
        <button 
            className={`pagination-btn ${styles.collapseButton}`}
            onClick={toggleCollapse}
            aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          >
            <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
          </button>

        <div className={styles.sidenavHeader}>
          <div className={styles.headerContent}>
            {!isCollapsed ? (
              <span>
                <Codesandbox />
                <h1>Daily Digest</h1>
                <p>Your daily information hub</p>
              </span>
            ) : (
              <div className={styles.collapsedLogo}>
                <Codesandbox />
                DD
              </div>
            )}
          </div>
        </div>
        
        <ul className={styles.navLinks}>
          <li>
            <button
              className={`${styles.navLink} ${activeSection === 'crypto' ? styles.active : ''}`}
              onClick={() => {
                onSectionChange('crypto');
                if (window.innerWidth <= 768) {
                  setIsCollapsed(true);
                }
              }}
            >
              {!isCollapsed && <span> <ChartNoAxesCombined /> Crypto</span>}
              {isCollapsed && <span className={styles.tooltip}> <ChartNoAxesCombined /> </span>}
            </button>
          </li>
          <li>
            <button
              className={`${styles.navLink} ${activeSection === 'news' ? styles.active : ''}`}
              onClick={() => {
                onSectionChange('news');
                if (window.innerWidth <= 768) {
                  setIsCollapsed(true);
                }
              }}
            >
                
              {!isCollapsed && <span> <Newspaper /> News</span>}
              {isCollapsed && <span className={styles.tooltip}><Newspaper /></span>}
            </button>
          </li>
        </ul>


          
      </nav>
    </>
    );
}

export default NavBar;