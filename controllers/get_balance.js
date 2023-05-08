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
  const getTokenBalance = (walletAddress, tokenAddress) => {
    const balanceOfABI = [
      {
        "constant": true,
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ];
    
    const contract = new web3.eth.Contract(balanceOfABI, tokenAddress);
    const result = contract.methods.balanceOf(walletAddress).call()
    // .then((result) => {
    //   console.log(`Token balance: ${web3.utils.fromWei(result, 'ether')}`);
    // });
    return result
  }

module.exports = { getBNBBalance, getTokenBalance };