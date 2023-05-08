const Web3 = require('web3');
// connect to bsc RPC URL
// const web3 = new Web3('https://bsc-dataseed.binance.org/');
// or
// var web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'));
// connect to bsc testnet RPC URL
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');

// create a new wallet
const createNewWallet = () => {
  const wallet = web3.eth.accounts.create();
  console.log(wallet);
  console.log('New wallet address:', wallet.address);
  console.log('New wallet private key:', wallet.privateKey);
}

module.exports = { createNewWallet };
