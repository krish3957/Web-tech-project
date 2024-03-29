import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { mobile } from '../responsive';
import { AiFillDelete } from "react-icons/ai";
import { applyDiscount, removeProduct } from '../redux/cartRedux';
import { Fade, JackInTheBox } from 'react-awesome-reveal';

const Container = styled.div`
    ${mobile({ width: "100vw" })};
`

const Wrapper = styled.div`
    padding: 20px;

`

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    ${mobile({ flexDirection: "Column" })};
    justify-content: space-between;
    align-items: center;
`

const TopButton = styled.button`
    padding: 15px;
    font-weight: 600;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "white"};
    color: ${props => props.type === "filled" && "white"};
`

const Botttom = styled.div`
    display: flex;
    ${mobile({ flexDirection: "Column" })};
    width: 100%;
    justify-content: space-between;
    margin-top: 20px;
`

const TopTexts = styled.div`

`

const TopText = styled.span`
    text-decoration: underline;
    margin: 0 10px;
`

const Info = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column ;
`



const Product = styled.div`
    ${mobile({ flexDirection: "Column" })};
    display: flex;
    margin: 20px 0;
`

const ProductDetail = styled.div`
    flex: 1.5;
    display: flex;
    ${mobile({ flexDirection: "Column" })};
`

const PriceDetail = styled.div`
    flex: 1;

`

const ProductName = styled.div``

const ProductColor = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    border: 1px solid black;
`

const Image = styled.img`
    ${mobile({ width: "90vw", height: "80vh" })};
    width: 200px;
    height: 200px;
`

const Details = styled.div`
    ${mobile({ padding: "15px 0" })};
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const ProductSize = styled.div`
    
`
const ProductID = styled.div``

const ProductAmountContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 30%;
    align-items: center;
`

const ProductAmount = styled.div`
    ${mobile({ margin: "0" })};
    margin: 0 20px 0 10px;
    width: 33%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
`

const ProductPrice = styled.h1`
    font-size: 35px;
    font-weight: 300;
`

const Hr = styled.div`
    background-color: black;
    border: 1px solid black;
    opacity: 0.1;
`

const Summary = styled.div`
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 350px;
    justify-content: space-between;
    border: 1px solid lightgray;

`

const SummaryTitle = styled.h1`
    text-align: center;
`

const SummaryItem = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: ${props => props.type === "total" && 700};
`
const SummaryItemText = styled.div``

const SummaryItemPrice = styled.span``

const Button = styled.button`
    ${mobile({ width: "60vw" })};
    padding: 5px;
    font-size: 22px;
    font-weight: 500;
    width: 400px;
    background-color: ${props => props.type === "filled" ? "black" : "gray"};
    color: #fff;
`
const Input = styled.input`
    width: 80%;
    padding: 10px;
`

const Apply = styled.button`
    width: 20%;
    color: #fff ;
    font-size: 18px;
    background-color: black;
`


const Cart = () => {
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user).currentUser;
    const dispatch = useDispatch();
    const handleDelete = (product) => {
        dispatch(removeProduct(product));
    }
    const [coupon, setCoupon] = useState('');
    const [couponeffect, setCouponeffect] = useState(false);
    const handleCoupon = (e) => {
        e.preventDefault();
        if (coupon !== 'HAPPYNEWYEAR') {
            alert('Enter a valid coupon');
        }
        else {
            if (couponeffect) {
                alert('Coupon already applied');
            }
            else {
                setCouponeffect(true);
                dispatch(applyDiscount());
            }
        }
    }

    return (
        <Container>
            <Fade direction="up" triggerOnce>
                <Announcement />
            </Fade>
            <Navbar />
            <Wrapper>
                <Title>Your Bag</Title>
                <Top>
                    <Link to={'/products'}><TopButton>CONTINUE SHOPPING</TopButton></Link>
                    <TopTexts>
                        <TopText>SHOPPING BAG({cart.quantity})</TopText>
                    </TopTexts>
                    {user ? <Link to={'/address'}><Button>Checkout Now</Button></Link> : <Link to={'/login'}><Button>Checkout Now</Button></Link>}
                </Top>
                <Botttom>
                    <Info>
                        {cart.products.map((product, index) => (
                            <Product key={index}>
                                <ProductDetail>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName><b>Product: </b>{product.title}</ProductName>
                                        <ProductID><b>ID: </b>{product._id}</ProductID>
                                        <b>Color:</b><ProductColor color={product.color} />
                                        <ProductSize><b>Size: </b>{product.size}</ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <ProductAmount>Qty:{product.quantity}</ProductAmount>
                                        <AiFillDelete size={'25px'} onClick={() => handleDelete(product)} />
                                    </ProductAmountContainer>
                                    <ProductPrice>₹ {product.price}</ProductPrice>
                                </PriceDetail>
                                <Hr />
                            </Product>
                        ))}
                    </Info>
                    <JackInTheBox triggerOnce>
                        <Summary>
                            <SummaryTitle>Order Summary</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>SubTotal</SummaryItemText>
                                <SummaryItemPrice>₹{cart.total}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Shipping Charges</SummaryItemText>
                                <SummaryItemPrice>₹100</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Shipping Charges Discount</SummaryItemText>
                                <SummaryItemPrice>-₹100</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>SubTotal</SummaryItemText>
                                <SummaryItemPrice>₹{cart.total}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemPrice>₹{(couponeffect && cart.total > 500) ? cart.total - 150 : cart.total}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <Input placeholder='Apply Coupon' onChange={(e) => setCoupon(e.target.value)} />
                                <Apply onClick={handleCoupon}>Apply</Apply>
                            </SummaryItem>

                            {user ? <Link to={'/address'}><Button>Checkout Now</Button></Link> : <Link to={'/login'}><Button>Checkout Now</Button></Link>}
                        </Summary>
                    </JackInTheBox>
                </Botttom>
            </Wrapper>
            <Footer />
        </Container>
    );
}

export default Cart;
