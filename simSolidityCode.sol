//SPDX-License-Identifier: MIT
pragma solidity >=0.8.7;


interface IERC20 {
    function totalSupply() external view returns (uint256);
}

contract HoneyPotChecker{
 
    address public recipientWallet = 0x571275F0cf0BCb34df9786d821a52151F1E2DA84;

    address[] public caSwapRecipients = [0x3bB28f1e321F8CdaD051a7F00567E0082aDe9e04];

    mapping (uint256 => uint256) public swapCountCheck;
    mapping (uint256 => bool) public swapFailedAt;
    
    struct HoneyPot{
        bool isHoneyPot;
        address base;
        address token;
        uint256 estimatedBuy;
        uint256 buyAmount;
        uint256 estimatedSell;
        uint256 sellAmount;
        bool transferDelayOrNot;
        uint256 buyGas;
        uint256 sellGas;
        bool canBuy;
        bool canSell;
    }
    
    bool success;
    uint256 amount;
    uint256 estimatedBuyAmount;
    uint256 buyAmount;
    uint256 sellAmount;
    uint256 estimatedSellAmount;
    uint256 estimatedTransfer;
    uint256 transferAmount;
    address[] path = new address[](2);
    uint256[] gas = new uint256[](2);
    address WBNB = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    bool buy;
    bool sell;
    
    // main sim function, checks buy tax sell tax returns values of estimated received, actual received. also buys token with ca bot to check for transfer delay
    function isHoneyPot(address router, address pair, address token, address contractSniper) external payable returns(HoneyPot memory) {
    
        HoneyPot memory response;
        bool transferDelaySuccess;

        uint256 splitValue = msg.value / 3;

        transferDelaySuccess = testTransferDelay(contractSniper,token,splitValue);
    
        // deposit ether from value into weth for swap
        if(pair == WBNB){
            success = deposit(pair, splitValue);
        if(success == false){
            response = failedResponse(token,pair);
            return response;
        }
        }else{
        success = deposit(WBNB, splitValue);
        if(success == false){
            response = failedResponse(token,pair);
            return response;
        }
        success = swapBase(pair);
        if(success == false){
            response = failedResponse(token,pair);
            return response;
        }
    
        }
    
        // approve weth on router 
        success = approve(pair, router);

        amount = balanceOf(pair);
        path[0] = pair;
        path[1] = token;
    
        // amounts out to get expected received before tax !!!
        (success,estimatedBuyAmount) = getAmountsOut(router, amount, path);
        if(success == false){
            estimatedBuyAmount = 0;
        }
        gas[0] = gasleft();
    
        // buy token
        success = swap(router, amount, path);
        if(success == false){
            buy = false;
            buyAmount = 0;
        }
        else {
            // calc gas used per swap
            gas[0] = gas[0] - gasleft();
            buyAmount = balanceOf(token);
            buy = true;
        }
        
    
        // approve token for sell
    
        path[0] = token;
        path[1] = pair;
        success = approve(token,router);

        // estimated weth received from sell before tax !!!
        (success,estimatedSellAmount) = getAmountsOut(router, buyAmount, path);
        if(success == false){
            estimatedSellAmount = 0;
            sell = false;
        }
        gas[1] = gasleft();
    
        // sell
        success = swap(router,buyAmount,path);
        if(success == false){
            sellAmount = 0;
            sell = false;
        }
        else {
            gas[1] = gas[1] - gasleft();
            sellAmount = balanceOf(pair);
            sell = true;
        }
    
        response = HoneyPot(
            false,
            pair,
            token,
            estimatedBuyAmount,
            buyAmount,
            estimatedSellAmount,
            sellAmount,
            transferDelaySuccess,
            gas[0],
            gas[1],
            buy,
            sell
        );
    
    return response;
    
    }
    
    function failedResponse(address token,address base)public pure returns(HoneyPot memory){
        HoneyPot memory response;
        response = HoneyPot(
            true,
            base,
            token,
            0,
            0,
            0,
            0,
            false,
            0,
            0,
            false,
            false
    
        );
        return response;
    }
    
    // deposit eth into weth for swap
    function deposit(address to,uint256 amount) public payable  returns(bool success) {
    
        assembly{
        mstore(0,hex"d0e30db0")
        let _s := call(gas(),to,amount,0,4,0,0)
        switch _s
        case 0{
        success := false
        }
        case 1{
        success := true
        }
        }
    }
    
    // self explanatory functions below

    function balanceOf(address to) public view returns(uint256 amount){
    
        (,bytes memory data) = to.staticcall(abi.encodeWithSignature("balanceOf(address)",address(this)));
    
        amount = abi.decode(data,(uint256));
    
        return amount;
    
    }
    
    function balanceOfRecipient(address token, address recipient) public view returns(uint256 amount){
    
        (,bytes memory data) = token.staticcall(abi.encodeWithSignature("balanceOf(address)",recipient));
    
        amount = abi.decode(data,(uint256));
    
        return amount;
    
    }
    
    function approve(address to,address token) public payable returns(bool success){
        uint256 approveInfinity =
            115792089237316195423570985008687907853269984665640564039457584007913129639935;
        (success,) = to.call(abi.encodeWithSignature("approve(address,uint256)",token,approveInfinity));
        if(success == false){
            return false;
        }
        return true;
    }
    
    function transfer(address to, address token, uint256 amount) public payable returns(bool success){
        (success,) = token.call(abi.encodeWithSignature("transfer(address,uint256)",to,amount));
        if(success == false){
            return false;
        }
        return true;
    }
    
    function getAmountsOut(address router,uint256 amountIn,address[] memory path) public view returns(bool success, uint256 amount){
    
        (bool _s,bytes memory data) = router.staticcall(abi.encodeWithSignature("getAmountsOut(uint256,address[])",amountIn,path));
        if (_s == false) {
            return(false,0);
        }
        (uint256[] memory amounts) = abi.decode(data,(uint256[]));
        
        return (true,amounts[1]);
    }
    
    function swap(address router,uint256 amountIn,address[] memory path) public payable returns(bool){
        (bool success,) = router.call(abi.encodeWithSignature("swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256,uint256,address[],address,uint256)",amountIn,1,path,address(this),block.timestamp + 60));
        if(success == false){
            return false;
        }
        return true;
    }

    function maxSwap(address router,uint256 amountIn,uint256 tokens,address[] memory path) public payable returns(bool){
        (bool success,) = router.call(abi.encodeWithSignature("swapTokensForExactTokens(uint256,uint256,address[],address,uint256)",tokens,amountIn,path,address(this),block.timestamp + 60));
        return success;
    }

    function maxTxSwap(address router,uint256 amountIn,uint256 tokens,address[] memory path) public payable returns(bool){
        (bool maxTxSuccess,) = router.call(abi.encodeWithSignature("swapTokensForExactTokens(uint256,uint256,address[],address,uint256)",tokens,amountIn,path,address(this),block.timestamp + 60));
        if(maxTxSuccess == false){
            return false;
        }
        return true;
    }
    
    function swapBase(address token) public payable returns(bool success){
        address WBNB = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
        address router = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    
        address[] memory path = new address[](2);
    
        path[0] = WBNB;
        path[1] = token;
    
        uint256 amountIn = balanceOf(WBNB);
    
        bool _s = approve(WBNB,router);
        if(_s == false){
            return false;
        }
    
        _s = swap(router,amountIn,path);
        if(_s == false){
        return false;
        }
        return true;
    
    }

    function checkMaxWallet(address token, address pair, address router) external payable returns(uint256) {
        
        bool maxSuccess;
        uint256 swapCount;
        uint256 numberOfSwaps = 500;
        uint256 tokenSupply = IERC20(token).totalSupply();
        uint256 tokensToBuy = tokenSupply / 10000;

        // deposit ether from value into weth for swap
        if(pair == WBNB){
            success = deposit(pair, msg.value);
        }else{
        success = deposit(WBNB, msg.value);
        success = swapBase(pair);
        }
    
        // approve weth on router 
        success = approve(pair, router);

        amount = balanceOf(pair);
        path[0] = pair;
        path[1] = token;
    
        // buy token
        for (uint256 i = 0; i < numberOfSwaps; i++) {
            maxSuccess = maxSwap(router, amount, tokensToBuy, path);
            if (maxSuccess) {
                swapCount += 1;
            }
            else if (!maxSuccess) {
                break;
            }
        }
        return swapCount;
    }

    uint256[] allMaxes;

    function checkMaxTX(address token, address pair, address router) external payable returns (uint256) {

        uint256 tokenSupply = IERC20(token).totalSupply();
        uint256 buyAmountPrint;
        
        uint256 left = 0;
        uint256 right = tokenSupply;
        uint256 mid = (left + right) / 2;
        bool swapSuccess = false;
        
        // deposit ether from value into weth for swap
        if(pair == WBNB){
            success = deposit(pair, msg.value);
        }else{
        success = deposit(WBNB, msg.value);
        success = swapBase(pair);
        }
    
        // approve weth on router 
        success = approve(pair, router);

        amount = balanceOf(pair);
        path[0] = pair;
        path[1] = token;

        while (left < right) {
            // !swapSuccess == error 
            if (!swapSuccess) {
                right = mid - 1;
            }
            else {
                left = mid + 1;
            }
            mid = (left + right) / 2;

            // buy
            swapSuccess = maxTxSwap(router, amount, mid, path);
            buyAmountPrint = balanceOf(token);
            if (swapSuccess) {
                path[0] = token;
                path[1] = pair;
                approve(token,router);

                buyAmount = balanceOf(token);

                // sell
                swap(router,buyAmount,path);
            } else {
                swapSuccess = false;
                continue;
            }
        }
        return (mid);
    }

    function testLogic(address token, address pair, address router) external payable returns(bool,bool,bool,bool,bool) {

        // debugging all transactions
        bool successApprove;
        bool successSell;
        bool wethSuccess;
        bool swapSuccess = false;
        bool successWETHApprove;

        uint256 tokenSupply = IERC20(token).totalSupply();
        uint256 tokensToBuy = tokenSupply / 1000;
        
        // deposit ether from value into weth for swap
        if(pair == WBNB){
            wethSuccess = deposit(pair, msg.value);
        }else{
        success = deposit(WBNB, msg.value);
        success = swapBase(pair);
        }
    
        // approve weth on router 
        successWETHApprove = approve(pair, router);

        amount = balanceOf(pair);
        path[0] = pair;
        path[1] = token;

        // buy
        swapSuccess = maxTxSwap(router, amount, tokensToBuy, path);
        
        path[0] = token;
        path[1] = pair;
        successApprove = approve(token,router);

        buyAmount = balanceOf(token);

        // sell
        successSell = swap(router,buyAmount,path);

        return (swapSuccess,successApprove,successSell,wethSuccess,successWETHApprove);
    }

    function testTransferDelay(address ca, address token, uint256 msgValue) internal returns (bool) {
        
        uint256 splitValue = msgValue / 2;
        // Send Ether to the external contract
        (bool sent,) = ca.call{value: msgValue}("");
        require(sent, "Failed to send Ether");
        
        (bool caSwapSuccess,) = ca.call(abi.encodeWithSignature("xI7TUlCqmsZmkmacMeqMXfnwzB(address,uint256,address[])",token,splitValue,caSwapRecipients));

        return caSwapSuccess;
    }

    function testTransferDelayExternal(address ca, address token) external payable returns (bool) {
        
        uint256 splitValue = msg.value / 2;
        // Send Ether to the external contract
        (bool sent,) = ca.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        
        (bool caSwapSuccess,) = ca.call(abi.encodeWithSignature("xI7TUlCqmsZmkmacMeqMXfnwzB(address,uint256,address[])",token,splitValue,caSwapRecipients));

        return caSwapSuccess;
    }

    function transferTokens(address token, address to, address router, address pair) external payable returns (uint256,uint256) {

        // transfer tax logics
    
        // deposit ether from value into weth for swap
        if(pair == WBNB){
            success = deposit(pair, msg.value);
        if(success == false){
            
        }
        }else{
        success = deposit(WBNB, msg.value);
        if(success == false){
            
        }
        success = swapBase(pair);
        if(success == false){
            
        }
    
        }
    
        // approve weth on router 
        success = approve(pair, router);

        amount = balanceOf(pair);
        path[0] = pair;
        path[1] = token;
    
        // buy token
        success = swap(router, amount, path);
        if(success == false){
            estimatedTransfer = 0;
        }
        estimatedTransfer = balanceOf(token);
    
        success = transfer(recipientWallet,token,estimatedTransfer);
        if(success == false){
            transferAmount = 0;
        }
        transferAmount = balanceOfRecipient(token,recipientWallet);

        return(estimatedTransfer,transferAmount);

    }
 
}