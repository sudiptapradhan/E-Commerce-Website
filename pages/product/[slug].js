//the name of the file is inisde square brackets which means it's going to be dynamic
import React, {useState} from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
const ProductDetails = ({product, products}) => {

  //we can destructure the values of the product by
  const {image, name,details,price} = product;

  const [index, setIndex] = useState(0);
  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img src={urlFor(image && image[index])} className="product-detail-image"/>
                </div>
                <div className='small-images-container'>
                    {image?.map((item, i) => (
                        <img 
                        src={urlFor(item)}
                        className={i === index ? 'small-image selected-image' : 'small-image'}
                        onMouseEnter={() => setIndex(i)}
                        />
                    ) )}
                </div>
            </div>

            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                    <div>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiOutlineStar/>
                    </div>
                    <p>(20)</p>
                </div>
                <h4>Details: </h4>
                <p>{details}</p>
                <p className='price'>${price}</p>
                <div className='quantity'>
                    <h3>Quanity</h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick=""><AiOutlineMinus/></span>
                        <span className='num' onClick="">0</span>
                        <span className='plus' onClick=""><AiOutlinePlus/></span>
                    </p>
                </div>
                <div className='buttons'>
                    <button type='button' className='add-to-cart' onClick="">Add to Cart</button>
                    <button type='button' className='buy-now' onClick="">Buy Now</button>
                </div>
            </div>
        </div>

        <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>{products.map((item) => (
                    <Product key={item._id} product={item}/>
                ))}
                </div>
            </div>
        </div>
    </div>
  )
}


export const getStaticPaths = async() => {

    //this code below means that -- give me all the products but don't return all the data of all the products
    //just return it for the current item-
    const query = `*[_type == "product"]{
        slug{
            current
        }
    }
    `;
    const products = await client.fetch(query);

    //we have a parentheses and then a curly brace because this means we are instantly returning an object from a function.

    const paths = products.map((product) => ({
        params:{
            slug:product.slug.current
        }
    }));

    return{
        paths,
        fallback:'blocking'
    }
}

export const getStaticProps = async ({params: {slug}}) => {
    //If you export a function called getStaticProps (Static Site Generation) from a page, 
    //Next.js will pre-render this page at build time using the props returned by getStaticProps.
    
    //You should use getStaticProps if:

    //-----The data required to render the page is available at build time ahead of a user’s request
    //-----The data comes from a headless CMS
    
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'
    
    const product = await client.fetch(query);
    //the above line is gonna fetch the individual product
    const products = await client.fetch(productsQuery);
    //the above line is gonna fetch all the products
    return {
      props: {products, product}
    }
  }

export default ProductDetails