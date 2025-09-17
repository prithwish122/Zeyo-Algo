import {
  Contract,
  abimethod,
  GlobalState,
  Uint64,
} from '@algorandfoundation/algorand-typescript'
import type { uint64 } from '@algorandfoundation/algorand-typescript'

/**
 * A simple contract that manages a counter and basic token data
 */
export class Hello extends Contract {
  public counter = GlobalState<uint64>({ initialValue: Uint64(0) })
  globalState = GlobalState<uint64>({ initialValue: 123, key: 'customKey' })
  globalState1 = GlobalState<uint64>({ initialValue: 456, key: 'customKey1' })
  
  // Simple string storage for wallet asset data
  wallet_asset = GlobalState<string>({ initialValue: '' })
  nextVal = GlobalState<uint64>({ initialValue: 0, key: 'nextVal' })

  /**
   * Increments the counter and returns the new value
   * @returns The new counter value as string
   */
  @abimethod()
  public increment(): string {
    this.counter.value = this.counter.value + 1
    return 'Counter: ' + this.counter.value.toString()
  }

  /**
   * Mints a token for a given address
   * @param metaData - Metadata for the token
   * @param address - The address to mint to
   * @param tokenId - The token ID
   * @param tokenDesc - Token description
   * @returns The updated count value
   */
  @abimethod()
  public mint(metaData: string, address: string, tokenId: string, tokenDesc: string): uint64 {
    // Create a simple concatenated string for storage
    const tokenDataString = metaData + '|' + address + '|' + tokenId + '|' + tokenDesc
    
    // Store the string data
    this.wallet_asset.value = tokenDataString
    
    // Increment the next value counter
    this.nextVal.value = this.nextVal.value + 1
    
    return this.nextVal.value
  }

  /**
   * Get the current counter value
   * @returns Current counter value
   */
  @abimethod({ readonly: true })
  public getCounter(): uint64 {
    return this.counter.value
  }

  /**
   * Get wallet asset data
   * @returns Wallet asset data as string
   */
  @abimethod({ readonly: true })
  public getWalletAsset(): string {
    return this.wallet_asset.value
  }

  /**
   * Get the next value counter
   * @returns Next value counter
   */
  @abimethod({ readonly: true })
  public getNextVal(): uint64 {
    return this.nextVal.value
  }
}