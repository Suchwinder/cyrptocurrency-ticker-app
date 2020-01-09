import React, { Component } from 'react';
import './Tickers.css';
import Cryptocurrency from './Cryptocurrency';
import axios from 'axios';


class Tickers extends Component{
    constructor(props){
        super(props);
        this.state = { //our instance of Tickers will contain an array of objects and each object represents cryptocurrency
            data: [
                {
                    id: "bitcoin",
                    name: "Bitcoin",
                    symbol: "BTC",
                    price_usd: "1",
                    percent_change_1h: "0",
                    percent_change_24h: "0",
                    percent_change_7d: "0",
                },
                {
                    id: "ethereum",
                    name: "Ethereum",
                    symbol: "ETH",
                    price_usd: "1",
                    percent_change_1h: "0",
                    percent_change_24h: "0",
                    percent_change_7d: "0",
                },
                {
                    id: "litecoin",
                    name: "Litecoin",
                    symbol: "LTC",
                    price_usd: "1",
                    percent_change_1h: "0",
                    percent_change_24h: "0",
                    percent_change_7d: "0",
                }
            ]
        };
    }

    componentDidMount(){
        this.fetchCrytpocurrencyData();
        this.interval = setInterval(()=> this.fetchCrytpocurrencyData(), 60 * 1000)
    }

    fetchCrytpocurrencyData() {
        axios.get("https://api.coinmarketcap.com/v1/ticker/?limit=10")
        .then(response=>{
            var wanted = ["bitcoin", "ethereum", "litecoin"];
            var result = response.data.filter(currency => wanted.includes(currency.id));
            this.setState({data:result});
        })
        .catch(err=>console.log(err));
    }

    render(){
        
        var tickers = this.state.data.map((currency) => 
            <Cryptocurrency data = {currency} key = {currency.id}/>
        );
         return (
            <div className = "tickers-container">
                <ul className = "tickers">{tickers}</ul>
                <p>Information updated every minute courtesy of coinmarketcap.com</p>
            </div>
        );
    }
}

export default Tickers;