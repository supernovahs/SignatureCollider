# SignatureCollider
Check signature collision between a proxy and implementation 


## What is signature collision ?

Every function in ethereum has a unique hash of 4 bytes. This is calculated by the below formula

```
bytes4(keccak256(bytes("transfer(address,uint256)")))
```
These 4 bytes are called function selectors. On a low level , this is used to identify which function needs to be called. 
Therefore, in a given contract , all function signatures must be unique. Or it can create huge problem. The solidity compiler prevents this by throwing an error while compiling.

But , when creating proxy and implementation contract, there is a chance , we miss this as there is no direct link between proxy and implementation contract. 

Consider this situation:

Proxy contract has this function 

```
function collate_propagate_storage(bytes16) public {
  ERC20.transfer(to,amount);
}
```

And the implementation has this function

```
function burn(uint256 amount) public {
  _burn(owner,amount);
}

```
When a user calls the proxy to transfer tokens, i.e call `collate_propagate_storage`, the proxy will instead call the burn function . Thereby burning tokens instead of transferring them. 

This application prevents this by checking if the function signature of the proxy and implementation are same i.e collide.
## To run 

```
npm run collide <Proxy Contract Name> <Implementation contract Name > 
```

## Add Your Proxy file and implementation file in respective folder


## Requirements 

#### Foundry 
#### node

