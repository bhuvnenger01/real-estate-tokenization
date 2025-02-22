pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PropertyToken is ERC20 {
    constructor() ERC20("PropertyToken", "PTKN") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
