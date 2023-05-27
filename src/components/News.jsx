import { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment/moment';
//import stockImg from '../assets/demo.jpg';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: news } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 8 : 12 });
  const { data } = useGetCryptosQuery(100);
  if (!news?.value) return 'Loading...';
  return (
    <Row gutter={[24, 24]} >
      {!simplified && (
        <Col span={24} >
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins?.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {news.value.map((item, i) => (
        <Col xs={24} sm={12} lg={8} key={i} >
          <Card hoverable className='news-card' >
            <a href={item.url} target='_blank' rel="noreferrer" >
              <div className="news-image-container">
                <Title className='news-title' level={4} >{item.name}</Title>
                <img src={item?.image?.thumbnail?.contentUrl || demoImage} alt={item} />
              </div>
              <p>
                {item.description > 100 ? `${item.description.subString(0, 100)}...` : item.description
                }
              </p>
              <div className='provider-container' >
                <div>
                  <Avatar src={item.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                  <Text className='provider-name' >{item.provider[0]?.name} </Text>
                </div>
                <Text> {moment(item.datePublished).startOf('ss').fromNow()} </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default News;