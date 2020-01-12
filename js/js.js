let gameInstance = UnityLoader.instantiate("gameContainer", "Build/rhythm-dungeon-build-webgl.json", { onProgress: UnityProgress });
window.addEventListener('load', function () {
  mobileCheck();
  changeMainSize();
  addListener();
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    web3.version.getNetwork(async (err, netId) => {
      if (netId != 1) {
        document.getElementById("metamaskWarning").innerText = 'Please connect to mainnet to submit your character and revive.';
        web3 = undefined;
      } else {
        document.getElementById("metamaskWarning").innerText = '';
        try {
          await ethereum.enable();
        } catch (error) {
          web3 = undefined;
          document.getElementById("metamaskWarning").innerText = 'You denied the access to your wallet.';
        }
      }
    });
  } else {
    document.getElementById("metamaskWarning").innerText = 'Please install Metamask and connect to mainnet to upload your character and revive.';
  }
});

function mobileCheck() {
  var userAgent = navigator.userAgent;
  if(userAgent.indexOf('Android') != -1 || userAgent.indexOf('Mobile') != -1){
    document.getElementsByTagName("html")[0].style.zoom = 0.4;
    document.getElementsByClassName("designer")[0].style.width = "200vw";
    document.getElementById("fullscreenBoyContainer").firstChild.style.width = "4vh";
    document.getElementById("fullscreenBoyContainer").firstChild.style.height = "4vh";
    document.getElementsByClassName("bottom")[0].style.marginTop = "15vh";
  }
}

if (typeof web3 != "undefined") {
  let abi = [{ "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "ownerWithdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "isPriceAssigned", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "tokenOwner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "newPrice", "type": "uint256" }], "name": "setPrice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "price", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "reward", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "uint256", "name": "_hp", "type": "uint256" }, { "internalType": "uint256", "name": "_mp", "type": "uint256" }, { "internalType": "uint256", "name": "_str", "type": "uint256" }, { "internalType": "uint256", "name": "_intelli", "type": "uint256" }, { "internalType": "uint256", "name": "_san", "type": "uint256" }, { "internalType": "uint256", "name": "_luck", "type": "uint256" }, { "internalType": "uint256", "name": "_charm", "type": "uint256" }, { "internalType": "uint256", "name": "_mt", "type": "uint256" }, { "internalType": "string", "name": "_optionalAttrs", "type": "string" }], "name": "insertCharacter", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "isGenesisSet", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "aim", "type": "uint256" }], "name": "useRevivalCoins", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "tokenOwner", "type": "address" }], "name": "coinBalanceOf", "outputs": [{ "internalType": "uint256", "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "buy", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "genesisAddress", "type": "address" }], "name": "setGenesis", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "newPrice", "type": "uint256" }], "name": "SetPrice", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "buyer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Buy", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "aim", "type": "uint256" }], "name": "CoinBalanceInsufficient", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "aim", "type": "uint256" }], "name": "SuccessfullyUse", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "receiver", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Reward", "type": "event" }];
  let revivalCoinContract = web3.eth.contract(abi);
  let revivalCoin = revivalCoinContract.at('0x1FB12429900de812942a8baea2f26E34b69fAAB0');
  let successfullyUseEvent = revivalCoin.SuccessfullyUse();
  successfullyUseEvent.watch(function (error, result) {
    if (!error) {
      if (result.args.user == ethereum.selectedAddress)
        gameInstance.SendMessage("JSInterface", "SuccessfullyRevival", result.args.amount.toString());
    } else { console.log(error); }
  });
}

function addListener() {
  let icon = document.getElementsByClassName("designerIcon")[0];
  let designerList = document.getElementsByClassName("designerList")[0];
  let fullscreen = document.getElementsByClassName("fullscreenContainer")[0];
  icon.addEventListener('mouseover',function () {
    icon.style.display = 'none';
    document.getElementsByClassName("designer")[0].style.display = "block";
  })
  designerList.addEventListener('mouseleave',function () {
    icon.style.display = 'block';
    document.getElementsByClassName("designer")[0].style.display = "none";
  })
}

function changeMainSize() {
  let scale = 0.6;
  let main = document.getElementsByTagName("main")[0];
  let container = document.getElementById("gameContainer");
  let mainContainer = document.getElementsByClassName("mainContainer")[0];
  const scaleFlag = (window.screen.width/window.screen.height) - (16/9);
  if(scaleFlag<0){
    let Height = window.screen.height*scale;
    main.style.width = (Height/9)*16 + 'px';
    main.style.height = Height + 'px';
    container.style.width = (Height/9)*16 + 'px';
    container.style.height = Height + 'px';
    mainContainer.style.width = (Height/9)*16 + 'px';
  }else{
    let Width = window.screen.width*scale;
    main.style.width = (Width) + 'px';
    main.style.height = (Width/16)*9 + 'px';
    container.style.width = Width + 'px';
    container.style.height = (Width/16)*9 + 'px';
    mainContainer.style.width = Width + 'px';
  }
}