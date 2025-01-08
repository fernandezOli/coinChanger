/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import React, { /*useContext,*/ useEffect, useState } from 'react';
import DaemonUIClass from "./daemonUIClass";

import refund from './images/refund.png';

import netSepolia from './images/ethereum.png';
import netOptimism from './images/optimism.png';
import netArbitrum from './images/arbitrum.png';
import netBase from './images/base.png';

import iconEthereum from './images/ethereum.png';
import iconUsdc from './images/usdc.png';
import iconEurc from './images/eurc.png';
import iconLink from './images/link.png';

function App() {
    let started = false;
    let networksMap = [];
    let iconMap = [];

    let tokensMap = [];
    //const [tokensMap, setTokensMap] = useState([]);
    const [candyList, setCandyList] = useState([]);
    const [candyListEx, setCandyListEx] = useState([]);

    // icons networks
    networksMap["Sepolia"] = netSepolia;
    networksMap["Optimism Sepolia"] = netOptimism;
    networksMap["Arbitrum Sepolia"] = netArbitrum;
    networksMap["Base Sepolia"] = netBase;

    // icons tokens
    iconMap["eth"] = iconEthereum;
    iconMap["usdc"] = iconUsdc;
    iconMap["eurc"] = iconEurc;
    iconMap["link"] = iconLink;

    const daemonUI = new DaemonUIClass("http://localhost:3001/");

	// Event start
	useEffect(() => {
        if (!started) loadData();
		//console.log('(useEffect) loadData');
	}, []);

    // tokens map
    tokensMap = [{symbol: "eth", title: "ETH"}, {symbol: "usdc", title: "USDC"},
                    {symbol:"eurc", title: "EURC"}, {symbol:"link", title: "LINK"}
                ]

    const loadData = async() => {
        //console.log("-- loadData --");
        started = true;
        try {
            await daemonUI.loadServer();
            // token from list
            //tokensMap2 = daemonUI.getListTokensFrom();
            // get pairsList
            let pairs = daemonUI.getFilteredPairsList(null, null, null);
            setCandyList(pairs);
            let candyDefault = [];
            if (pairs.length < 16)
                for (let i = pairs.length; i < 16; i++) candyDefault.push(0);
            setCandyListEx(candyDefault);
        } catch(error) {
            console.error('Error: ', error);
        }
    };

    const handleConnectClick = () => {
        console.log("-- handleConnectClick --");
    };

    const handleTokenClick = () => {
        console.log("-- handleTokenClick --");
    };

    const handleCandyClick = () => {
        console.log("-- handleCandyClick --");
    };

    const handlePushClick = () => {
        console.log("-- handlePushClick --");
    };

    const handleRefundClick = () => {
        console.log("-- handleRefundClick --");
    };

    return (
        <div className="App">
            <div className="Full-screen">
                <div className="Machine flex-container">
                    <div className="Div-left">
                        <div className="Div-view">
                            {candyList.map((candy, index) =>
                                <div key={index} className="Div-candy" onClick={() => handleCandyClick()}>
                                    <div className="Div-candy-top"></div>
                                    <div className="Div-candy-middle" title={candy.fromNetwork + "/" + candy.fromToken + " -> " + candy.toNetwork + "/" + candy.toToken}>
                                        <img src={networksMap[candy.fromNetwork]} alt={candy.symbol} width="16" height="16" className="Tokens-icon" />
                                        <img src={iconMap[candy.fromToken.toLowerCase()]} alt={candy.symbol} width="16" height="16" className="Tokens-icon" />
                                        <img src={networksMap[candy.toNetwork]} alt={candy.symbol} width="16" height="16" className="Tokens-icon" />
                                        <img src={iconMap[candy.toToken.toLowerCase()]} alt={candy.symbol} width="16" height="16" className="Tokens-icon" />
                                    </div>
                                    <div className="Div-candy-bottom"></div>
                                </div>
                            )}
                            {candyListEx.map((candy, index) =>
                                <div key={index} className="Div-candy">
                                    <div className="Div-candy-default"></div>
                                </div>
                            )}
                        </div>
                        <div className="Div-push">
                            <p onClick={() => handlePushClick()}>PUSH</p>
                        </div>
                    </div>
                    <div>
                        <div className="Div-right">
                            <button className="Cnx-button" onClick={() => handleConnectClick()}>Connect</button>
                            {/*<p style={{ marginBottom: "5px" }}>Token</p>*/}
                            <div className="Div-tokens">
                                {tokensMap.map((token, index) =>
                                    <img key={index} src={iconMap[token.symbol.toLowerCase()]} alt={token.symbol} title={token.symbol} width="32" height="32" className="Tokens-icon" onClick={() => handleTokenClick()} />
                                )}
                            </div>
                            {/*<p style={{ marginBottom: "5px" }}>Amount</p>*/}
                            <input id="inputAmount" className="Input-amount" type="number" name="inputAmount" defaultValue="0" min="0.01" max="10.0" required />
                        </div>
                        <div style={{ marginTop: "50px" }}></div>
                        <p style={{ marginBottom: "5px", fontSize: "calc(2px + 2vmin)" }}>Coin return</p>
                            <div className="Div-refund Align-center" onClick={() => handleRefundClick()}>
                                <img src={refund} alt="refund" width="64" height="64" className="Img-refund"/>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
