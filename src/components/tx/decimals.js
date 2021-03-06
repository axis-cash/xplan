import {keys, storage,config} from "../../config/common";
import BigNumber from "bignumber.js";
import Httpprovider from 'axis-web3/lib/web3/httpprovider'
const {cutZero} = require('../../components/tx/utils');


class Decimals {

    constructor() {
    }

    get(currency) {
        let decimal = 18;
        if("AXIS" === currency){
        }else{
            decimal = storage.get(keys.decimalsKey(currency));
            if (!decimal) {
                let httpprovider = new Httpprovider(config.host.rpc);
                const resp =httpprovider.send({
                    "id": 0,
                    "jsonrpc": "2.0",
                    "method": "axis_getDecimal",
                    "params": [currency]
                });
                if (resp.error) {
                    throw new Error(resp.error.message);
                } else {
                    // console.log("decimal>>>>>>>>>>:", JSON.stringify(resp.result))
                    decimal = parseInt(resp.result);
                    storage.set(keys.decimalsKey(currency),decimal);
                }
            }
        }
        return decimal;
    }

    convert(amount, currency, fixed) {
        let decimal = 0;
        try {
            decimal = this.get(currency)
        }catch (e) {
            console.log(e.message)
        }
        if (!fixed) {
            fixed = decimal;
        }
        return cutZero(new BigNumber(amount).dividedBy(new BigNumber(10).pow(new BigNumber(decimal))).toFixed(decimal ))
    }

    mul(amount, currency, fixed) {
        let decimal = this.get(currency);
        if (!fixed && fixed!==0) {
            fixed = decimal;
        }
        return cutZero(new BigNumber(amount).multipliedBy(new BigNumber(10).pow(new BigNumber(decimal))).toFixed(decimal))
    }
}

const decimals = new Decimals();

export {decimals}