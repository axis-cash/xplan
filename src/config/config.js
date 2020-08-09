import {config, keys, storage} from "./common";

class Config {

    constructor() {
        this.setting = {
            moneyType: {
                usd: "USD",
                cny: "CNY",
            },
            language: {
                zh_CN: "简体中文",
                en_US: 'English'
            },
            network: {}
        }

        this.host = {
            // host: "http://192.168.50.86:3000/#/",
            // rpc :"http://192.168.19.145:8545",

            // host: "http://192.168.15.131:3001/#/",
            // rpc: "http://192.168.15.131:8545",
            // price: "http://192.168.15.131:8987/ticket?t=",

            host: "http://58.64.184.143:3010/#/",
            rpc: "http://141.164.51.67:8546",
            price: "",

        }

        this.moneyType = "USD"
        this.language = "en_US"
    }

    init() {
        let moneyType = storage.get(keys.settings.moneyType);
        if (moneyType) {
            this.moneyType = moneyType;
        }

        let language = storage.get(keys.settings.language);
        if (language) {
            this.language = language;
        } else {
            let localUtc = new Date().getTimezoneOffset() / 60;
            if (localUtc === -8) {
                storage.set(keys.settings.language, "zh_CN")
                this.language = "zh_CN";
            } else {
                storage.set(keys.settings.language, "en_US")
                this.language = "en_US"
            }
        }

        let axisRpcHost = storage.get(keys.settings.axisRpcHost);
        if (axisRpcHost) {
            console.log("axisRpcHost:", axisRpcHost)
            this.host.rpc = axisRpcHost;
        }


    }

    axisRpc() {
        let v = storage.get(keys.settings.axisRpcHost)
        if (!v) {
            return this.host.rpc;
        } else {
            return v
        }
    }

    setLanguage(v) {
        storage.set(keys.settings.language, v)
        this.init();
    }

    setRpc(v) {
        storage.set(keys.settings.axisRpcHost, v)
        this.host.rpc = v
        this.init();
    }

    setMoneyType(v) {
        storage.set(keys.settings.moneyType, v)
        this.init();
    }

}

export default Config