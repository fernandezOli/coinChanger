import './App.css';

import refund from './images/refund.png';
/*
import sepolia from './images/ethereum.png';
import optimism from './images/optimism.png';
import arbitrum from './images/arbitrum.png';
import base from './images/base.png';
*/
import ethereum from './images/ethereum.png';
import usdc from './images/usdc.png';
import eurc from './images/eurc.png';
import link from './images/link.png';

function App() {
    //let iconMap = [];
    //const data = [{symbol: "eth", "index": 1}, {symbol:"index", "age": 2}]
    let candyList = [];
    for (let i = 0; i < 16; i++){
        candyList.push("Edit"); //<p>{data[i].name + ", " + data[i].age + " years old"}</p>
    }

    return (
        <div className="App">
            <div className="Full-screen">
                <div className="Machine flex-container">
                    <div className="Div-left">
                        <div className="Div-view">
                            {candyList.map((candy, index) =>
                                <div key={index} className="Div-candy">
                                    <div className="Div-candy-top"></div>
                                    <div className="Div-candy-middle"></div>
                                    <div className="Div-candy-bottom"></div>
                                </div>
                            )}
                        </div>
                        <div className="Div-push">
                            <p>PUSH</p>
                        </div>
                    </div>
                    <div>
                        <div className="Div-right">
                            <button className="Cnx-button">Connect</button>
                            <p style={{ marginBottom: "5px" }}>Token</p>
                            <div className="Div-tokens">
                                <img src={ethereum} alt="ETH" width="32" height="32" className="Tokens-icon"/>
                                <img src={link} alt="usdc" width="32" height="32" className="Tokens-icon"/>
                                <img src={usdc} alt="usdc" width="32" height="32" className="Tokens-icon"/>
                                <img src={eurc} alt="eurc" width="32" height="32" className="Tokens-icon"/>
                            </div>
                            <p style={{ marginBottom: "5px" }}>Amount</p>
                            <input id="inputAmount" className="Input-amount" type="number" name="inputAmount" defaultValue="0" min="0.01" max="10.0" required />
                        </div>
                        <div style={{ marginTop: "50px" }}></div>
                        <p style={{ marginBottom: "5px", fontSize: "calc(2px + 2vmin)" }}>Coin return</p>
                            <div className="Div-refund Align-center">
                                <img src={refund} alt="refund" width="64" height="64" className="Img-refund"/>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
