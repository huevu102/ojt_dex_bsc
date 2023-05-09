const walletAddress = 'xxxxx';
const privateKey = 'xxxxx';

const ETHTokenAddress = '0x8BaBbB98678facC7342735486C851ABD7A0d17Ca';
const USDTTokenAddress = '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684';
const BUSDTokenAddress = '0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814';

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
// transferToken(walletAddress, recipientWalletAddress, ETHTokenAddress, privateKey, '1');
// transferToken(walletAddress, recipientWalletAddress, USDTTokenAddress, privateKey, '10');
// transferToken(walletAddress, recipientWalletAddress, BUSDTokenAddress, privateKey, '100');


// swap tokens
const { swapTokens } = require('./controllers/swap');
// swapTokens(walletAddress, privateKey, ETHTokenAddress, USDTTokenAddress, '0.01');