const Web3 = require('web3');
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
const { getTokenBalance } = require('../controllers/get_balance');


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
const transferToken = async (walletAddress, recipientWalletAddress, tokenAddress, privateKey, amountToSend) => {
  const tokenABI = require('../ABI/TokenABI.json');
  const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
  
  // load private key and create a wallet instance
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);

  const balanceAmount = await getTokenBalance(walletAddress, tokenAddress);    

  if (balanceAmount < amountToSend) {
    console.log('Insufficient token balance.');
  } else {
    const decimals = await tokenContract.methods.decimals().call();
    const amount = (amountToSend * (10 ** decimals)).toString();
    
    tokenContract.methods.transfer(recipientWalletAddress, amount)
      .send({from: walletAddress, gasLimit: 100000}, (error, result) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Transfer transaction hash: ${result}`);
        }
      });
  } 
}

module.exports = { transferBNB, transferToken };
