import {
  Contract,
  abimethod,
  Application,
  GlobalState,
  Uint64,
  itxn,
  arc4,
} from '@algorandfoundation/algorand-typescript'
import type { uint64 } from '@algorandfoundation/algorand-typescript'

/**
 * A contract that increments a counter
 */
export class Hello extends Contract {
  public counter = GlobalState<uint64>({ initialValue: Uint64(0) })
  globalState = GlobalState<uint64>({ initialValue: 123, key: 'customKey' })
  globalState1 = GlobalState<uint64>({ initialValue: 123, key: 'customKey' })

  tokenId = GlobalState<string>({ initialValue: '1' })
  tokenDesc = GlobalState<string>({ initialValue: '' })
  metaData = GlobalState<string>({ initialValue: '' })
  nextVal = GlobalState<uint64>({ initialValue: 0, key: 'nextVal' })
  /**
   * Increments the counter and returns the new value
   * @returns The new counter value
   */



  // @abimethod()
  public increment(): uint64 {
    this.counter.value = this.counter.value + 1
    return this.counter.value

    // let obj = { first: 'John', last: 'Doh' }
    // obj = { ...obj, first: 'Jane' }
    // return this.globalState.value;
    // return obj.first
  }

  public mint(metaData: string): uint64 {
    // Store the latest token info
    // this.tokenId.value = tokenId;
    // this.tokenDesc.value = tokenDesc;
    this.metaData.value = metaData;
    this.nextVal.value = this.nextVal.value + 1;
    return this.nextVal.value;
  }

  public getLatestMetaData(): string {
    return this.metaData.value; 
  }
}
