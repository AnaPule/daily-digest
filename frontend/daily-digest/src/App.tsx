
import './App.css'

import CryptoPage from './pages/crypto/crypto';
import NewsDigest from './pages/general news/news-digest';
import PageTemplate from './components/page/page-template';

function App() {

  return (
    <PageTemplate>

      <CryptoPage />
      <NewsDigest />

    </PageTemplate>
  )
}

export default App
