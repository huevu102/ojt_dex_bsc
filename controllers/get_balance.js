const Web3 = require('web3');
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
  
  // get assets info from a wallet (BNB/TBNB, token)
  // get balance of BNB/TBNB
  const getBNBBalance = (walletAddress) => {
    web3.eth.getBalance(walletAddress, (error, balance) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`TBNB Balance: ${web3.utils.fromWei(balance, 'ether')}`);
      }
    });
  };
  
  // get balance of token (BEP20)
  const getTokenBalance = async (walletAddress, tokenAddress) => {
    const tokenABI = require('../ABI/TokenABI.json');
    
    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
    const balance = await tokenContract.methods.balanceOf(walletAddress).call();

    //get decimals value
    const decimals = await tokenContract.methods.decimals().call();

    const result = balance / 10 ** decimals;
    return result;
  }

module.exports = { getBNBBalance, getTokenBalance };
