/**
 * @typedef {{
 *     asm:         string,
 *     hex:         string,
 *     reqSigs:     int,
 *     type:        string,
 *     addresses:   string[]
 * }} ScriptPubKey
 */

/**
 * cid only present on non aggregable assets
 * rules is either true or undefined
 *
 * @typedef {{
 *     assetId:     string,
 *     amount:      string|BigInt,
 *     decimals:    int,
 *     cid:         ?string,
 *     rules:       ?boolean
 * }} AssetCount
 */

/**
 * coinbase inputs only contain - coinbase, and sequence
 * non coinbase inputs contain everything but coinbase(assets may or may not be present)
 * @typedef {{
 *     sequence:    int,
 *
 *     coinbase:    ?string,
 *
 *     value:       ?string|BigInt,
 *     txid:        ?string,
 *     vout:        ?int,
 *     source:      ?int,
 *     scriptSig:   ?{asm:string,hex:string},
 *     scriptPubKey:?ScriptPubKey,
 *
 *     assets:      ?AssetCount[]
 * }} Vin
 */

/**
 * Spent is  the height the output was spent.  Is not present if not spent
 * @typedef {{
 *     value:       string|BigInt,
 *     vout:        int,
 *     spent:       ?int,
 *     scriptPubKey:ScriptPubKey,
 *     assets:      ?AssetCount[]
 * }} Vout
 */


/**
 * @typedef {{
 *     txid:        string,
 *     vout:        int,
 *     value:       string|BigInt,
 *     scriptPubKey:ScriptPubKey,
 *     assets:      ?AssetCount[]
 * }} UTXO
 */

/**
 * change & balance are BigInt but saved as string
 * @typedef {{
 *     assetId:     ?string,
 *     time:        int,
 *     height:      int,
 *     txid:        string,
 *     change:      string|BigInt,
 *     balance:     string|BigInt
 * }} AddressTxRecord
 */

/**
 * @typedef {{
 *     time:        int,
 *     height:      int,
 *     txid:        string,
 *     type:        string,
 *     input:       Object<string|BigInt>,
 *     output:      Object<string|BigInt>
 * }} AssetTxRecord
 */

/**
 * @typedef {{
 *     min:         string|BigInt,
 *     max:         string|BigInt,
 *     sum:         string|BigInt,
 *     count:       int
 * }} DepositWithdraw
 */

/**
 * kyc can not use both allow and ban
 * can not use both vote and expires(vote.cutoff is same as expires)
 *
 * vote.options is always outputted in object form even if input is array of strings only
 * vote.options can not mix the 2 forms.
 *
 * effective is never set by issuer.  It is set based on height issuance is added to chain.
 * Old rules are valid for 240 blocks after rule change.  transfers made in the overlapping time are valid if they follow
 * either set of rules
 *
 * deflate requires that many be burned at every transfer
 *
 *
 * @typedef {{
 *     rewritable:  boolean,
 *     effective:   int,
 *     signers:     ?{
 *         required:    ?int,
 *         list:        Object<int>
 *     },
 *     royalties:  ?Object<int|BigInt>,
 *     kyc:    ?{
 *         allow:    ?string[],
 *         ban:      ?string[]
 *     }|boolean,
 *     vote:    ?{
 *         options: string[]|{address:string,label:string}[],
 *         movable: boolean,
 *         cutoff:  ?int
 *     },
 *     currency:    ?string|{
 *         address: string,
 *         index:   int,
 *         name:    string
 *     },
 *     expires:     ?int,
 *     deflate:     ?int|BigInt
 * }} AssetRules
 */


/*
██╗  ██╗██╗   ██╗ ██████╗
██║ ██╔╝╚██╗ ██╔╝██╔════╝
█████╔╝  ╚████╔╝ ██║
██╔═██╗   ╚██╔╝  ██║
██║  ██╗   ██║   ╚██████╗
╚═╝  ╚═╝   ╚═╝    ╚═════╝
 */

/**
 * Eiter name or hash will always be present but not both.
 * Revoked is the block height the KYC status was revoked and is only present if the account holder signals there wallet was hacked.
 * @typedef {{
 *         country: string,
 *         name:    ?string,
 *         hash:    ?string,
 *         revoked: ?int
 * }} KycState
 */

/**
 * type can be secret if name and pin where provided
 * @typedef {{
 *     type:    "KycPublic"|"KycSecret",
 *     address: string,
 *     country: string,
 *     name:    string
 * }}   KycPublic
 */

/**
 * @typedef {{
 *     type:    "KycSecret",
 *     address: string,
 *     country: string,
 *     hash:    Buffer
 * }}   KycSecret
 */

/**
 * @typedef {{
 *     type:    "KycRevoke",
 *     address: string,
 *     height:  int
 * }}   KycRevoke
 */



/*
███████╗██╗██╗     ███████╗███████╗
██╔════╝██║██║     ██╔════╝██╔════╝
█████╗  ██║██║     █████╗  ███████╗
██╔══╝  ██║██║     ██╔══╝  ╚════██║
██║     ██║███████╗███████╗███████║
╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝
 */

/**
 * Key=address
 * @typedef {{
 *     address:     string,
 *     index:       int,
 *     group:       int,
 *     firstUsed:   int,
 *     lastUsed:    int,
 *     txs:         AddressTxRecord[],
 *     deposit:     DepositWithdraw,
 *     withdraw:    ?DepositWithdraw,
 *     assets:      Object<string|BigInt>,
 *     kyc:         ?KycState,
 *     issuance:    ?string[]
 * }} AddressData
 */

/**
 * Key={Address}_utxos
 * @typedef {{
 *     txid:        string,
 *     vout:        int,
 *     value:       string|BigInt,
 *     assets:      ?AssetCount[]
 * }[]} AddressUtxoData
 */

/**
 * Key=height or hash
 * @typedef {{
 *      hash:           string,
 *      strippedsize:   int,
 *      size:           int,
 *      weight:         int,
 *      height:         int,
 *      version:        int,
 *      pow_algo_id:    int,
 *      time:           int,
 *      mediantime:     int,
 *      difficulty:     Number,
 *      nTx:            int,
 *      previousblockhash: string,
 *      nextblockhash:  ?string,
 *      tx:             TxData[]
 * }} DigiByteBlockData
 * */


/**
 * Key=txid
 * @typedef {{
 *     txid:       string,
 *     vin:        Vin[],
 *     vout:       Vout[],
 *     blockhash:  string,
 *     height:     int,
 *     time:       int
 * }} TxData
 */

/**
 * Key=assetId
 *
 * @typedef {{
 *     assetId:     string,
 *     issuer:      string,
 *     locked:      boolean,
 *     aggregation: "aggregatable"|"hybrid"|"dispersed",
 *     divisibility:int,
 *     holders:     Object<string|BigInt>,
 *     supply:  {
 *         initial: string|BigInt,
 *         current: string|BigInt
 *     },
 *     metadata:    {
 *         txid:    string,
 *         cid:     string
 *     }[],
 *     rules:       ?AssetRules[],
 *     txs:         AssetTxRecord[],
 *     votes:       ?{
 *                      label:      string,
 *                      address:    string,
 *                      count:      int
 *                   }[],
 *     firstUsed:   int,
 *     lastUsed:    int,
 *     expired:     ?boolean,
 *     kyc:         ?KycState
 * }} AssetData
 */


/**
 * Key=`index_block_${Math.floor(height/1000)}000`
 * @typedef {
 *     {
 *         height:      int,
 *         txs:         int,
 *         algo:        int,
 *         time:        int,
 *         difficulty:  Number
 *     }[]
 * } BlockIndexData
 */

/**
 * Key=`index_asset_${Math.floor(height/1000)}000`
 * @typedef {
 *     {
 *         assetId:     string,
 *         height:      height,
 *         time:        int,
 *         torrent:     string,
 *         metadataHash:string
 *     }[]
 * } AssetIndexData
 */

/**
 * Key='height'
 * Returns the current height synced
 * @typedef {int} HeightData
 */

/**
 * Key=`data_coinbase_${Math.floor(height/100000)}00000`
 * @typedef {{
 *         height:  int,
 *         hash:    string,
 *         data:    string
 *     }[]} CoinbaseOpReturnData
 */

/**
 * Key=`data_tx_${Math.floor(height/100000)}00000`
 * @typedef {{
 *         height:  int,
 *         txid:    string,
 *         vout:    int,
 *         data:    string|boolean|int
 *     }[]} TxOpReturnData
 */