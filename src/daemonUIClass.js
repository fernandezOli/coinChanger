//import { ethers } from 'ethers';

/*
Class for UI that use deamon bridge

Usage:

import DaemonUIClass from "./daemonUIClass";

const daemonUI = new DaemonUIClass();
*/

class daemonUIClass {
	_serverAddress = "";
	_configData = null;
	_listeningNetworkName = null;
	_symbol = null;
	_networksList = null;
	_pairsList = [];

	constructor(serverAddress) {
		if (serverAddress !== undefined) this._serverAddress = serverAddress;
	}

	setServerAddress(serverAddress) {
		if (serverAddress !== undefined) this._serverAddress = serverAddress;
	}

	/// @notice load server.
	async loadServer() {
		try {
			await this.checkServeur();
			await this.loadConfig();
			this.createNetworksList();
			this.createPairsList();
		} catch(error) {
			throw error;
		}
	}

	/// @notice check server.
	async checkServeur() {
		if (this._serverAddress === null || this._serverAddress === undefined || this._serverAddress === "") {
			//console.error('[checkServeur] Invalid _serverAddress');
			throw new Error({ error: true, code: 10, message: "Error: invalid server address"});
		}
		try {
			await fetch(this._serverAddress);
		} catch(error) {
			console.error("Error, daemon not started !");
			throw error;
		}
	}

	/// @notice load configuration data from server.
	async loadConfig() {
		if (this._serverAddress === null || this._serverAddress === undefined || this._serverAddress === "") {
			//console.error('[checkServeur] Invalid _serverAddress');
			throw new Error({ error: true, code: 10, message: "Error: invalid server address"});
		}
		this._configData = null;
		try {
            const response = await fetch(this._serverAddress + "json");
            if (!response.ok) {
				throw new Error({ error: true, code: 11, message: "Error: loading configuration, Response status:" + response.status});
            }
            this._configData = await response.json();
			this._listeningNetworkName = this._configData.listeningNetwork.networkName;
			this._symbol = this._configData.listeningNetwork.symbol;
		} catch(error) {
			throw error;
		}
	}

	/// @notice create pairs list from configuration data.
	createNetworksList() {
		if (this._configData === null) {
			throw new Error({ error: true, code: 12, message: "Error: configuration not loaded"});
		}
		this._networksList = this._configData.networks;
	}

	/// @notice create pairs list from configuration data.
	createPairsList() {
		if (this._configData === null) {
			throw new Error({ error: true, code: 12, message: "Error: configuration not loaded"});
		}
		try {
			this._pairsList = [];
			const nativeTokensList = this._configData.listeningNetwork.nativeTokens;
			for (let nativeTokenIndex = 0; nativeTokenIndex < nativeTokensList.length; nativeTokenIndex++) {
				const nativeToken = nativeTokensList[nativeTokenIndex];
				// TODO: symbol of destination network
				this._pairsList.push({"fromNetwork":this._listeningNetworkName,
								"fromToken":(nativeToken.tokenName === undefined?this._symbol:nativeToken.tokenName),
								"toNetwork":nativeToken.toNetwork,
								"toToken":(nativeToken.toToken === undefined?this._symbol:nativeToken.toToken),
								"tokenIndex": nativeTokenIndex, "isNativeToken":true});
			}
			const tokensList = this._configData.tokensList;
			for (let tokenIndex = 0; tokenIndex < tokensList.length; tokenIndex++) {
                const token = tokensList[tokenIndex];
				this._pairsList.push({"fromNetwork":this._listeningNetworkName,
								"fromToken":(token.tokenName === undefined?this._symbol:token.tokenName),
								"toNetwork":token.toNetwork,
								"toToken":(token.toToken === undefined?this._symbol:token.toToken),
								"tokenIndex": tokenIndex, "isNativeToken":false});
			}
            //console.log("this._pairsList(2):",this._pairsList);
		} catch(error) {
			throw error;
		}
	}

	/// @notice get pairs list.
	getFilteredPairsList(fromToken, toNetwork, toToken) {
        //console.log("this._pairsList:",this._pairsList);
		if (this._pairsList === []) {
			throw new Error({ error: true, code: 13, message: "Error: pairs list empty"});
		}
		let listPairs = [];
        try {
			for (let pairIndex = 0; pairIndex < this._pairsList.length; pairIndex++) {
				const pair = this._pairsList[pairIndex];
				if(fromToken !== null && pair.fromToken !== fromToken) continue
				if(toNetwork !== null && pair.toNetwork !== toNetwork) continue
				if(toToken !== null && pair.toToken !== toToken) continue
				listPairs.push({ ...pair});
			}
			return listPairs;
		} catch(error) {
			throw error;
		}
	}

	/// @notice get list of tokens from.
	getListTokensFrom() {
		let listPairs = [];
        let listPairsIndex = [];
        if (this._configData.listeningNetwork.nativeTokens.length > 0) {
            listPairs.push(this._symbol);
            listPairsIndex[this._symbol] = 0;
        }
		try {
			for (let pairIndex = 0; pairIndex < this._pairsList.length; pairIndex++) {
				const pair = this._pairsList[pairIndex];
                if (listPairsIndex[pair.toToken] !== undefined) continue;
				listPairs.push(pair.toToken);
                listPairsIndex[pair.toToken] = 0;
			}
			return listPairs;
		} catch(error) {
			throw error;
		}
	}

	getListeningAddress(pair) {
		if(pair.isNativeToken) return this._configData.listeningNetwork.nativeTokens[pair.tokenIndex].listeningAddress;
		else return this._configData.listeningNetwork.tokens[pair.tokenIndex].listeningAddress;
	}

	//checkData
	//calcFees
	//getFirstValidProvider(noApi = true)
}

export default daemonUIClass;
