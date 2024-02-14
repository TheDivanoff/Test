// https://mainnet.infura.io/v3/03d4d51e98fb4bb0bc09716aeaae71f1

const { clear } = require('console');
const { getAddress } = require('ethers');
const fs = require('fs');
const { setBalance } = require("@nomicfoundation/hardhat-network-helpers");
const { dropTransaction } = require("@nomicfoundation/hardhat-network-helpers");

const routerABI = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

const erc20ABI = [
    {
      "inputs": [
        {"internalType": "address", "name": "account", "type": "address"}
      ],
      "name": "balanceOf",
      "outputs": [
        {"internalType": "uint256", "name": "", "type": "uint256"}
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "address", "name": "spender", "type": "address"},
        {"internalType": "uint256", "name": "amount", "type": "uint256"}
      ],
      "name": "approve",
      "outputs": [
        {"internalType": "bool", "name": "", "type": "bool"}
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "address", "name": "to", "type": "address"},
        {"internalType": "uint256", "name": "amount", "type": "uint256"}
      ],
      "name": "transfer",
      "outputs": [
        {"internalType": "bool", "name": "", "type": "bool"}
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {"internalType": "uint256", "name": "", "type": "uint256"}
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {"internalType": "uint8", "name": "", "type": "uint8"}
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
        "inputs": [],
        "name": "getOwner",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

const simABI = [{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"base","type":"address"}],"name":"failedResponse","outputs":[{"components":[{"internalType":"bool","name":"isHoneyPot","type":"bool"},{"internalType":"address","name":"base","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"estimatedBuy","type":"uint256"},{"internalType":"uint256","name":"buyAmount","type":"uint256"},{"internalType":"uint256","name":"estimatedSell","type":"uint256"},{"internalType":"uint256","name":"sellAmount","type":"uint256"},{"internalType":"uint256","name":"buyGas","type":"uint256"},{"internalType":"uint256","name":"sellGas","type":"uint256"}],"internalType":"struct HoneyPotChecker.HoneyPot","name":"","type":"tuple"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"router","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"bool","name":"success","type":"bool"},{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"router","type":"address"},{"internalType":"address","name":"base","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"isHoneyPot","outputs":[{"components":[{"internalType":"bool","name":"isHoneyPot","type":"bool"},{"internalType":"address","name":"base","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"estimatedBuy","type":"uint256"},{"internalType":"uint256","name":"buyAmount","type":"uint256"},{"internalType":"uint256","name":"estimatedSell","type":"uint256"},{"internalType":"uint256","name":"sellAmount","type":"uint256"},{"internalType":"uint256","name":"buyGas","type":"uint256"},{"internalType":"uint256","name":"sellGas","type":"uint256"}],"internalType":"struct HoneyPotChecker.HoneyPot","name":"","type":"tuple"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"router","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"swap","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"swapBase","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"payable","type":"function"}]

const simAddress = "0x73DF7181D03e3CE3025eaE96C1bc1965897992a7"

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const configFile = fs.readFileSync('config.json');
const config = JSON.parse(configFile);

const prompt = require("prompt-sync")({ sigint: true });

let ethReceived = 0

const { ethers, network } = require("hardhat");
const swapBuyer = "0x513b6836FBf21311B085091206b6CBA7CEd91699"
const transferSender = "0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf"
const transferRecipient = "0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa"
const maxTxWallet = "0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8"
const simDeployWallet = "0x868daB0b8E21EC0a48b726A1ccf25826c78C6d7F"
const deadAddress = "0x000000000000000000000000000000000000dead"

const wethAddress = config.weth
const routerAddress = config.router
const tokenAddress = prompt("Enter The Token To Sim: ");

let canBuy = true;
let canSell = true;
let buyTxHash;
let sellTxHash;

// router liquidity
let devApproveHash;
let liquidityHash;
let launchHash;
let mainSwapHash;
let transferSwapHash;
let testTransferHash;
let sellHash;

let taxForMax;

// contract liquidity
let transferTokensHash;
let transferETHHash;

const logBalances = async () => {
    const tokenBalance = await token.balanceOf(dev)
    const balanceInTokens = Number(tokenBalance) / 10**9;
    console.log("Devs Token Balance", balanceInTokens)
}

const mainnetProvider = new ethers.getDefaultProvider("https://mainnet.infura.io/v3/03d4d51e98fb4bb0bc09716aeaae71f1");

// abi and bytecodes to deploy sim and ca sniper

const newSimABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "balanceOfRecipient",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "caSwapRecipients",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "pair",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			}
		],
		"name": "checkMaxTX",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "pair",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			}
		],
		"name": "checkMaxWallet",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "base",
				"type": "address"
			}
		],
		"name": "failedResponse",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bool",
						"name": "isHoneyPot",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "base",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "estimatedBuy",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "buyAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "estimatedSell",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sellAmount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "transferDelayOrNot",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "buyGas",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sellGas",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "canBuy",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "canSell",
						"type": "bool"
					}
				],
				"internalType": "struct HoneyPotChecker.HoneyPot",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "path",
				"type": "address[]"
			}
		],
		"name": "getAmountsOut",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "pair",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "contractSniper",
				"type": "address"
			}
		],
		"name": "isHoneyPot",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bool",
						"name": "isHoneyPot",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "base",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "estimatedBuy",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "buyAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "estimatedSell",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sellAmount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "transferDelayOrNot",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "buyGas",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sellGas",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "canBuy",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "canSell",
						"type": "bool"
					}
				],
				"internalType": "struct HoneyPotChecker.HoneyPot",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "path",
				"type": "address[]"
			}
		],
		"name": "maxSwap",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "path",
				"type": "address[]"
			}
		],
		"name": "maxTxSwap",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "recipientWallet",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "path",
				"type": "address[]"
			}
		],
		"name": "swap",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "swapBase",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "swapCountCheck",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "swapFailedAt",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "pair",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			}
		],
		"name": "testLogic",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "ca",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "testTransferDelayExternal",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "token",
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
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "pair",
				"type": "address"
			}
		],
		"name": "transferTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	}
]
const newSimBytecode = "608060405273571275f0cf0bcb34df9786d821a52151f1e2da846000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040518060200160405280733bb28f1e321f8cdad051a7f00567e0082ade9e0473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152506001906001620000b9929190620001ef565b50600267ffffffffffffffff811115620000d857620000d76200037e565b5b604051908082528060200260200182016040528015620001075781602001602082028036833780820191505090505b50600c90805190602001906200011f9291906200027e565b50600267ffffffffffffffff8111156200013e576200013d6200037e565b5b6040519080825280602002602001820160405280156200016d5781602001602082028036833780820191505090505b50600d9080519060200190620001859291906200030d565b5073c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2600e60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550348015620001e857600080fd5b50620003ad565b8280548282559060005260206000209081019282156200026b579160200282015b828111156200026a5782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509160200191906001019062000210565b5b5090506200027a91906200035f565b5090565b828054828255906000526020600020908101928215620002fa579160200282015b82811115620002f95782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550916020019190600101906200029f565b5b5090506200030991906200035f565b5090565b8280548282559060005260206000209081019282156200034c579160200282015b828111156200034b5782518255916020019190600101906200032e565b5b5090506200035b91906200035f565b5090565b5b808211156200037a57600081600090555060010162000360565b5090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b613e8280620003bd6000396000f3fe60806040526004361061012a5760003560e01c806370a08231116100ab578063beabacc81161006f578063beabacc81461044d578063c11fc69e1461047d578063c9fedf28146104ae578063df331b64146104de578063e93fff951461050e578063ffd8fe241461054b5761012a565b806370a08231146103355780637e5465ba146103725780639297f96c146103a257806398483eb8146103df578063bb7b9c761461040f5761012a565b80633b5719cc116100f25780633b5719cc1461022b578063403be9bf1461026857806347e7ef24146102a557806355d82c20146102d55780637009d923146103055761012a565b8063136758fd1461012f57806316f0e8301461015a5780632a356440146101975780632e169e40146101c757806337c9d209146101f7575b600080fd5b34801561013b57600080fd5b5061014461057b565b6040516101519190613011565b60405180910390f35b34801561016657600080fd5b50610181600480360381019061017c9190613076565b61059f565b60405161018e9190613011565b60405180910390f35b6101b160048036038101906101ac9190613228565b6105de565b6040516101be91906132c6565b60405180910390f35b6101e160048036038101906101dc91906132e1565b6106f9565b6040516101ee91906132c6565b60405180910390f35b610211600480360381019061020c919061330e565b610883565b604051610222959493929190613361565b60405180910390f35b34801561023757600080fd5b50610252600480360381019061024d91906133b4565b610cde565b60405161025f9190613403565b60405180910390f35b34801561027457600080fd5b5061028f600480360381019061028a9190613076565b610df4565b60405161029c9190613403565b60405180910390f35b6102bf60048036038101906102ba919061341e565b610e0c565b6040516102cc91906132c6565b60405180910390f35b6102ef60048036038101906102ea919061330e565b610e69565b6040516102fc9190613403565b60405180910390f35b61031f600480360381019061031a919061345e565b6111b1565b60405161032c91906135e8565b60405180910390f35b34801561034157600080fd5b5061035c600480360381019061035791906132e1565b611b13565b6040516103699190613403565b60405180910390f35b61038c600480360381019061038791906133b4565b611c28565b60405161039991906132c6565b60405180910390f35b3480156103ae57600080fd5b506103c960048036038101906103c491906133b4565b611d6c565b6040516103d691906135e8565b60405180910390f35b6103f960048036038101906103f49190613228565b611e18565b60405161040691906132c6565b60405180910390f35b34801561041b57600080fd5b5061043660048036038101906104319190613604565b611f4b565b604051610444929190613673565b60405180910390f35b6104676004803603810190610462919061369c565b6120aa565b60405161047491906132c6565b60405180910390f35b6104976004803603810190610492919061345e565b6121c9565b6040516104a59291906136ef565b60405180910390f35b6104c860048036038101906104c39190613604565b612564565b6040516104d591906132c6565b60405180910390f35b6104f860048036038101906104f391906133b4565b612697565b60405161050591906132c6565b60405180910390f35b34801561051a57600080fd5b5061053560048036038101906105309190613076565b612860565b60405161054291906132c6565b60405180910390f35b6105656004803603810190610560919061330e565b612880565b6040516105729190613403565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600181815481106105af57600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000808573ffffffffffffffffffffffffffffffffffffffff1684868530603c426106099190613747565b60405160240161061d95949392919061382a565b6040516020818303038152906040527f8803dbee000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040516106a791906138f5565b6000604051808303816000865af19150503d80600081146106e4576040519150601f19603f3d011682016040523d82523d6000602084013e6106e9565b606091505b5050905080915050949350505050565b60008073c02aaa39b223fe8d0a0e5c4f27ead9083c756cc290506000737a250d5630b4cf539739df2c5dacb4c659f2488d90506000600267ffffffffffffffff811115610749576107486130e5565b5b6040519080825280602002602001820160405280156107775781602001602082028036833780820191505090505b509050828160008151811061078f5761078e61390c565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505084816001815181106107de576107dd61390c565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050600061082384611b13565b905060006108318585611c28565b9050600015158115150361084d5760009550505050505061087e565b610858848385612564565b905060001515811515036108745760009550505050505061087e565b6001955050505050505b919050565b600080600080600080600080600080808d73ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156108de573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109029190613950565b905060006103e88261091491906139ac565b9050600e60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168e73ffffffffffffffffffffffffffffffffffffffff160361097c576109758e34610e0c565b94506109e4565b6109a8600e60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1634610e0c565b600460006101000a81548160ff0219169083151502179055506109ca8e6106f9565b600460006101000a81548160ff0219169083151502179055505b6109ee8e8e611c28565b92506109f98e611b13565b6005819055508d600c600081548110610a1557610a1461390c565b5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508e600c600181548110610a7357610a7261390c565b5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610b4f8d60055483600c805480602002602001604051908101604052809291908181526020018280548015610b4557602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610afb575b5050505050611e18565b93508e600c600081548110610b6757610b6661390c565b5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508d600c600181548110610bc557610bc461390c565b5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610c178f8e611c28565b9650610c228f611b13565b600781905550610cbb8d600754600c805480602002602001604051908101604052809291908181526020018280548015610cb157602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610c67575b5050505050612564565b955083878787869b509b509b509b509b5050505050505050939792965093509350565b6000808373ffffffffffffffffffffffffffffffffffffffff1683604051602401610d099190613011565b6040516020818303038152906040527f70a08231000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610d9391906138f5565b600060405180830381855afa9150503d8060008114610dce576040519150601f19603f3d011682016040523d82523d6000602084013e610dd3565b606091505b5091505080806020019051810190610deb9190613950565b91505092915050565b60026020528060005260406000206000915090505481565b60007fd0e30db0000000000000000000000000000000000000000000000000000000006000526000806004600085875af18060008114610e535760018114610e5c57610e61565b60009250610e61565b600192505b505092915050565b6000806000806101f4905060008773ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ec1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ee59190613950565b9050600061271082610ef791906139ac565b9050600e60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff1603610f7657610f588834610e0c565b600460006101000a81548160ff021916908315150217905550610fde565b610fa2600e60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1634610e0c565b600460006101000a81548160ff021916908315150217905550610fc4886106f9565b600460006101000a81548160ff0219169083151502179055505b610fe88888611c28565b600460006101000a81548160ff02191690831515021790555061100a88611b13565b60058190555087600c6000815481106110265761102561390c565b5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555088600c6001815481106110845761108361390c565b5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060005b838110156111a15761116b8860055484600c80548060200260200160405190810160405280929190818152602001828054801561116157602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611117575b50505050506105de565b95508515611187576001856111809190613747565b945061118e565b85156111a1575b8080611199906139dd565b9150506110cf565b5083955050505050509392505050565b6111b9612f3b565b6111c1612f3b565b6000806003346111d191906139ac565b90506111de858783612d71565b9150600e60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff160361128f5761123f8782610e0c565b600460006101000a81548160ff02191690831515021790555060001515600460009054906101000a900460ff1615150361128a5761127d8688611d6c565b9250829350505050611b0b565b61135b565b6112bb600e60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682610e0c565b600460006101000a81548160ff02191690831515021790555060001515600460009054906101000a900460ff16151503611306576112f98688611d6c565b9250829350505050611b0b565b61130f876106f9565b600460006101000a81548160ff02191690831515021790555060001515600460009054906101000a900460ff1615150361135a5761134d8688611d6c565b9250829350505050611b0b565b5b6113658789611c28565b600460006101000a81548160ff02191690831515021790555061138787611b13565b60058190555086600c6000815481106113a3576113a261390c565b5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085600c6001815481106114015761140061390c565b5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506114dc88600554600c8054806020026020016040519081016040528092919081815260200182805480156114d257602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611488575b5050505050611f4b565b600460006006600084919050558391906101000a81548160ff021916908315150217905550505060001515600460009054906101000a900460ff161515036115275760006006819055505b5a600d60008154811061153d5761153c61390c565b5b90600052602060002001819055506115de88600554600c8054806020026020016040519081016040528092919081815260200182805480156115d457602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001906001019080831161158a575b5050505050612564565b600460006101000a81548160ff02191690831515021790555060001515600460009054906101000a900460ff1615150361163a576000600e60146101000a81548160ff02191690831515021790555060006007819055506116b3565b5a600d6000815481106116505761164f61390c565b5b90600052602060002001546116659190613a25565b600d60008154811061167a5761167961390c565b5b906000526020600020018190555061169186611b13565b6007819055506001600e60146101000a81548160ff0219169083151502179055505b85600c6000815481106116c9576116c861390c565b5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555086600c6001815481106117275761172661390c565b5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506117798689611c28565b600460006101000a81548160ff02191690831515021790555061182588600754600c80548060200260200160405190810160405280929190818152602001828054801561181b57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116117d1575b5050505050611f4b565b600460006009600084919050558391906101000a81548160ff021916908315150217905550505060001515600460009054906101000a900460ff1615150361188b5760006009819055506000600e60156101000a81548160ff0219169083151502179055505b5a600d6001815481106118a1576118a061390c565b5b906000526020600020018190555061194288600754600c80548060200260200160405190810160405280929190818152602001828054801561193857602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116118ee575b5050505050612564565b600460006101000a81548160ff02191690831515021790555060001515600460009054906101000a900460ff1615150361199e5760006008819055506000600e60156101000a81548160ff021916908315150217905550611a17565b5a600d6001815481106119b4576119b361390c565b5b90600052602060002001546119c99190613a25565b600d6001815481106119de576119dd61390c565b5b90600052602060002001819055506119f587611b13565b6008819055506001600e60156101000a81548160ff0219169083151502179055505b6040518061018001604052806000151581526020018873ffffffffffffffffffffffffffffffffffffffff1681526020018773ffffffffffffffffffffffffffffffffffffffff16815260200160065481526020016007548152602001600954815260200160085481526020018315158152602001600d600081548110611aa157611aa061390c565b5b90600052602060002001548152602001600d600181548110611ac657611ac561390c565b5b90600052602060002001548152602001600e60149054906101000a900460ff1615158152602001600e60159054906101000a900460ff16151581525092508293505050505b949350505050565b6000808273ffffffffffffffffffffffffffffffffffffffff1630604051602401611b3e9190613011565b6040516020818303038152906040527f70a08231000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051611bc891906138f5565b600060405180830381855afa9150503d8060008114611c03576040519150601f19603f3d011682016040523d82523d6000602084013e611c08565b606091505b5091505080806020019051810190611c209190613950565b915050919050565b6000807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90508373ffffffffffffffffffffffffffffffffffffffff168382604051602401611c78929190613a59565b6040516020818303038152906040527f095ea7b3000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051611d0291906138f5565b6000604051808303816000865af19150503d8060008114611d3f576040519150601f19603f3d011682016040523d82523d6000602084013e611d44565b606091505b5050809250506000151582151503611d60576000915050611d66565b60019150505b92915050565b611d74612f3b565b611d7c612f3b565b6040518061018001604052806001151581526020018473ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600081526020016000815260200160001515815260200160008152602001600081526020016000151581526020016000151581525090508091505092915050565b6000808573ffffffffffffffffffffffffffffffffffffffff1684868530603c42611e439190613747565b604051602401611e5795949392919061382a565b6040516020818303038152906040527f8803dbee000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051611ee191906138f5565b6000604051808303816000865af19150503d8060008114611f1e576040519150601f19603f3d011682016040523d82523d6000602084013e611f23565b606091505b505090506000151581151503611f3d576000915050611f43565b60019150505b949350505050565b6000806000808673ffffffffffffffffffffffffffffffffffffffff168686604051602401611f7b929190613a82565b6040516020818303038152906040527fd06ca61f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505060405161200591906138f5565b600060405180830381855afa9150503d8060008114612040576040519150601f19603f3d011682016040523d82523d6000602084013e612045565b606091505b50915091506000151582151503612064576000809350935050506120a2565b60008180602001905181019061207a9190613b75565b90506001816001815181106120925761209161390c565b5b6020026020010151945094505050505b935093915050565b60008273ffffffffffffffffffffffffffffffffffffffff1684836040516024016120d6929190613a59565b6040516020818303038152906040527fa9059cbb000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505060405161216091906138f5565b6000604051808303816000865af19150503d806000811461219d576040519150601f19603f3d011682016040523d82523d6000602084013e6121a2565b606091505b50508091505060001515811515036121bd57600090506121c2565b600190505b9392505050565b600080600e60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361225c5761222b8334610e0c565b600460006101000a81548160ff02191690831515021790555060001515600460009054906101000a905050506122ea565b612288600e60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1634610e0c565b600460006101000a81548160ff02191690831515021790555060001515600460009054906101000a905050506122bd836106f9565b600460006101000a81548160ff02191690831515021790555060001515600460009054906101000a905050505b6122f48385611c28565b600460006101000a81548160ff02191690831515021790555061231683611b13565b60058190555082600c6000815481106123325761233161390c565b5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085600c6001815481106123905761238f61390c565b5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061246b84600554600c80548060200260200160405190810160405280929190818152602001828054801561246157602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311612417575b5050505050612564565b600460006101000a81548160ff02191690831515021790555060001515600460009054906101000a900460ff161515036124a8576000600a819055505b6124b186611b13565b600a819055506124e460008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1687600a546120aa565b600460006101000a81548160ff02191690831515021790555060001515600460009054906101000a900460ff16151503612521576000600b819055505b61254b8660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610cde565b600b81905550600a54600b549150915094509492505050565b6000808473ffffffffffffffffffffffffffffffffffffffff168460018530603c426125909190613747565b6040516024016125a4959493929190613c10565b6040516020818303038152906040527f5c11d795000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505060405161262e91906138f5565b6000604051808303816000865af19150503d806000811461266b576040519150601f19603f3d011682016040523d82523d6000602084013e612670565b606091505b50509050600015158115150361268a576000915050612690565b60019150505b9392505050565b6000806002346126a791906139ac565b905060008473ffffffffffffffffffffffffffffffffffffffff16346040516126cf90613c90565b60006040518083038185875af1925050503d806000811461270c576040519150601f19603f3d011682016040523d82523d6000602084013e612711565b606091505b5050905080612755576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161274c90613d02565b60405180910390fd5b60008573ffffffffffffffffffffffffffffffffffffffff168584600160405160240161278493929190613e0e565b6040516020818303038152906040527f10000000000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505060405161280e91906138f5565b6000604051808303816000865af19150503d806000811461284b576040519150601f19603f3d011682016040523d82523d6000602084013e612850565b606091505b5050905080935050505092915050565b60036020528060005260406000206000915054906101000a900460ff1681565b6000808473ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156128ce573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128f29190613950565b90506000806000905060008390506000600282846129109190613747565b61291a91906139ac565b90506000600e60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff160361299b5761297d8934610e0c565b600460006101000a81548160ff021916908315150217905550612a03565b6129c7600e60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1634610e0c565b600460006101000a81548160ff0219169083151502179055506129e9896106f9565b600460006101000a81548160ff0219169083151502179055505b612a0d8989611c28565b600460006101000a81548160ff021916908315150217905550612a2f89611b13565b60058190555088600c600081548110612a4b57612a4a61390c565b5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555089600c600181548110612aa957612aa861390c565b5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b82841015612d615780612b1357600182612b0c9190613a25565b9250612b23565b600182612b209190613747565b93505b60028385612b319190613747565b612b3b91906139ac565b9150612bd18860055484600c805480602002602001604051908101604052809291908181526020018280548015612bc757602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311612b7d575b5050505050611e18565b9050612bdc8a611b13565b94508015612d535789600c600081548110612bfa57612bf961390c565b5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555088600c600181548110612c5857612c5761390c565b5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550612caa8a89611c28565b50612cb48a611b13565b600781905550612d4d88600754600c805480602002602001604051908101604052809291908181526020018280548015612d4357602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311612cf9575b5050505050612564565b50612d5c565b60009050612af2565b612af2565b8196505050505050509392505050565b600080600283612d8191906139ac565b905060008573ffffffffffffffffffffffffffffffffffffffff1684604051612da990613c90565b60006040518083038185875af1925050503d8060008114612de6576040519150601f19603f3d011682016040523d82523d6000602084013e612deb565b606091505b5050905080612e2f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612e2690613d02565b60405180910390fd5b60008673ffffffffffffffffffffffffffffffffffffffff1686846001604051602401612e5e93929190613e0e565b6040516020818303038152906040527f10000000000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051612ee891906138f5565b6000604051808303816000865af19150503d8060008114612f25576040519150601f19603f3d011682016040523d82523d6000602084013e612f2a565b606091505b505090508093505050509392505050565b604051806101800160405280600015158152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600081526020016000815260200160001515815260200160008152602001600081526020016000151581526020016000151581525090565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000612ffb82612fd0565b9050919050565b61300b81612ff0565b82525050565b60006020820190506130266000830184613002565b92915050565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61305381613040565b811461305e57600080fd5b50565b6000813590506130708161304a565b92915050565b60006020828403121561308c5761308b613036565b5b600061309a84828501613061565b91505092915050565b6130ac81612ff0565b81146130b757600080fd5b50565b6000813590506130c9816130a3565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61311d826130d4565b810181811067ffffffffffffffff8211171561313c5761313b6130e5565b5b80604052505050565b600061314f61302c565b905061315b8282613114565b919050565b600067ffffffffffffffff82111561317b5761317a6130e5565b5b602082029050602081019050919050565b600080fd5b60006131a461319f84613160565b613145565b905080838252602082019050602084028301858111156131c7576131c661318c565b5b835b818110156131f057806131dc88826130ba565b8452602084019350506020810190506131c9565b5050509392505050565b600082601f83011261320f5761320e6130cf565b5b813561321f848260208601613191565b91505092915050565b6000806000806080858703121561324257613241613036565b5b6000613250878288016130ba565b945050602061326187828801613061565b935050604061327287828801613061565b925050606085013567ffffffffffffffff8111156132935761329261303b565b5b61329f878288016131fa565b91505092959194509250565b60008115159050919050565b6132c0816132ab565b82525050565b60006020820190506132db60008301846132b7565b92915050565b6000602082840312156132f7576132f6613036565b5b6000613305848285016130ba565b91505092915050565b60008060006060848603121561332757613326613036565b5b6000613335868287016130ba565b9350506020613346868287016130ba565b9250506040613357868287016130ba565b9150509250925092565b600060a08201905061337660008301886132b7565b61338360208301876132b7565b61339060408301866132b7565b61339d60608301856132b7565b6133aa60808301846132b7565b9695505050505050565b600080604083850312156133cb576133ca613036565b5b60006133d9858286016130ba565b92505060206133ea858286016130ba565b9150509250929050565b6133fd81613040565b82525050565b600060208201905061341860008301846133f4565b92915050565b6000806040838503121561343557613434613036565b5b6000613443858286016130ba565b925050602061345485828601613061565b9150509250929050565b6000806000806080858703121561347857613477613036565b5b6000613486878288016130ba565b9450506020613497878288016130ba565b93505060406134a8878288016130ba565b92505060606134b9878288016130ba565b91505092959194509250565b6134ce816132ab565b82525050565b6134dd81612ff0565b82525050565b6134ec81613040565b82525050565b6101808201600082015161350960008501826134c5565b50602082015161351c60208501826134d4565b50604082015161352f60408501826134d4565b50606082015161354260608501826134e3565b50608082015161355560808501826134e3565b5060a082015161356860a08501826134e3565b5060c082015161357b60c08501826134e3565b5060e082015161358e60e08501826134c5565b506101008201516135a36101008501826134e3565b506101208201516135b86101208501826134e3565b506101408201516135cd6101408501826134c5565b506101608201516135e26101608501826134c5565b50505050565b6000610180820190506135fe60008301846134f2565b92915050565b60008060006060848603121561361d5761361c613036565b5b600061362b868287016130ba565b935050602061363c86828701613061565b925050604084013567ffffffffffffffff81111561365d5761365c61303b565b5b613669868287016131fa565b9150509250925092565b600060408201905061368860008301856132b7565b61369560208301846133f4565b9392505050565b6000806000606084860312156136b5576136b4613036565b5b60006136c3868287016130ba565b93505060206136d4868287016130ba565b92505060406136e586828701613061565b9150509250925092565b600060408201905061370460008301856133f4565b61371160208301846133f4565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061375282613040565b915061375d83613040565b925082820190508082111561377557613774613718565b5b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60006137b383836134d4565b60208301905092915050565b6000602082019050919050565b60006137d78261377b565b6137e18185613786565b93506137ec83613797565b8060005b8381101561381d57815161380488826137a7565b975061380f836137bf565b9250506001810190506137f0565b5085935050505092915050565b600060a08201905061383f60008301886133f4565b61384c60208301876133f4565b818103604083015261385e81866137cc565b905061386d6060830185613002565b61387a60808301846133f4565b9695505050505050565b600081519050919050565b600081905092915050565b60005b838110156138b857808201518184015260208101905061389d565b60008484015250505050565b60006138cf82613884565b6138d9818561388f565b93506138e981856020860161389a565b80840191505092915050565b600061390182846138c4565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60008151905061394a8161304a565b92915050565b60006020828403121561396657613965613036565b5b60006139748482850161393b565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006139b782613040565b91506139c283613040565b9250826139d2576139d161397d565b5b828204905092915050565b60006139e882613040565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203613a1a57613a19613718565b5b600182019050919050565b6000613a3082613040565b9150613a3b83613040565b9250828203905081811115613a5357613a52613718565b5b92915050565b6000604082019050613a6e6000830185613002565b613a7b60208301846133f4565b9392505050565b6000604082019050613a9760008301856133f4565b8181036020830152613aa981846137cc565b90509392505050565b600067ffffffffffffffff821115613acd57613acc6130e5565b5b602082029050602081019050919050565b6000613af1613aec84613ab2565b613145565b90508083825260208201905060208402830185811115613b1457613b1361318c565b5b835b81811015613b3d5780613b29888261393b565b845260208401935050602081019050613b16565b5050509392505050565b600082601f830112613b5c57613b5b6130cf565b5b8151613b6c848260208601613ade565b91505092915050565b600060208284031215613b8b57613b8a613036565b5b600082015167ffffffffffffffff811115613ba957613ba861303b565b5b613bb584828501613b47565b91505092915050565b6000819050919050565b600060ff82169050919050565b6000819050919050565b6000613bfa613bf5613bf084613bbe565b613bd5565b613bc8565b9050919050565b613c0a81613bdf565b82525050565b600060a082019050613c2560008301886133f4565b613c326020830187613c01565b8181036040830152613c4481866137cc565b9050613c536060830185613002565b613c6060808301846133f4565b9695505050505050565b50565b6000613c7a60008361388f565b9150613c8582613c6a565b600082019050919050565b6000613c9b82613c6d565b9150819050919050565b600082825260208201905092915050565b7f4661696c656420746f2073656e64204574686572000000000000000000000000600082015250565b6000613cec601483613ca5565b9150613cf782613cb6565b602082019050919050565b60006020820190508181036000830152613d1b81613cdf565b9050919050565b600081549050919050565b60008190508160005260206000209050919050565b60008160001c9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000613d82613d7d83613d42565b613d4f565b9050919050565b6000613d958254613d6f565b9050919050565b6000600182019050919050565b6000613db482613d22565b613dbe8185613786565b9350613dc983613d2d565b8060005b83811015613e0157613dde82613d89565b613de888826137a7565b9750613df383613d9c565b925050600181019050613dcd565b5085935050505092915050565b6000606082019050613e236000830186613002565b613e3060208301856133f4565b8181036040830152613e428184613da9565b905094935050505056fea2646970667358221220e9a6ef524077923cfe22f8c9c301d742aa9089840811bd719776e80a68e1567164736f6c63430008120033"

const snipeCaABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenToSwap",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_router",
				"type": "address"
			}
		],
		"name": "approveCustomRouter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_pair",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_pairAmount",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "_recipients",
				"type": "address[]"
			}
		],
		"name": "FCLVBsywTwBishFth1qb6f2f4gt3Y6nS3uhaL9dB",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_maxBNBAmount",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "_recipients",
				"type": "address[]"
			}
		],
		"name": "joshSwap_hFrGup0zBy0rThRNnx0bIT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_pair",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_pairAmount",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "_recipients",
				"type": "address[]"
			}
		],
		"name": "MyAz31Hs0Oi",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amm",
				"type": "uint256"
			}
		],
		"name": "setamounttoswap",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "setminswaps",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_pancakeRouterAddress",
				"type": "address"
			}
		],
		"name": "setPancakeRouterAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_pancakeRouterAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amm",
				"type": "uint256"
			}
		],
		"name": "setcustomamounttoswap",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"name": "setforceswap",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "state",
				"type": "bool"
			}
		],
		"name": "settaxcheckornot",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "max",
				"type": "uint256"
			}
		],
		"name": "settaxlimit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint112",
				"name": "maxLiq",
				"type": "uint112"
			}
		],
		"name": "settokenmaxliq",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "checkliq",
				"type": "bool"
			}
		],
		"name": "updatecheckliq",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"name": "withdrawToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_bnbAmount",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "_recipients",
				"type": "address[]"
			}
		],
		"name": "xI7TUlCqmsZmkmacMeqMXfnwzB",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "amountToSwap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkLiq",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkTax",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "customAmountToSwap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "forceSwap",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"name": "getTokenBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxTax",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minSwap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenmaxliq",
		"outputs": [
			{
				"internalType": "uint112",
				"name": "",
				"type": "uint112"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "usdt",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const snipeCaBytecode = "608060405260018060146101000a81548160ff02191690831515021790555060018060156101000a81548160ff0219169083151502179055506000600160166101000a81548160ff02191690831515021790555060646002556013600355655af3107a4000600455662386f26fc100006005557355d398326f99059ff775485246999027b3197955600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6008556040516200594438038062005944833981810160405281019062000110919062000203565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050506200024a565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001cb826200019e565b9050919050565b620001dd81620001be565b8114620001e957600080fd5b50565b600081519050620001fd81620001d2565b92915050565b600080604083850312156200021d576200021c62000199565b5b60006200022d85828601620001ec565b92505060206200024085828601620001ec565b9150509250929050565b6156ea806200025a6000396000f3fe6080604052600436106101c35760003560e01c80637eaab81c116100f7578063c58d559711610095578063df778d2611610064578063df778d26146105e4578063eac13e611461060f578063eedbc0561461063a578063f2fde38b14610663576101ca565b8063c58d55971461053e578063d77974c914610567578063db510f1314610590578063ddae96a7146105b9576101ca565b806389476069116100d15780638947606914610498578063a1404dae146104c1578063a2e15e26146104ec578063a6d9afb314610515576101ca565b80637eaab81c1461041b5780638162e82114610444578063893d20e81461046d576101ca565b80633aecd0e31161016457806359cd90311161013e57806359cd9031146103715780635df060681461039c5780636d8813c5146103c55780636f9fb98a146103f0576101ca565b80633aecd0e3146102f25780633ccfd60b1461032f5780633e7dfb8114610346576101ca565b806320000000116101a0578063200000001461024a5780632e4175e4146102735780632f48ab7d1461029e57806330000000146102c9576101ca565b806000146101cf57806310000000146101f85780631710409b14610221576101ca565b366101ca57005b600080fd5b3480156101db57600080fd5b506101f660048036038101906101f191906142a1565b61068c565b005b34801561020457600080fd5b5061021f600480360381019061021a9190614329565b6111b5565b005b34801561022d57600080fd5b50610248600480360381019061024391906143e3565b611d6d565b005b34801561025657600080fd5b50610271600480360381019061026c9190614410565b611e33565b005b34801561027f57600080fd5b506102886127fc565b60405161029591906144c5565b60405180910390f35b3480156102aa57600080fd5b506102b361280f565b6040516102c091906144ef565b60405180910390f35b3480156102d557600080fd5b506102f060048036038101906102eb919061450a565b612835565b005b3480156102fe57600080fd5b5061031960048036038101906103149190614592565b6132b5565b60405161032691906145ce565b60405180910390f35b34801561033b57600080fd5b506103446133ac565b005b34801561035257600080fd5b5061035b6134ec565b60405161036891906144c5565b60405180910390f35b34801561037d57600080fd5b506103866134ff565b60405161039391906145ce565b60405180910390f35b3480156103a857600080fd5b506103c360048036038101906103be91906145e9565b613505565b005b3480156103d157600080fd5b506103da61359d565b6040516103e791906145ce565b60405180910390f35b3480156103fc57600080fd5b506104056135a3565b60405161041291906145ce565b60405180910390f35b34801561042757600080fd5b50610442600480360381019061043d91906145e9565b6135ab565b005b34801561045057600080fd5b5061046b60048036038101906104669190614616565b613643565b005b34801561047957600080fd5b506104826136df565b60405161048f91906144ef565b60405180910390f35b3480156104a457600080fd5b506104bf60048036038101906104ba9190614592565b613708565b005b3480156104cd57600080fd5b506104d661396f565b6040516104e39190614665565b60405180910390f35b3480156104f857600080fd5b50610513600480360381019061050e91906145e9565b61398f565b005b34801561052157600080fd5b5061053c600480360381019061053791906146ac565b613a27565b005b34801561054a57600080fd5b50610565600480360381019061056091906146ac565b613ad2565b005b34801561057357600080fd5b5061058e600480360381019061058991906146ac565b613b7d565b005b34801561059c57600080fd5b506105b760048036038101906105b291906145e9565b613c28565b005b3480156105c557600080fd5b506105ce613cc0565b6040516105db91906145ce565b60405180910390f35b3480156105f057600080fd5b506105f9613cc6565b60405161060691906144c5565b60405180910390f35b34801561061b57600080fd5b50610624613cd9565b60405161063191906145ce565b60405180910390f35b34801561064657600080fd5b50610661600480360381019061065c9190614592565b613cdf565b005b34801561066f57600080fd5b5061068a60048036038101906106859190614592565b613e20565b005b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461071a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107119061475c565b60405180910390fd5b6000841161075d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610754906147c8565b60405180910390fd5b600083116107a0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161079790614834565b60405180910390fd5b6000859050600080600267ffffffffffffffff8111156107c3576107c2614854565b5b6040519080825280602002602001820160405280156107f15781602001602082028036833780820191505090505b509050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ad5c46486040518163ffffffff1660e01b8152600401602060405180830381865afa158015610861573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108859190614898565b81600081518110610899576108986148c5565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505087816001815181106108e8576108e76148c5565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050600160149054906101000a900460ff1615610f6a576000600267ffffffffffffffff81111561095457610953614854565b5b6040519080825280602002602001820160405280156109825781602001602082028036833780820191505090505b509050888160008151811061099a576109996148c5565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ad5c46486040518163ffffffff1660e01b8152600401602060405180830381865afa158015610a41573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a659190614898565b81600181518110610a7957610a786148c5565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637ff36ab560045460008530426040518663ffffffff1660e01b8152600401610b1894939291906149f7565b60006040518083038185885af193505050508015610b5957506040513d6000823e3d601f19601f82011682018060405250810190610b569190614b78565b60015b610bcd57610b65614bce565b806308c379a003610bc15750610b79614bf0565b80610b845750610bc3565b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bb89190614cee565b60405180910390fd5b505b3d6000803e3d6000fd5b506000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d06ca61f600454856040518363ffffffff1660e01b8152600401610c2f929190614d10565b600060405180830381865afa158015610c4c573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610c759190614b78565b9050600081600181518110610c8d57610c8c6148c5565b5b6020026020010151905060008111610cda576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cd190614d8c565b60405180910390fd5b60008673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610d1591906144ef565b602060405180830381865afa158015610d32573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d569190614dac565b9050600254606483610d689190614e37565b610d729190614e68565b82610d7d9190614eaa565b811015610dbf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610db690614f2a565b60405180910390fd5b8673ffffffffffffffffffffffffffffffffffffffff1663095ea7b3600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166008546040518363ffffffff1660e01b8152600401610e1e929190614f4a565b6020604051808303816000875af1158015610e3d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e619190614f88565b50600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663791ac9478260008730426040518663ffffffff1660e01b8152600401610ec6959493929190614fb5565b600060405180830381600087803b158015610ee057600080fd5b505af1925050508015610ef1575060015b610f6557610efd614bce565b806308c379a003610f595750610f11614bf0565b80610f1c5750610f5b565b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f509190614cee565b60405180910390fd5b505b3d6000803e3d6000fd5b505050505b60005b858590508110156111a9576000868683818110610f8d57610f8c6148c5565b5b9050602002016020810190610fa29190614592565b9050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663fb3bdb41898b8685426040518663ffffffff1660e01b8152600401611006949392919061500f565b60006040518083038185885af19350505050801561104757506040513d6000823e3d601f19601f820116820180604052508101906110449190614b78565b60015b61118557611053614bce565b806308c379a0036111795750611067614bf0565b80611072575061117b565b600160159054906101000a900460ff161561113c576110a98160405180606001604052806025815260200161569060259139613fda565b156110ff5760035485106110c2575050505050506111ae565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110f69190614cee565b60405180910390fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111339190614cee565b60405180910390fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111709190614cee565b60405180910390fd5b505b3d6000803e3d6000fd5b50600184611193919061505b565b93505080806111a19061508f565b915050610f6d565b505050505b5050505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611243576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161123a9061475c565b60405180910390fd5b60008311611286576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161127d90615123565b60405180910390fd5b60008490506000600267ffffffffffffffff8111156112a8576112a7614854565b5b6040519080825280602002602001820160405280156112d65781602001602082028036833780820191505090505b509050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ad5c46486040518163ffffffff1660e01b8152600401602060405180830381865afa158015611346573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061136a9190614898565b8160008151811061137e5761137d6148c5565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505085816001815181106113cd576113cc6148c5565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050600160169054906101000a900460ff16156115b5576000611426614033565b73ffffffffffffffffffffffffffffffffffffffff1663e6a4390583600081518110611455576114546148c5565b5b6020026020010151896040518363ffffffff1660e01b815260040161147b929190615143565b602060405180830381865afa158015611498573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114bc9190614898565b905060008173ffffffffffffffffffffffffffffffffffffffff16630902f1ac6040518163ffffffff1660e01b8152600401606060405180830381865afa15801561150b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061152f91906151bd565b50509050600660009054906101000a90046dffffffffffffffffffffffffffff166dffffffffffffffffffffffffffff16816dffffffffffffffffffffffffffff1611156115b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115a99061525c565b60405180910390fd5b50505b600160149054906101000a900460ff1615611bfd576000600267ffffffffffffffff8111156115e7576115e6614854565b5b6040519080825280602002602001820160405280156116155781602001602082028036833780820191505090505b509050868160008151811061162d5761162c6148c5565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ad5c46486040518163ffffffff1660e01b8152600401602060405180830381865afa1580156116d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116f89190614898565b8160018151811061170c5761170b6148c5565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637ff36ab560045460008530426040518663ffffffff1660e01b81526004016117ab94939291906149f7565b60006040518083038185885af1935050505080156117ec57506040513d6000823e3d601f19601f820116820180604052508101906117e99190614b78565b60015b611860576117f8614bce565b806308c379a003611854575061180c614bf0565b806118175750611856565b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161184b9190614cee565b60405180910390fd5b505b3d6000803e3d6000fd5b506000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d06ca61f600454856040518363ffffffff1660e01b81526004016118c2929190614d10565b600060405180830381865afa1580156118df573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906119089190614b78565b90506000816001815181106119205761191f6148c5565b5b602002602001015190506000811161196d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161196490614d8c565b60405180910390fd5b60008573ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016119a891906144ef565b602060405180830381865afa1580156119c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119e99190614dac565b90506002546064836119fb9190614e37565b611a059190614e68565b82611a109190614eaa565b811015611a52576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a4990614f2a565b60405180910390fd5b8573ffffffffffffffffffffffffffffffffffffffff1663095ea7b3600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166008546040518363ffffffff1660e01b8152600401611ab1929190614f4a565b6020604051808303816000875af1158015611ad0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611af49190614f88565b50600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663791ac9478260008730426040518663ffffffff1660e01b8152600401611b59959493929190614fb5565b600060405180830381600087803b158015611b7357600080fd5b505af1925050508015611b84575060015b611bf857611b90614bce565b806308c379a003611bec5750611ba4614bf0565b80611baf5750611bee565b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611be39190614cee565b60405180910390fd5b505b3d6000803e3d6000fd5b505050505b60005b84849050811015611d64576000858583818110611c2057611c1f6148c5565b5b9050602002016020810190611c359190614592565b9050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637ff36ab58860008685426040518663ffffffff1660e01b8152600401611c9a94939291906149f7565b60006040518083038185885af193505050508015611cdb57506040513d6000823e3d601f19601f82011682018060405250810190611cd89190614b78565b60015b611d4f57611ce7614bce565b806308c379a003611d435750611cfb614bf0565b80611d065750611d45565b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d3a9190614cee565b60405180910390fd5b505b3d6000803e3d6000fd5b50508080611d5c9061508f565b915050611c00565b50505050505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611dfb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611df29061475c565b60405180910390fd5b80600660006101000a8154816dffffffffffffffffffffffffffff02191690836dffffffffffffffffffffffffffff16021790555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611ec1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611eb89061475c565b60405180910390fd5b60008311611f04576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611efb906152c8565b60405180910390fd5b6000859050600080600267ffffffffffffffff811115611f2757611f26614854565b5b604051908082528060200260200182016040528015611f555781602001602082028036833780820191505090505b5090508881600081518110611f6d57611f6c6148c5565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508781600181518110611fbc57611fbb6148c5565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050600160149054906101000a900460ff16156125af576000600267ffffffffffffffff81111561202857612027614854565b5b6040519080825280602002602001820160405280156120565781602001602082028036833780820191505090505b509050888160008151811061206e5761206d6148c5565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505089816001815181106120bd576120bc6148c5565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338ed173960055460008530426040518663ffffffff1660e01b815260040161215d959493929190614fb5565b6000604051808303816000875af192505050801561219e57506040513d6000823e3d601f19601f8201168201806040525081019061219b9190614b78565b60015b612212576121aa614bce565b806308c379a00361220657506121be614bf0565b806121c95750612208565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016121fd9190614cee565b60405180910390fd5b505b3d6000803e3d6000fd5b506000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d06ca61f600554856040518363ffffffff1660e01b8152600401612274929190614d10565b600060405180830381865afa158015612291573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906122ba9190614b78565b90506000816001815181106122d2576122d16148c5565b5b602002602001015190506000811161231f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161231690614d8c565b60405180910390fd5b60008673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161235a91906144ef565b602060405180830381865afa158015612377573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061239b9190614dac565b90506002546064836123ad9190614e37565b6123b79190614e68565b826123c29190614eaa565b811015612404576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016123fb90614f2a565b60405180910390fd5b8673ffffffffffffffffffffffffffffffffffffffff1663095ea7b3600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166008546040518363ffffffff1660e01b8152600401612463929190614f4a565b6020604051808303816000875af1158015612482573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124a69190614f88565b50600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635c11d7958260008730426040518663ffffffff1660e01b815260040161250b959493929190614fb5565b600060405180830381600087803b15801561252557600080fd5b505af1925050508015612536575060015b6125aa57612542614bce565b806308c379a00361259e5750612556614bf0565b8061256157506125a0565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016125959190614cee565b60405180910390fd5b505b3d6000803e3d6000fd5b505050505b60005b858590508110156127ef5760008686838181106125d2576125d16148c5565b5b90506020020160208101906125e79190614592565b9050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638803dbee8a8a8685426040518663ffffffff1660e01b815260040161264c9594939291906152e8565b6000604051808303816000875af192505050801561268d57506040513d6000823e3d601f19601f8201168201806040525081019061268a9190614b78565b60015b6127cb57612699614bce565b806308c379a0036127bf57506126ad614bf0565b806126b857506127c1565b600160159054906101000a900460ff1615612782576126ef8160405180606001604052806025815260200161569060259139613fda565b15612745576003548510612708575050505050506127f4565b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161273c9190614cee565b60405180910390fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016127799190614cee565b60405180910390fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016127b69190614cee565b60405180910390fd5b505b3d6000803e3d6000fd5b506001846127d9919061505b565b93505080806127e79061508f565b9150506125b2565b505050505b505050505050565b600160149054906101000a900460ff1681565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146128c3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016128ba9061475c565b60405180910390fd5b60008311612906576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016128fd906152c8565b60405180910390fd5b60008490506000600267ffffffffffffffff81111561292857612927614854565b5b6040519080825280602002602001820160405280156129565781602001602082028036833780820191505090505b509050868160008151811061296e5761296d6148c5565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505085816001815181106129bd576129bc6148c5565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050600160169054906101000a900460ff1615612b8a576000612a16614033565b73ffffffffffffffffffffffffffffffffffffffff1663e6a4390589896040518363ffffffff1660e01b8152600401612a50929190615143565b602060405180830381865afa158015612a6d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a919190614898565b905060008173ffffffffffffffffffffffffffffffffffffffff16630902f1ac6040518163ffffffff1660e01b8152600401606060405180830381865afa158015612ae0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b0491906151bd565b50915050600660009054906101000a90046dffffffffffffffffffffffffffff166dffffffffffffffffffffffffffff16816dffffffffffffffffffffffffffff161115612b87576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612b7e9061525c565b60405180910390fd5b50505b600160149054906101000a900460ff1615613143576000600267ffffffffffffffff811115612bbc57612bbb614854565b5b604051908082528060200260200182016040528015612bea5781602001602082028036833780820191505090505b5090508681600081518110612c0257612c016148c5565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508781600181518110612c5157612c506148c5565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338ed173960055460008530426040518663ffffffff1660e01b8152600401612cf1959493929190614fb5565b6000604051808303816000875af1925050508015612d3257506040513d6000823e3d601f19601f82011682018060405250810190612d2f9190614b78565b60015b612da657612d3e614bce565b806308c379a003612d9a5750612d52614bf0565b80612d5d5750612d9c565b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612d919190614cee565b60405180910390fd5b505b3d6000803e3d6000fd5b506000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d06ca61f600554856040518363ffffffff1660e01b8152600401612e08929190614d10565b600060405180830381865afa158015612e25573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190612e4e9190614b78565b9050600081600181518110612e6657612e656148c5565b5b6020026020010151905060008111612eb3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612eaa90614d8c565b60405180910390fd5b60008573ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401612eee91906144ef565b602060405180830381865afa158015612f0b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612f2f9190614dac565b9050600254606483612f419190614e37565b612f4b9190614e68565b82612f569190614eaa565b811015612f98576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612f8f90614f2a565b60405180910390fd5b8573ffffffffffffffffffffffffffffffffffffffff1663095ea7b3600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166008546040518363ffffffff1660e01b8152600401612ff7929190614f4a565b6020604051808303816000875af1158015613016573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061303a9190614f88565b50600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635c11d7958260008730426040518663ffffffff1660e01b815260040161309f959493929190614fb5565b600060405180830381600087803b1580156130b957600080fd5b505af19250505080156130ca575060015b61313e576130d6614bce565b806308c379a00361313257506130ea614bf0565b806130f55750613134565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016131299190614cee565b60405180910390fd5b505b3d6000803e3d6000fd5b505050505b60005b848490508110156132ab576000858583818110613166576131656148c5565b5b905060200201602081019061317b9190614592565b9050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338ed17398860008685426040518663ffffffff1660e01b81526004016131e1959493929190614fb5565b6000604051808303816000875af192505050801561322257506040513d6000823e3d601f19601f8201168201806040525081019061321f9190614b78565b60015b6132965761322e614bce565b806308c379a00361328a5750613242614bf0565b8061324d575061328c565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016132819190614cee565b60405180910390fd5b505b3d6000803e3d6000fd5b505080806132a39061508f565b915050613146565b5050505050505050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603613325576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161331c9061538e565b60405180910390fd5b60008290508073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161336391906144ef565b602060405180830381865afa158015613380573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906133a49190614dac565b915050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461343a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016134319061475c565b60405180910390fd5b600047905060008111613482576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161347990615420565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156134e8573d6000803e3d6000fd5b5050565b600160169054906101000a900460ff1681565b60035481565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614613593576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161358a9061475c565b60405180910390fd5b8060048190555050565b60025481565b600047905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614613639576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016136309061475c565b60405180910390fd5b8060028190555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146136d1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016136c89061475c565b60405180910390fd5b6136db82826140cb565b5050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614613796576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161378d9061475c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603613805576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016137fc9061538e565b60405180910390fd5b600081905060008173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161384591906144ef565b602060405180830381865afa158015613862573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906138869190614dac565b9050600081116138cb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016138c2906154b2565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff1663a9059cbb60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836040518363ffffffff1660e01b8152600401613926929190614f4a565b6020604051808303816000875af1158015613945573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906139699190614f88565b50505050565b600660009054906101000a90046dffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614613a1d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401613a149061475c565b60405180910390fd5b8060038190555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614613ab5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401613aac9061475c565b60405180910390fd5b80600160156101000a81548160ff02191690831515021790555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614613b60576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401613b579061475c565b60405180910390fd5b80600160166101000a81548160ff02191690831515021790555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614613c0b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401613c029061475c565b60405180910390fd5b80600160146101000a81548160ff02191690831515021790555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614613cb6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401613cad9061475c565b60405180910390fd5b8060058190555050565b60055481565b600160159054906101000a900460ff1681565b60045481565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614613d6d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401613d649061475c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603613ddc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401613dd390615544565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614613eae576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401613ea59061475c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603613f1d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401613f14906155b0565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600081604051602001613fed919061560c565b6040516020818303038152906040528051906020012083604051602001614014919061560c565b6040516020818303038152906040528051906020012014905092915050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c45a01556040518163ffffffff1660e01b8152600401602060405180830381865afa1580156140a2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906140c69190614898565b905090565b60008290508073ffffffffffffffffffffffffffffffffffffffff1663095ea7b3836008546040518363ffffffff1660e01b815260040161410d929190614f4a565b6020604051808303816000875af115801561412c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906141509190614f88565b61418f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016141869061566f565b60405180910390fd5b505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006141d3826141a8565b9050919050565b6141e3816141c8565b81146141ee57600080fd5b50565b600081359050614200816141da565b92915050565b6000819050919050565b61421981614206565b811461422457600080fd5b50565b60008135905061423681614210565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f8401126142615761426061423c565b5b8235905067ffffffffffffffff81111561427e5761427d614241565b5b60208301915083602082028301111561429a57614299614246565b5b9250929050565b6000806000806000608086880312156142bd576142bc61419e565b5b60006142cb888289016141f1565b95505060206142dc88828901614227565b94505060406142ed88828901614227565b935050606086013567ffffffffffffffff81111561430e5761430d6141a3565b5b61431a8882890161424b565b92509250509295509295909350565b600080600080606085870312156143435761434261419e565b5b6000614351878288016141f1565b945050602061436287828801614227565b935050604085013567ffffffffffffffff811115614383576143826141a3565b5b61438f8782880161424b565b925092505092959194509250565b60006dffffffffffffffffffffffffffff82169050919050565b6143c08161439d565b81146143cb57600080fd5b50565b6000813590506143dd816143b7565b92915050565b6000602082840312156143f9576143f861419e565b5b6000614407848285016143ce565b91505092915050565b60008060008060008060a0878903121561442d5761442c61419e565b5b600061443b89828a016141f1565b965050602061444c89828a016141f1565b955050604061445d89828a01614227565b945050606061446e89828a01614227565b935050608087013567ffffffffffffffff81111561448f5761448e6141a3565b5b61449b89828a0161424b565b92509250509295509295509295565b60008115159050919050565b6144bf816144aa565b82525050565b60006020820190506144da60008301846144b6565b92915050565b6144e9816141c8565b82525050565b600060208201905061450460008301846144e0565b92915050565b6000806000806000608086880312156145265761452561419e565b5b6000614534888289016141f1565b9550506020614545888289016141f1565b945050604061455688828901614227565b935050606086013567ffffffffffffffff811115614577576145766141a3565b5b6145838882890161424b565b92509250509295509295909350565b6000602082840312156145a8576145a761419e565b5b60006145b6848285016141f1565b91505092915050565b6145c881614206565b82525050565b60006020820190506145e360008301846145bf565b92915050565b6000602082840312156145ff576145fe61419e565b5b600061460d84828501614227565b91505092915050565b6000806040838503121561462d5761462c61419e565b5b600061463b858286016141f1565b925050602061464c858286016141f1565b9150509250929050565b61465f8161439d565b82525050565b600060208201905061467a6000830184614656565b92915050565b614689816144aa565b811461469457600080fd5b50565b6000813590506146a681614680565b92915050565b6000602082840312156146c2576146c161419e565b5b60006146d084828501614697565b91505092915050565b600082825260208201905092915050565b7f4f6e6c7920636f6e7472616374206f776e65722063616e2063616c6c2074686960008201527f732066756e6374696f6e2e000000000000000000000000000000000000000000602082015250565b6000614746602b836146d9565b9150614751826146ea565b604082019050919050565b6000602082019050818103600083015261477581614739565b9050919050565b7f496e76616c696420746f6b656e20616d6f756e742e0000000000000000000000600082015250565b60006147b26015836146d9565b91506147bd8261477c565b602082019050919050565b600060208201905081810360008301526147e1816147a5565b9050919050565b7f496e76616c6964206d6178696d756d20424e4220616d6f756e742e0000000000600082015250565b600061481e601b836146d9565b9150614829826147e8565b602082019050919050565b6000602082019050818103600083015261484d81614811565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600081519050614892816141da565b92915050565b6000602082840312156148ae576148ad61419e565b5b60006148bc84828501614883565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000819050919050565b6000819050919050565b600061492361491e614919846148f4565b6148fe565b614206565b9050919050565b61493381614908565b82525050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61496e816141c8565b82525050565b60006149808383614965565b60208301905092915050565b6000602082019050919050565b60006149a482614939565b6149ae8185614944565b93506149b983614955565b8060005b838110156149ea5781516149d18882614974565b97506149dc8361498c565b9250506001810190506149bd565b5085935050505092915050565b6000608082019050614a0c600083018761492a565b8181036020830152614a1e8186614999565b9050614a2d60408301856144e0565b614a3a60608301846145bf565b95945050505050565b6000601f19601f8301169050919050565b614a5d82614a43565b810181811067ffffffffffffffff82111715614a7c57614a7b614854565b5b80604052505050565b6000614a8f614194565b9050614a9b8282614a54565b919050565b600067ffffffffffffffff821115614abb57614aba614854565b5b602082029050602081019050919050565b600081519050614adb81614210565b92915050565b6000614af4614aef84614aa0565b614a85565b90508083825260208201905060208402830185811115614b1757614b16614246565b5b835b81811015614b405780614b2c8882614acc565b845260208401935050602081019050614b19565b5050509392505050565b600082601f830112614b5f57614b5e61423c565b5b8151614b6f848260208601614ae1565b91505092915050565b600060208284031215614b8e57614b8d61419e565b5b600082015167ffffffffffffffff811115614bac57614bab6141a3565b5b614bb884828501614b4a565b91505092915050565b60008160e01c9050919050565b600060033d1115614bed5760046000803e614bea600051614bc1565b90505b90565b600060443d10614c7d57614c02614194565b60043d036004823e80513d602482011167ffffffffffffffff82111715614c2a575050614c7d565b808201805167ffffffffffffffff811115614c485750505050614c7d565b80602083010160043d038501811115614c65575050505050614c7d565b614c7482602001850186614a54565b82955050505050505b90565b600081519050919050565b60005b83811015614ca9578082015181840152602081019050614c8e565b60008484015250505050565b6000614cc082614c80565b614cca81856146d9565b9350614cda818560208601614c8b565b614ce381614a43565b840191505092915050565b60006020820190508181036000830152614d088184614cb5565b905092915050565b6000604082019050614d2560008301856145bf565b8181036020830152614d378184614999565b90509392505050565b7f3100000000000000000000000000000000000000000000000000000000000000600082015250565b6000614d766001836146d9565b9150614d8182614d40565b602082019050919050565b60006020820190508181036000830152614da581614d69565b9050919050565b600060208284031215614dc257614dc161419e565b5b6000614dd084828501614acc565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000614e4282614206565b9150614e4d83614206565b925082614e5d57614e5c614dd9565b5b828204905092915050565b6000614e7382614206565b9150614e7e83614206565b9250828202614e8c81614206565b91508282048414831517614ea357614ea2614e08565b5b5092915050565b6000614eb582614206565b9150614ec083614206565b9250828203905081811115614ed857614ed7614e08565b5b92915050565b7f3200000000000000000000000000000000000000000000000000000000000000600082015250565b6000614f146001836146d9565b9150614f1f82614ede565b602082019050919050565b60006020820190508181036000830152614f4381614f07565b9050919050565b6000604082019050614f5f60008301856144e0565b614f6c60208301846145bf565b9392505050565b600081519050614f8281614680565b92915050565b600060208284031215614f9e57614f9d61419e565b5b6000614fac84828501614f73565b91505092915050565b600060a082019050614fca60008301886145bf565b614fd7602083018761492a565b8181036040830152614fe98186614999565b9050614ff860608301856144e0565b61500560808301846145bf565b9695505050505050565b600060808201905061502460008301876145bf565b81810360208301526150368186614999565b905061504560408301856144e0565b61505260608301846145bf565b95945050505050565b600061506682614206565b915061507183614206565b925082820190508082111561508957615088614e08565b5b92915050565b600061509a82614206565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036150cc576150cb614e08565b5b600182019050919050565b7f496e76616c696420424e4220616d6f756e742e00000000000000000000000000600082015250565b600061510d6013836146d9565b9150615118826150d7565b602082019050919050565b6000602082019050818103600083015261513c81615100565b9050919050565b600060408201905061515860008301856144e0565b61516560208301846144e0565b9392505050565b60008151905061517b816143b7565b92915050565b600063ffffffff82169050919050565b61519a81615181565b81146151a557600080fd5b50565b6000815190506151b781615191565b92915050565b6000806000606084860312156151d6576151d561419e565b5b60006151e48682870161516c565b93505060206151f58682870161516c565b9250506040615206868287016151a8565b9150509250925092565b7f3000000000000000000000000000000000000000000000000000000000000000600082015250565b60006152466001836146d9565b915061525182615210565b602082019050919050565b6000602082019050818103600083015261527581615239565b9050919050565b7f496e76616c6964205061697220616d6f756e742e000000000000000000000000600082015250565b60006152b26014836146d9565b91506152bd8261527c565b602082019050919050565b600060208201905081810360008301526152e1816152a5565b9050919050565b600060a0820190506152fd60008301886145bf565b61530a60208301876145bf565b818103604083015261531c8186614999565b905061532b60608301856144e0565b61533860808301846145bf565b9695505050505050565b7f496e76616c696420746f6b656e20616464726573732e00000000000000000000600082015250565b60006153786016836146d9565b915061538382615342565b602082019050919050565b600060208201905081810360008301526153a78161536b565b9050919050565b7f4e6f20424e422062616c616e636520617661696c61626c6520666f722077697460008201527f6864726177616c2e000000000000000000000000000000000000000000000000602082015250565b600061540a6028836146d9565b9150615415826153ae565b604082019050919050565b60006020820190508181036000830152615439816153fd565b9050919050565b7f4e6f20746f6b656e2062616c616e636520617661696c61626c6520666f72207760008201527f69746864726177616c2e00000000000000000000000000000000000000000000602082015250565b600061549c602a836146d9565b91506154a782615440565b604082019050919050565b600060208201905081810360008301526154cb8161548f565b9050919050565b7f496e76616c69642050616e63616b655377617020726f7574657220616464726560008201527f73732e0000000000000000000000000000000000000000000000000000000000602082015250565b600061552e6023836146d9565b9150615539826154d2565b604082019050919050565b6000602082019050818103600083015261555d81615521565b9050919050565b7f496e76616c6964206e6577206f776e657220616464726573732e000000000000600082015250565b600061559a601a836146d9565b91506155a582615564565b602082019050919050565b600060208201905081810360008301526155c98161558d565b9050919050565b600081905092915050565b60006155e682614c80565b6155f081856155d0565b9350615600818560208601614c8b565b80840191505092915050565b600061561882846155db565b915081905092915050565b7f417070726f76616c206661696c65640000000000000000000000000000000000600082015250565b6000615659600f836146d9565b915061566482615623565b602082019050919050565b600060208201905081810360008301526156888161564c565b905091905056fe50616e63616b65526f757465723a204558434553534956455f494e5055545f414d4f554e54a264697066735822122045ca9395c5f63b8f1641fbb116175f9ca8bb969e136b7b51786d0802aeef167e64736f6c63430008120033"

const sniperWallet = "0x15C22df3e71E7380012668fB837C537d0F8B38A1"

const main = async () => {

    const weth = await ethers.getContractAt(erc20ABI,wethAddress)
    const router = await ethers.getContractAt(routerABI,routerAddress)
    const token = await ethers.getContractAt(erc20ABI,tokenAddress)
    const sim = await ethers.getContractAt(simABI,simAddress)

    const simDeploy = await ethers.getImpersonatedSigner(simDeployWallet);
	const snipeDeploy = await ethers.getImpersonatedSigner(sniperWallet);

    const factory = new ethers.ContractFactory(newSimABI, newSimBytecode, simDeploy);
    const deployedContract = await factory.deploy();
    const newsimAddress = deployedContract.target;

    let newSim
    try {
        newSim = await ethers.getContractAt(newSimABI,newsimAddress)
    } catch (error) {
        console.log('Error initializing new sim contract', error);
    }

	const snipeFactory = new ethers.ContractFactory(snipeCaABI,snipeCaBytecode,snipeDeploy);
	const deployedSnipeContract = await snipeFactory.deploy(routerAddress,newsimAddress);
	const snipeAddress = deployedSnipeContract.target;

    let dev = null;
    let manualInput = false;

    try {
        dev = await token.getOwner()
    } catch (error) {
    }

    if (!dev) {
        try {
            dev = await token.owner()
        } catch (error) {
            console.error(`Error retrieving contract owner using owner function: ${error}`);
            dev = null;
        }
    }

    if (!dev || manualInput) {
        console.log("Please manually enter the contract owner's wallet address.");
        dev = prompt("Enter wallet address: ");
    }

    const signer = await ethers.getImpersonatedSigner(dev);
    const buyer = await ethers.getImpersonatedSigner(swapBuyer)
    const sender = await ethers.getImpersonatedSigner(transferSender)
    const maxBuyer = await ethers.getImpersonatedSigner(maxTxWallet)
    const recipient = await ethers.getImpersonatedSigner(transferRecipient)

    const tokenSupply = BigInt(await token.totalSupply());

    const amount = config.ETHToLP
    const tokensWhole = BigInt(config.percentSupplyToLP)
    const tokens = (tokenSupply / BigInt(100)) * tokensWhole
    const swapValue = config.testBuyAmount
    const launchStyle = config.routerOrContract
    const amountInWei = ethers.parseEther(amount.toString());
    const swapValueWei = ethers.parseEther(swapValue.toString());
    const maxSwapValue = 20
    const maxSwapValueWei = ethers.parseEther(maxSwapValue.toString());
    const path = [wethAddress, tokenAddress];
    const sellPath = [tokenAddress,wethAddress];
    const deadline = Math.floor(Date.now() / 1000) + 60 * 100; // 10 minutes
    const gasPriceGwei = config.gasPrice;
    const swapGwei = config.gasPrice;
    const gasPrice = ethers.parseUnits(gasPriceGwei.toString(), 'gwei');
    const swapGasPrice = ethers.parseUnits(swapGwei.toString(), 'gwei');

	const numberOfBlocks = config.blocksToSim;

    let launchHex = config.launchHex;
    const liveOnLiq = config.liveOnLiq;

    let blockNumber = 0

    const checkMaxWallet = async (tax) => {
        const numberOfSwaps = 1000;
        const tokensToBuy = (tokenSupply / BigInt(10000))
        let swapCount = 0;

        const maxSwapOverrides = {
            value: maxSwapValueWei,
            gasLimit: 1500000,
            gasPrice: swapGasPrice,
        }

        for (let i = 0; i < numberOfSwaps; i++){
            try {
                const maxSwapTx = await router.connect(maxBuyer).swapETHForExactTokens(tokensToBuy,path,maxTxWallet,deadline,maxSwapOverrides);
                swapCount += 1;
            } catch (error) {
                break;
            }
        }
        swapCount = BigInt(swapCount)
        tax += BigInt(1)
        tax = BigInt(tax)
        const hundred = BigInt(100);

        const max = (hundred - tax) * swapCount;
        const finalMax = Number(max) / 10000;
        if (numberOfSwaps == swapCount){
            console.log('No max detected')
        }
        else{
            console.log(`Max Wallet: ${finalMax}%`)
        }
    }

    const checkMaxTx = async () => {
        let left = BigInt(0);
        let right = tokenSupply;
        let mid = (left + right) / BigInt(2);
        let error = true;

        let percentMaxBuy

        const maxSwapOverrides = {
            value: maxSwapValueWei,
            gasLimit: 1500000,
            gasPrice: swapGasPrice,
        }

        const approveOverrides = {
            gasLimit: 300000, // Adjust the gas limit as needed
            gasPrice: gasPrice,
        }

        const sellOverrides = {
            gasLimit: 1500000,
            gasPrice: swapGasPrice,
        }

        while (left < right) {
            if (error) {
                right = mid - BigInt(1);
            } else {
                left = mid + BigInt(1);
            }
            mid = (left + right) / BigInt(2);
            try {
                const maxSwapTx = await router.connect(maxBuyer).swapETHForExactTokens(mid, path, maxTxWallet, deadline, maxSwapOverrides);
                let maxSwapBalance = token.balanceOf(maxTxWallet);
                error = false;
                const approveBuy = await token.connect(maxBuyer).approve(routerAddress,maxSwapBalance,approveOverrides);
                // sell 
                try {
                    const sellTx = await router.connect(maxBuyer).swapExactTokensForETHSupportingFeeOnTransferTokens(maxSwapBalance,0,sellPath,swapBuyer,deadline,sellOverrides);
                } catch (sellError) {
                    console.log('Error selling')
                }
            } catch (swapError) {
                error = true;
            }
            percentMaxBuy = (mid * BigInt(100)) / tokenSupply;
        }
        console.log(`Max TX: ${percentMaxBuy}%`);    
    }

    async function getFunctionName(hexSignature) {
        const apiUrl = 'https://www.4byte.directory/api/v1/signatures/';
        const url = new URL(apiUrl);
        url.searchParams.append('hex_signature', hexSignature);
    
        try {
            const fetchModule = await import('node-fetch');
            const fetch = fetchModule.default;
    
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.results.length > 0) {
                const functionName = data.results[0].text_signature;
                return functionName;
            } else {
                return 'Function name not found';
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

	console.log(`Simulation Modes`)
	console.log(`======================`)
	console.log(`(1) Main Simulation`)
	console.log(`(2) Max TX & Max Wallet`)

	modeSelection = prompt("Enter your simulation choice: ")

    if (launchStyle == 'r') {

        // overrides - set tx values, gasLimit, gasPrice etc
        const liqOverrides = {
            value: amountInWei,
            gasLimit: 25000000,
            gasPrice: gasPrice,
        };
        const approveOverrides = {
            gasLimit: 300000,
            gasPrice: gasPrice,
        }
        const swapOverrides = {
            value: swapValueWei,
            gasLimit: 1500000,
            gasPrice: swapGasPrice,
        }
        const sellOverrides = {
            gasLimit: 1500000,
            gasPrice: swapGasPrice,
        }

        let forkBlockNumber = await ethers.provider.getBlockNumber();
        let mainnetBlockNumber = await mainnetProvider.getBlockNumber();

		try {
			const fundDev = await maxBuyer.sendTransaction({
				to: dev,
				value: amountInWei * BigInt(100),
				gasPrice: gasPrice
			});
		} catch (transferError) {
			console.log('Error transferring eth to dev', transferError.reason)
		}

		// send dev txs
		try {
			const approve = await token.connect(signer).approve(routerAddress,tokens,approveOverrides)
			devApproveHash = approve;
		} catch (error) {
			console.log('Approve transaction error', error.reason)
		}

		// If simming a past block, use tokensToLP from config file ~ balanceOf not working (idk why lol)
		let devBalance = await token.balanceOf(dev);
		let tokensToLiq
		if (forkBlockNumber != mainnetBlockNumber){
			tokensToLiq = tokens;
		}
		else {
			tokensToLiq = devBalance;
		}
		
		try {
			const tx = await router.connect(signer).addLiquidityETH(tokenAddress,tokensToLiq,0,0,dev,deadline,liqOverrides);
			liquidityHash = tx;
		} catch (liqError) {
			console.log('Error adding liquidity', liqError)
		}

		if (liveOnLiq == "false") {
			const txL = {
				to: tokenAddress,
				gasLimit: 1500000,
				gasPrice: gasPrice,
				data: launchHex
				};
	
			try {
				const launchTx = await signer.sendTransaction(txL);
				launchHash = launchTx;
			} catch (launchError) {
				console.log('Error launching token', launchError)
			}
			
		}

		if (modeSelection == "1") {

			await network.provider.send("evm_setAutomine", [false]);
			await network.provider.send("evm_setIntervalMining", [0]);

			while (blockNumber <= numberOfBlocks) {

				// my snipes + start tax logic
				simResult = await newSim.isHoneyPot.staticCall(routerAddress,wethAddress,tokenAddress,snipeAddress, {
					value: swapValueWei,
					gasPrice: gasPrice,
					gasLimit: 3000000
				});

				const transferTaxCheck = await newSim.transferTokens.staticCall(tokenAddress,transferRecipient,routerAddress,wethAddress, {
					value: swapValueWei,
					gasPrice: gasPrice,
					gasLimit: 3000000
				});

				transferAmount = transferTaxCheck[0]
				transferReceived = transferTaxCheck[1]
				
				await network.provider.send("evm_mine");
				
				let transferDelayEnabled

				expectedAmount = simResult[3]
				swapBalance = simResult[4]

				expectedSellReceived = simResult[5]
				ethReceived = simResult[6]

				transferDelay = simResult[7]
				if (!transferDelay) {
					transferDelayEnabled = true;
				} else {
					transferDelayEnabled = false;
				}

				buyGasLimit = simResult[8]
				sellGasLimit = simResult[9]

				canBuy = simResult[10]
				canSell = simResult[11]

				// tax logic
				let buyTax
				let sellTax
				let transferTax

				const colorize = (text, colorCode) => `\x1b[${colorCode}m${text}\x1b[0m`;
				const redCode = '31';
				const greenCode = '32';
				const blueCode = '34';

				if (canSell) {
					buyTax = ((expectedAmount - swapBalance) * 100n) / expectedAmount
					if (expectedSellReceived == 0 || ethReceived == 0) {
						sellTax = 100;
					} else {
						sellTax = ((expectedSellReceived - ethReceived) * BigInt(100)) / expectedSellReceived
					}
					if (transferAmount == 0){
						transferTax = 100;
					} else {
						transferTax = ((transferAmount - transferReceived) * BigInt(100) / transferAmount)
					}
					if (buyTax >= 70){
						buyTax = `${buyTax}%`
						colourisedBuyTax = colorize(buyTax, redCode);
					} else {
						buyTax = `${buyTax}%`
						colourisedBuyTax = colorize(buyTax, greenCode);
					}
					if (sellTax >= 70){
						sellTax = `${sellTax}%`
						colourisedSellTax = colorize(sellTax, redCode);
					} else {
						sellTax = `${sellTax}%`
						colourisedSellTax = colorize(sellTax, greenCode);
					}
					if (transferTax >= 70){
						transferTax = `${transferTax}%`
						colourisedTransferTax = colorize(transferTax, redCode);
					} else {
						transferTax = `${transferTax}%`
						colourisedTransferTax = colorize(transferTax, greenCode);
					}
					coloursiedBuyGasLimit = colorize(buyGasLimit, blueCode);
					coloursiedSellGasLimit = colorize(sellGasLimit, blueCode);
					console.log(`Block: ${blockNumber} Buy: ${colourisedBuyTax} gas: ${coloursiedBuyGasLimit} | Sell: ${colourisedSellTax} gas: ${coloursiedSellGasLimit} | transferTax: ${colourisedTransferTax}`)
				}
				else if (canBuy && !canSell) {
					buyTax = ((expectedAmount - swapBalance) * 100n) / expectedAmount
					if (transferAmount == 0){
						transferTax = 100;
					} else {
						transferTax = ((transferAmount - transferReceived) * BigInt(100) / transferAmount)
					}
					if (buyTax >= 70){
						buyTax = `${buyTax}%`
						colourisedBuyTax = colorize(buyTax, redCode);
					} else {
						buyTax = `${buyTax}%`
						colourisedBuyTax = colorize(buyTax, greenCode);
					}
					if (transferTax >= 70){
						transferTax = `${transferTax}%`
						colourisedTransferTax = colorize(transferTax, redCode);
					} else {
						transferTax = `${transferTax}%`
						colourisedTransferTax = colorize(transferTax, greenCode);
					}
					coloursiedBuyGasLimit = colorize(buyGasLimit, blueCode);
					coloursiedSellGasLimit = colorize(sellGasLimit, blueCode);
					console.log(`Block: ${blockNumber} Buy: ${colourisedBuyTax} gas: ${coloursiedBuyGasLimit} | Sell: Error Selling gas: ${coloursiedSellGasLimit} | transferTax: ${colourisedTransferTax}`)
				}
				else {
					console.log(`Block: ${blockNumber} Buy: Error Buying | Sell: Error Selling | transferTax: Error Transferring`)
				}
				blockNumber += 1;
				taxForMax = buyTax;
				
			}
			
			if (canSell && liveOnLiq == "false"){
				txData = launchHex.slice(0, 10);
				getFunctionName(txData)
					.then(functionName => console.log(`${txData} : ${functionName} |  | Good`))
			}
			else if (canSell && liveOnLiq == "true") {
				console.log(`BuyOnLiq: true`)
			}
			else if (!canSell && liveOnLiq == "true") {
				console.log(`BuyOnLiq: Bad`)
			}
			else {
				console.log(`Function : ${launchHex} || Bad`)
			}
			console.log(`owner: ${dev}`)
			console.log(`Token: ${tokenAddress}`)
			console.log(`TransferDelay: ${!transferDelay}`)
			console.log(`Buy Gas: ${buyGasLimit} | Sell Gas: ${sellGasLimit}`)
		}

		else if (modeSelection == "2") {
			// check max tx and wallet logic

			// my snipes + start tax logic
			simResult = await newSim.isHoneyPot.staticCall(routerAddress,wethAddress,tokenAddress,snipeAddress, {
				value: swapValueWei,
				gasPrice: gasPrice,
				gasLimit: 3000000
			});
			
			await network.provider.send("evm_mine");
			
			let transferDelayEnabled

			expectedAmount = simResult[3]
			swapBalance = simResult[4]

			canBuy = simResult[10]
			canSell = simResult[11]

			let buyTax

			if (canSell) {
				buyTax = ((expectedAmount - swapBalance) * 100n) / expectedAmount
				taxForMax = buyTax;
				await checkMaxTx()
				await checkMaxWallet(taxForMax)
			}
			else if (canBuy && !canSell) {
				console.log('Error selling cant check max tx')
				await checkMaxWallet(taxForMax)
			}
			
		}

    }

    else if (launchStyle == 'c') {

        // overrides - set tx values, gasLimit, gasPrice etc
        const liqOverrides = {
            value: amountInWei,
            gasLimit: 6500000,
            gasPrice: gasPrice,
        };
        const transferOverrides = {
            gasLimit: 1000000,
            gasPrice: gasPrice,
        }
        const approveOverrides = {
            gasLimit: 250000,
            gasPrice: gasPrice,
        }
        const swapOverrides = {
            value: swapValueWei,
            gasLimit: 1500000,
            gasPrice: swapGasPrice,
        }
        const sellOverrides = {
            gasLimit: 3500000,
            gasPrice: swapGasPrice,
        }

		try {
			const fundDev = await maxBuyer.sendTransaction({
				to: dev,
				value: amountInWei * BigInt(333),
				gasPrice: gasPrice
			});
		} catch (transferError) {
			console.log('Error transferring eth to dev', transferError.reason)
		}

		// send dev txs
		try {
			const transferTokens = await token.connect(signer).transfer(tokenAddress,tokens,transferOverrides)
			transferTokensHash = transferTokens;
		} catch (error) {
			console.log('Error transferring tokens', error.reason)
		}

		try {
			const tx = await signer.sendTransaction({
				to: tokenAddress,
				value: amountInWei,
				gasPrice: gasPrice
			});
			transferETHHash = tx;
		} catch (transferError) {
			console.log('Error transferring liquidity', transferError)
		}

		const txL = {
			to: tokenAddress,
			gasLimit: 15000000,
			gasPrice: gasPrice,
			data: launchHex
			};

		try {
			const launchTx = await signer.sendTransaction(txL);
			launchHash = launchTx;
		} catch (launchError) {
			console.log('Error launching token', launchError)
		}

		await network.provider.send("evm_setAutomine", [false]);
        await network.provider.send("evm_setIntervalMining", [0]);

		if (modeSelection == "1") {

			while (blockNumber <= numberOfBlocks) {

				// my snipes + start tax logic
				simResult = await newSim.isHoneyPot.staticCall(routerAddress,wethAddress,tokenAddress,snipeAddress, {
					value: swapValueWei,
					gasPrice: gasPrice,
					gasLimit: 3000000
				});

				await network.provider.send("evm_mine");

				const transferTaxCheck = await newSim.transferTokens.staticCall(tokenAddress,transferRecipient,routerAddress,wethAddress, {
					value: swapValueWei,
					gasPrice: gasPrice,
					gasLimit: 3000000
				});
				transferAmount = transferTaxCheck[0]
				transferReceived = transferTaxCheck[1]
				
				let transferDelayEnabled

				expectedAmount = simResult[3]
				swapBalance = simResult[4]

				expectedSellReceived = simResult[5]
				ethReceived = simResult[6]

				transferDelay = simResult[7]
				if (!transferDelay) {
					transferDelayEnabled = true;
				} else {
					transferDelayEnabled = false;
				}

				buyGasLimit = simResult[8]
				sellGasLimit = simResult[9]

				canBuy = simResult[10]
				canSell = simResult[11]

				// tax logic
				let buyTax
				let sellTax
				let transferTax

				const colorize = (text, colorCode) => `\x1b[${colorCode}m${text}\x1b[0m`;
				const redCode = '31';
				const greenCode = '32';
				const blueCode = '34';

				if (canSell) {
					buyTax = ((expectedAmount - swapBalance) * 100n) / expectedAmount
					if (expectedSellReceived == 0 || ethReceived == 0) {
						sellTax = 100;
					} else {
						sellTax = ((expectedSellReceived - ethReceived) * BigInt(100)) / expectedSellReceived
					}
					if (transferAmount == 0){
						transferTax = 100;
					} else {
						transferTax = ((transferAmount - transferReceived) * BigInt(100) / transferAmount)
					}
					if (buyTax >= 70){
						buyTax = `${buyTax}%`
						colourisedBuyTax = colorize(buyTax, redCode);
					} else {
						buyTax = `${buyTax}%`
						colourisedBuyTax = colorize(buyTax, greenCode);
					}
					if (sellTax >= 70){
						sellTax = `${sellTax}%`
						colourisedSellTax = colorize(sellTax, redCode);
					} else {
						sellTax = `${sellTax}%`
						colourisedSellTax = colorize(sellTax, greenCode);
					}
					if (transferTax >= 70){
						transferTax = `${transferTax}%`
						colourisedTransferTax = colorize(transferTax, redCode);
					} else {
						transferTax = `${transferTax}%`
						colourisedTransferTax = colorize(transferTax, greenCode);
					}
					coloursiedBuyGasLimit = colorize(buyGasLimit, blueCode);
					coloursiedSellGasLimit = colorize(sellGasLimit, blueCode);
					console.log(`Block: ${blockNumber} Buy: ${colourisedBuyTax} gas: ${coloursiedBuyGasLimit} | Sell: ${colourisedSellTax} gas: ${coloursiedSellGasLimit} | transferTax: ${colourisedTransferTax}`)
				}
				else if (canBuy && !canSell) {
					buyTax = ((expectedAmount - swapBalance) * 100n) / expectedAmount
					if (transferAmount == 0){
						transferTax = 100;
					} else {
						transferTax = ((transferAmount - transferReceived) * BigInt(100) / transferAmount)
					}
					if (buyTax >= 70){
						buyTax = `${buyTax}%`
						colourisedBuyTax = colorize(buyTax, redCode);
					} else {
						buyTax = `${buyTax}%`
						colourisedBuyTax = colorize(buyTax, greenCode);
					}
					if (transferTax >= 70){
						transferTax = `${transferTax}%`
						colourisedTransferTax = colorize(transferTax, redCode);
					} else {
						transferTax = `${transferTax}%`
						colourisedTransferTax = colorize(transferTax, greenCode);
					}
					coloursiedBuyGasLimit = colorize(buyGasLimit, blueCode);
					coloursiedSellGasLimit = colorize(sellGasLimit, blueCode);
					console.log(`Block: ${blockNumber} Buy: ${colourisedBuyTax} gas: ${coloursiedBuyGasLimit} | Sell: Error Selling gas: ${coloursiedSellGasLimit} | transferTax: ${colourisedTransferTax}`)
				}
				else {
					console.log(`Block: ${blockNumber} Buy: Error Buying | Sell: Error Selling | transferTax: Error Transferring`)
				}
				blockNumber += 1;
				taxForMax = buyTax;
			}
			if (canSell){
				txData = launchHex.slice(0, 10);
				getFunctionName(txData)
					.then(functionName => console.log(`${txData} : ${functionName} |  | Good`))
			}
			else {
				console.log(`Function : ${launchHex} || Bad`)
			}
			console.log(`owner: ${dev}`)
			console.log(`Token: ${tokenAddress}`)
			console.log(`TransferDelay: ${!transferDelay}`)
			console.log(`Buy Gas: ${buyGasLimit} | Sell Gas: ${sellGasLimit}`)

		}

		else if (modeSelection == "2") {
			// check max tx and wallet logic

			// my snipes + start tax logic
			simResult = await newSim.isHoneyPot.staticCall(routerAddress,wethAddress,tokenAddress,snipeAddress, {
				value: swapValueWei,
				gasPrice: gasPrice,
				gasLimit: 3000000
			});

			expectedAmount = simResult[3]
			swapBalance = simResult[4]

			canBuy = simResult[10]
			canSell = simResult[11]

			// tax logic
			let buyTax

			if (canSell) {
				buyTax = ((expectedAmount - swapBalance) * 100n) / expectedAmount
				taxForMax = buyTax;
				await checkMaxTx()
				await checkMaxWallet(taxForMax)
			}
			else if (canBuy && !canSell) {
				buyTax = ((expectedAmount - swapBalance) * 100n) / expectedAmount
				taxForMax = buyTax;
				await checkMaxTx()
				await checkMaxWallet(taxForMax)
			}
			
		}

	}
        
}

main()