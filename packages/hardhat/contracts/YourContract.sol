pragma solidity 0.6.7;
//SPDX-License-Identifier: MIT

//import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract YourContract is ERC20{

  constructor() public ERC20("MoatToken","MOAT") {
    _mint(0x8F72B778Ce0a9d8Bd81F5E04244AAfFC98413873,10 ether);
  }

}
