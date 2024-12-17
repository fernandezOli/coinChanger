import './App.css';
/*
import sepolia from './images/ethereum.png';
import optimism from './images/optimism.png';
import arbitrum from './images/arbitrum.png';
import base from './images/base.png';
*/
import ethereum from './images/ethereum.png';
import usdc from './images/usdc.png';
import eurc from './images/eurc.png';

function App() {
    //let iconMap = [];

    return (
        <div className="App">
            <div className="Full-screen">
                <div className="Machine flex-container">
                    <div className="Div-left">
                        <div className="Div-view">
                            <p>Edit and save to reload.</p>
                            <p>Edit and save to reload.</p>
                            <p>Edit and save to reload.</p>
                            <p>Edit and save to reload.</p>
                        </div>
                        <div className="Div-push">
                            <p>PUSH</p>
                        </div>
                    </div>
                    <div>
                        <div className="Div-right">
                            <button>Connect</button>
                            <p style={{ marginBottom: "5px" }}>Token choice</p>
                            <div className="Div-tokens">
                                <img src={ethereum} alt="ETH" width="16" height="16" style={{ cursor: "pointer" }}/>
                                <img src={usdc} alt="usdc" width="16" height="16" style={{ cursor: "pointer" }}/>
                                <img src={eurc} alt="eurc" width="16" height="16" style={{ cursor: "pointer" }}/>
                            </div>
                            <p style={{ marginBottom: "5px" }}>Insert coin</p>
                            <input id="inputAmount" className="Input-amount" type="number" name="inputAmount" defaultValue="0" min="0.01" max="10.0" required />
                        </div>
                        <div style={{ marginTop: "50px" }}></div>
                        <p style={{ marginLeft: "10px", marginRight: "20px", marginBottom: "5px" }}>Coin return</p>
                        <div className="Div-right" style={{ marginTop: "5px" }}>
                            <div className="Div-Refund">
                                <p>Refund</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
