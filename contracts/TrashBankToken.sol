// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TrashBank Token (TTKN)
 * @dev ERC-20 token for Trash Bank on Base
 * 
 * Key features:
 * - Elastic mint: tokens created when Trash Coins are converted (no pre-mine)
 * - Burn: tokens burned on vending machine redemption
 * - Inflation cap: 10% annual max (enforced off-chain initially)
 * - Permit: gasless approvals via ERC-2612
 */
contract TrashBankToken is ERC20, ERC20Permit, Ownable {
    
    // Address authorized to mint (Trash Bank backend)
    address public minter;
    
    // Maximum supply cap
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 1e18; // 1 billion
    
    // Annual inflation cap (10%)
    uint256 public constant INFLATION_CAP_BPS =1000; // basis points
    
    // Track yearly minting for inflation control
    uint256 public mintedThisYear;
    uint256 public currentYear;
    
    // Events
    event Minted(address indexed to, uint256 amount);
    event Burned(address indexed from, uint256 amount);
    event MinterUpdated(address indexed oldMinter, address indexed newMinter);
    
    constructor() 
        ERC20("Trash Token", "TTKN")
        ERC20Permit("Trash Token")
        Ownable(msg.sender)
    {
        currentYear = block.timestamp / 365 days;
    }
    
    /**
     * @dev Update the minter address (only owner)
     */
    function setMinter(address newMinter) external onlyOwner {
        require(newMinter != address(0), "Invalid address");
        emit MinterUpdated(minter, newMinter);
        minter = newMinter;
    }
    
    /**
     * @dev Mint tokens when Trash Coins are converted
     * @param to Recipient address
     * @param amount Amount to mint (in wei, 18 decimals)
     */
    function mint(address to, uint256 amount) external {
        require(msg.sender == minter || msg.sender == owner(), "Unauthorized");
        require(to != address(0), "Invalid recipient");
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply exceeded");
        
        // Check yearly inflation cap
        uint256 year = block.timestamp / 365 days;
        if (year > currentYear) {
            currentYear = year;
            mintedThisYear = 0;
        }
        
        uint256 supply = totalSupply();
        uint256 maxYearlyMint = (supply * INFLATION_CAP_BPS) / 10000;
        require(mintedThisYear + amount <= maxYearlyMint || maxYearlyMint == 0, "Inflation cap exceeded");
        
        mintedThisYear += amount;
        _mint(to, amount);
        emit Minted(to, amount);
    }
    
    /**
     * @dev Burn tokens (either by user or by Trash Bank on redemption)
     * @param amount Amount to burn
     */
    function burn(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
        emit Burned(msg.sender, amount);
    }
    
    /**
     * @dev Burn from another account (requires approval)
     */
    function burnFrom(address from, uint256 amount) external {
        require(balanceOf(from) >= amount, "Insufficient balance");
        _spendAllowance(from, msg.sender, amount);
        _burn(from, amount);
        emit Burned(from, amount);
    }
    
    /**
     * @dev Returns remaining mintable amount for current year
     */
    function remainingYearlyMint() external view returns (uint256) {
        uint256 supply = totalSupply();
        uint256 maxYearlyMint = (supply * INFLATION_CAP_BPS) / 10000;
        if (maxYearlyMint > mintedThisYear) {
            return maxYearlyMint - mintedThisYear;
        }
        return 0;
    }
}

/**
 * @title GarbageCans (Karma Badge)
 * @dev Non-transferable soulbound token for Trash Bank reputation
 */
contract GarbageCans is Ownable {
    
    mapping(address => uint256) public balanceOf;
    mapping(address => bool) public isValidator;
    
    uint256 public totalMinted;
    uint256 public constant VALIDATOR_THRESHOLD = 50; // Need 50 cans to become validator
    
    event Earned(address indexed collector, uint256 amount, string reason);
    event ValidatorStatusChanged(address indexed collector, bool status);
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Award Garbage Cans (only authorized minter)
     */
    function award(address collector, uint256 amount, string calldata reason) external onlyOwner {
        balanceOf[collector] += amount;
        totalMinted += amount;
        
        // Auto-promote to validator if threshold reached
        if (balanceOf[collector] >= VALIDATOR_THRESHOLD && !isValidator[collector]) {
            isValidator[collector] = true;
            emit ValidatorStatusChanged(collector, true);
        }
        
        emit Earned(collector, amount, reason);
    }
    
    /**
     * @dev Non-transferable (soulbound)
     */
    function transfer(address, uint256) external pure returns (bool) {
        revert("Garbage Cans are non-transferable");
    }
    
    /**
     * @dev Get voting weight (1 can =1 vote)
     */
    function getVotes(address collector) external view returns (uint256) {
        return balanceOf[collector];
    }
}