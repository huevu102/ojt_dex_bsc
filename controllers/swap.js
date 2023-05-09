const { getTokenBalance } = require('../controllers/get_balance');

const Web3 = require('web3');
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');

const swapTokens = async (walletAddress, privateKey, tokenInAddress, tokenOutAddress, amountIn) => {
  const pancakeRouterABI = require('../ABI/PancakeRouterV3ABI.json');
  const tokenABI = require('../ABI/TokenABI.json');

  const pancakeRouterAddress = '0x9a489505a00cE272eAa5e07Dba6491314CaE3796';

  // create contract instances
  const pancakeRouterContract = new web3.eth.Contract(pancakeRouterABI, pancakeRouterAddress);
  const tokenContract = new web3.eth.Contract(tokenABI, tokenInAddress);

  try {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    const balanceAmount = await getTokenBalance(walletAddress, tokenInAddress);
    

    if (balanceAmount < amountIn) {
      console.log('Insufficient input token balance.');
    } else {
      const decimals = await tokenContract.methods.decimals().call();
      const swapAmount = (amountIn * (10 ** decimals)).toString();

      pancakeRouterContract.methods.swapExactTokensForTokens(
        swapAmount,
        0,
        [tokenInAddress, tokenOutAddress],
        walletAddress
      ).send({ from: walletAddress, gasLimit: 200000 })
        .then((swapReceipt) => {
        console.log('Swap transaction hash:', swapReceipt.transactionHash);
        })
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = { swapTokens };
