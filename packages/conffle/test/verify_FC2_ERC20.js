const ConfluxWeb = require('conflux-web');
const confluxWeb = new ConfluxWeb('http://testnet-jsonrpc.conflux-chain.org:12537');

function verify() {

    const fd = require("/Users/liping/about_CFX_Work/about_conffle_test/demo-test/build/Erc20TokenTemplate.sol.json");
    const abi = fd.abi;
    const myContract = new confluxWeb.cfx.Contract(abi, "0x23f758a4d529c4383abc710e1ee9b70641863503", {
        defaultGasPrice: '1000000'
    });
    console.log("myContract:", myContract.options);
    myContract.methods.totalSupply().call().then((result) => {
        console.log("contract call function totalSupply result will be:" + result);
    }).catch(console.error);

    myContract.methods.balanceOf("0x47281a1ce19b4c7666d0205ea0c50d78f82f1334").call().then((result) => {
        console.log("contract call function balanceOf result will be:" + result);
    }).catch(console.error);

    //myContract.methods.transfer("0xe1680683be13895b59c94eaf61818975a0d105dd").call().then((result) => {
    //    console.log("contract call function balanceOf result will be:" + result);
    //}).catch(console.error);




}


verify()