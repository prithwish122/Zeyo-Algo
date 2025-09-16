// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SBT - User-Mintable Badge Contract
 * @dev Users can mint badges by providing a name, each badge gets a unique ID
 */
contract SBT_Badge is ERC1155, Ownable {
    
    /// @dev Mapping from badge ID to badge name
    mapping(uint256 => string) public badgeNames;
    
    /// @dev Mapping to track if user has a specific badge
    mapping(address => mapping(uint256 => bool)) public hasBadge;
    
    /// @dev Counter for unique badge IDs
    uint256 public nextBadgeId = 1;
    
    // Events
    event BadgeMinted(address indexed to, uint256 indexed badgeId, string name);
    
    // Custom errors
    error AlreadyHasBadge();
    error EmptyBadgeName();
    
    /**
     * @dev Constructor
     * @param uri Base URI for token metadata
     */
    constructor(string memory uri) ERC1155(uri) Ownable(msg.sender) {}
    
    /**
     * @dev Mint a badge with custom name (anyone can call)
     * @param name Name of the badge to mint
     * @return badgeId The unique ID of the minted badge
     */
    function mintBadge(string calldata name) external returns (uint256 badgeId) {
        if (bytes(name).length == 0) revert EmptyBadgeName();
        
        badgeId = nextBadgeId++;
        
        // Store badge name
        badgeNames[badgeId] = name;
        
        // Mark user as having this badge
        hasBadge[msg.sender][badgeId] = true;
        
        // Mint the badge
        _mint(msg.sender, badgeId, 1, "");
        
        emit BadgeMinted(msg.sender, badgeId, name);
    }
    
    /**
     * @dev Check if user has a specific badge
     * @param user Address to check
     * @param badgeId Badge ID to check
     * @return Whether the user has the badge
     */
    function hasSpecificBadge(address user, uint256 badgeId) external view returns (bool) {
        return hasBadge[user][badgeId];
    }
    
    /**
     * @dev Get badge name by ID
     * @param badgeId Badge ID to query
     * @return Badge name
     */
    function getBadgeName(uint256 badgeId) external view returns (string memory) {
        return badgeNames[badgeId];
    }
    
    /**
     * @dev Override to prevent transfers (soulbound)
     */
    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override {
        // Only allow minting (from = address(0))
        require(from == address(0), "Soulbound: Transfer not allowed");
        super._update(from, to, ids, values);
    }
    
    /**
     * @dev Disable approvals for soulbound tokens
     */
    function setApprovalForAll(address, bool) public pure override {
        revert("Soulbound: Approvals not allowed");
    }
    
    /**
     * @dev Update metadata URI (only owner)
     */
    function setURI(string memory newURI) external onlyOwner {
        _setURI(newURI);
    }
}