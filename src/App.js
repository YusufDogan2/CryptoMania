import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

// import components
import { Navbar, HomePage, Exchanges, Cryptocurrencies, CryptoDetails, News } from './components/';

function App() {
  return (
    <Router>
      <div className="app">
        <div className='navbar'>
          <Navbar />
        </div>
        <div className='main'>
          <Layout>
            <div className='routes' >
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/exchanges' element={<Exchanges />} />
                <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
                <Route path='/news' element={<News />} />
                <Route path='/crypto/:coinId' element={<CryptoDetails />} />
              </Routes>
            </div>
          </Layout>

          <div className='footer'>
            <Typography.Title level={5} style={{ color: '#efb90b', textAlign: 'center' }} >
              CryptoMania <br />
              All rights reserved
            </Typography.Title>
            <Space>
              <Link to="/" >Home</Link>
              <Link to="exchanges" >Exchanges</Link>
              <Link to="news" >News</Link>
            </Space>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
