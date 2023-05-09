const Web3 = require('web3');
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');


const walletAddress = 'xxxxx';
const privateKey = 'xxxxx';

const ETHTokenAddress = 'xxxxx';
const USDTTokenAddress = 'xxxxx';
const BUSDTokenAddress = 'xxxxx';

const recipientWalletAddress = 'xxxxx';

// create new wallet
const { createNewWallet } = require('./controllers/create_new_wallet');
// createNewWallet();


// get assets balance
const { getBNBBalance, getTokenBalance } = require('./controllers/get_balance');
// tBNB balance
getBNBBalance(walletAddress);
// ETH balance
getTokenBalance(walletAddress, ETHTokenAddress)
  .then((result) => {
    console.log(`ETH balance: ${result}`)  
  });
// USDT balance
getTokenBalance(walletAddress, USDTTokenAddress)
  .then((result) => {
    console.log(`USDT balance: ${result}`)
  });
// BUSD balance
getTokenBalance(walletAddress, BUSDTokenAddress)
  .then((result) => {
    console.log(`BUSD balance: ${result}`)
  });

// transfer
const { transferBNB, transferToken } = require('./controllers/transfer');
// transferBNB(walletAddress, recipientWalletAddress, privateKey, '0.001');
// transferToken(walletAddress, recipientWalletAddress, ETHTokenAddress, privateKey, '0.1');
// transferToken(walletAddress, recipientWalletAddress, USDTTokenAddress, privateKey, '10');
// transferToken(walletAddress, recipientWalletAddress, BUSDTokenAddress, privateKey, '100');


// swap tokens
const { swapTokens } = require('./controllers/swap');
// swapTokens(walletAddress, privateKey, ETHTokenAddress, USDTTokenAddress, '0.01');