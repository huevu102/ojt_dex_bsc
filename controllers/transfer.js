const Web3 = require('web3');
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');


// transfer BNB
const transferBNB = (walletAddress, recipientWalletAddress, privateKey, amountToSend) => {
  // load private key and create a wallet instance
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);

  // create transaction object
  const BNBtransaction = {
    from: walletAddress,
    to: recipientWalletAddress,
    value: web3.utils.toWei(amountToSend, 'ether'),
    gasLimit: 21000
  }

  web3.eth.sendTransaction(BNBtransaction)
    .then((receipt) => {
      console.log(`Transfered ${amountToSend} TBNB`);
      console.log(receipt);
    });
}


// transfer token
const transferToken = (walletAddress, recipientWalletAddress, tokenAddress, privateKey, amountToSend) => {
  // load private key and create a wallet instance
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);

  const transferABI = [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  
  const transferContract = new web3.eth.Contract(transferABI, tokenAddress);
  
  transferContract.methods.transfer(recipientWalletAddress, web3.utils.toWei(amountToSend))
    .send({from: walletAddress, gasLimit: 100000}, (error, result) => {
      if (error) {
          console.error(error);
      } else {
          console.log(`Transfered ${amountToSend} token`);
          console.log(result);
      }
    });
}

module.exports = { transferBNB, transferToken };
