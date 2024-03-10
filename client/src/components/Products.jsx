import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import { mobile } from '../responsive';
import axios from 'axios';

const Container = styled.div`
    ${mobile({ width: "94vw",padding:"0" ,marging:0,flexWrap:"wrap"})};
    display: flex;
    width: calc(100vw-40px);
    justify-content: space-between;
    padding: 20px;
    flex-wrap: wrap;

`
const Products = ({ cat, filters, sort }) => {

    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}` : "http://localhost:5000/api/products");
                setProducts(res.data);

            }
            catch (err) {

            }
        }
        getProducts();
    }, [cat]);

     useEffect(() => {
        cat && setFilterProducts(
            products.filter((item) =>
                Object.entries(filters).every(([key, value]) =>
                    item[key].includes(value)
                )
            )
        )

    }, [products,cat, filters])

    useEffect(() => {
        if ((sort === "newest")) {
            const a = filterProducts;
            setFilterProducts(a.sort((x, y) => x.createdAt - y.createdAt))
        } else if ((sort === "asc")) {
            const a = filterProducts;
            setFilterProducts(a.sort((x, y) => x.price - y.price))
        } else {
            const a = filterProducts;
            setFilterProducts(a.sort((x, y) => y.price - x.price))
        }
    }, [filterProducts, sort]);

    return (
        <Container>
            <header style={{width:"100%",textAlign:"center",fontSize:"28px",lineHeight:'40px',fontWeight:"900",marginBottom:"20px",color:'darkblue',marginLeft:'20px'}}>Class Of '23</header>
            {cat ? filterProducts.map((item,index) => (
                <Product key={index} item={item} />
            )):products.map((item,index) => (
                <Product key={index} item={item} />
            ))
            }
        </Container>
    );

}
export default Products;

