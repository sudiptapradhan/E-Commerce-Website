import React from 'react'
import {client} from '../lib/client';
import {Product, FooterBanner, HeroBanner} from '../components';

//in react we would have used a useEffect, called the client there and fetched the data.
//but, in case of next js to fetch data we use something known as server side props

// If you export a function called 'getServerSideProps' (Server-Side Rendering) from a page, Next.js will pre-render this page on each request using the data returned by 'getServerSideProps'.

const Home = ({products, bannerData}) => (
  
    <div>
    <HeroBanner heroBanner = {bannerData.length && bannerData[0]}/>
        
    <div className='products-heading'>
      <h2>Best Selling Products</h2>
      <p>Speakers of many variations</p>
    </div>

    <div className='products-container'>
      {products?.map((product) => product.name )
      }
    </div>

    <FooterBanner/>
    </div>
  );

  export const getServerSideProps = async () => {
    //a sanity query which says lets grab all the products from our sanity dashboard
    
    //whatever gets inside getServerSideProps that gets populated inside our function
    const query = `*[_type == "product"]`;
    const products = await client.fetch(query);

    const bannerQuery = `*[_type == "banner"]`;
    const bannerData = await client.fetch(bannerQuery);

    return {
      props: {products, bannerData}
    }
  }


export default Home;