import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
    width: 98vw;
`

const Header = styled.div`
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Title = styled.h1`

`
const Content = styled.div`
    ${mobile({maxWidth:"90vw",margin:"2vh 5vw"})};
    background-color: #F8F8F8;
    max-width: 60vw;
    padding: 1vh 1vw;
    margin: 2vh 19vw;
    display: flex;
    flex-direction: column;
    
`

const P = styled.p`
    font-size: 20px;
    margin: 0;
    
`
const Br = styled.br`
    height:10px;
`
const Privacy = () => {
    return (
        <Container>
            <Header>
                <Title>
                    Privacy Policy
                </Title>
            </Header>
            <Content>
                <P>THIS PRIVACY POLICY DESCRIBES OUR POLICIES AND PROCEDURES ON THE COLLECTION, USE, AND DISCLOSURE OF YOUR INFORMATION WHEN YOU USE THE SERVICE AND TELLS YOU ABOUT YOUR PRIVACY RIGHTS AND HOW THE LAW PROTECTS YOU.</P>
                <Br></Br>
                <P>WE USE YOUR PERSONAL DATA TO PROVIDE AND IMPROVE THE SERVICE. BY USING THE SERVICE, YOU AGREE TO THE COLLECTION AND USE OF INFORMATION IN ACCORDANCE WITH THIS PRIVACY POLICY. FOR THE PURPOSES OF THIS PRIVACY POLICY:</P>
                <Br></Br>
                <P>ACCOUNT MEANS A UNIQUE ACCOUNT CREATED FOR YOU TO ACCESS OUR SERVICE OR PARTS OF OUR SERVICE.</P>
                <Br></Br>
                <P>COMPANY (REFERRED TO AS EITHER “THE COMPANY”, “WE”, “US”, OR “OUR” IN THIS AGREEMENT) REFERS TO RIPOFF.</P>
                <Br></Br>
                <P>COOKIES ARE SMALL FILES THAT ARE PLACED ON YOUR COMPUTER, MOBILE DEVICE, OR ANY OTHER DEVICE BY A WEBSITE, CONTAINING THE DETAILS OF YOUR BROWSING HISTORY ON THAT WEBSITE AMONG ITS MANY USES.</P>
                <Br></Br>
                <P>COUNTRY REFERS TO: GUJARAT, INDIA.</P>
                <Br/>
                <P>SERVICE REFERS TO THE WEBSITE.</P>
                <Br/>
                <P>USAGE DATA REFERS TO DATA COLLECTED AUTOMATICALLY, EITHER GENERATED BY THE USE OF THE SERVICE OR FROM THE SERVICE INFRASTRUCTURE ITSELF (FOR EXAMPLE, THE DURATION OF A PAGE VISIT).</P>
                <Br/>
                <P>WHILE USING OUR SERVICE, WE MAY ASK YOU TO PROVIDE US WITH CERTAIN PERSONALLY IDENTIFIABLE INFORMATION THAT CAN BE USED TO CONTACT OR IDENTIFY YOU. PERSONALLY, IDENTIFIABLE INFORMATION MAY INCLUDE BUT IS NOT LIMITED TO: EMAIL ADDRESS, FIRST NAME AND LAST NAME, PHONE NUMBER; ADDRESS, STATE, PROVINCE, ZIP/POSTAL CODE, AND CITY.</P>
                <Br/>
                <P>WE WILL NOT SELL, DISTRIBUTE OR LEASE YOUR PERSONAL INFORMATION TO THIRD PARTIES UNLESS WE HAVE YOUR PERMISSION OR ARE REQUIRED BY LAW TO DO SO. IF YOU BELIEVE THAT ANY INFORMATION WE ARE HOLDING ON YOU IS INCORRECT OR INCOMPLETE, PLEASE WRITE OR EMAIL US AS SOON AS POSSIBLE, USING THE ADDRESS</P>
                <Br/>
            </Content>
        </Container>
    );
}

export default Privacy;
