const Web3 = require('web3');
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');


const walletAddress = '0xa43d14A80881FaBDE72D97d82E0845d8CC5f09FE';
const privateKey = '45f7e9a7bfeda67843fcf90a20dc38ada4488f11e39057523bd4ced6e2132f10';

const ETHTokenAddress = '0x8BaBbB98678facC7342735486C851ABD7A0d17Ca';
const USDTTokenAddress = '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684';
const BUSDTokenAddress = '0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814';

const recipientWalletAddress = '0x48fB1fa9B7b3855bF1A221A0B2Fad8Ee25aab361';

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