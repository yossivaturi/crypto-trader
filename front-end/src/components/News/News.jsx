import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi'
import moment from 'moment';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const News = () => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: 12 });
    console.log(cryptoNews);
    return (
        <div>
            <h1>News</h1> 
            {cryptoNews ?
                    
                    <Row xs={1} md={4} className="g-4">
                    {cryptoNews.value.map((news, idx) => (
                        <Col>
                        <Card>
                            <Row xs={1} md={1}>
                            <h5><b>{news.name}</b></h5>
                            </Row>
                            <img src={news?.image?.thumbnail?.contentUrl} style={{height:'130px', width: '150px',display: 'block',marginLeft: 'auto', marginRight: 'auto'}} alt="CRYPTO NEWS IMAGE" /> 
                            <Card.Body>
                                
                                <Card.Text>
                                    {news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                                </Card.Text>
                                
                            </Card.Body>
                            {`Published ${moment(news.datePublished).startOf('ss').fromNow()}`}

                        </Card>
                        </Col>
                    ))}
                    </Row>
                
                // cryptoNews.value.map((news, i) => (
                //     <div style={{border: "1px solid black"}}>
                //         <a href={news.url}>Read the article</a>
                //             <img src={news?.image?.thumbnail?.contentUrl}></img>
                //             <h1>{news.name}</h1>
                //             <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                //             <h3>{`Published ${moment(news.datePublished).startOf('ss').fromNow()}`}</h3>
                //     </div>

                // ))                          
            :
            <h1>Couldnt get news</h1> 
            }
        </div>
    )
}

export default News
