import Utils from "../../config/utils";
import {keys} from "../../config/common";
import lstorage from "../database/lstorage";
import {assetService} from "../service/service";
import {accountService} from './accountService'
const jsuperzk = require('jsuperzk')
const utils = new Utils();

class Account {

    constructor(_address){
        this.address = _address
    }

    genWord() {
        try {
            let seed = jsuperzk.genSeed();
            let word = jsuperzk.entropyToMnemonic(seed);
            sessionStorage.setItem("worddata", word);
            sessionStorage.setItem("MnemonicType", "create");
            return word;
        }catch (e) {
            throw new Error(e.message)
        }
    }

    async getSK(password){
        const that = this;
        let address = that.address;
        if(!address){
            const current = await that.getCurrent();
            address = current.address;
        }
        const keystore = await lstorage.get(keys.infoKey(address));
        return new Promise(function (resolve,reject) {
            accountService.getSK({password:password,keystore:keystore},function (msg) {
                if(msg.error){
                    reject(msg.error)
                }else{
                    resolve(msg.data)
                }
            })
        })
    }

    PreCreate(name, password, hint, word) {
        return new Promise(function (resolve, reject) {
            try{
                const data= {
                    password: password,
                    word: word,
                }
                accountService.createAccount(data,function (msg) {
                    const keystore =msg.data;
                    console.log('keystore',keystore)
                    let detail = {
                        address: keystore.address,
                        name: name,
                        hint: hint,
                        tk:keystore.tk,
                        avatar: utils.getRandomAvatar(),
                    }
                    const tempKeystore = {detail: detail, keystore: keystore}
                    // lstorage.delete(keys.account.tempKeystore).then();
                    lstorage.set(keys.account.tempKeystore, tempKeystore).then();
                })
                resolve()
            }catch (e) {
                reject(e);
            }
        })
    }

    async CopyTempKeystore(actType = 'skip') {
        var tempKeystore = await lstorage.get(keys.account.tempKeystore);
        if (!tempKeystore) {
            return new Promise(function (resolve, reject) {
                reject("create account failed! please try again!");
            })
        }
        if(actType == 'normal'){
            tempKeystore.detail.overbackup = true;
            await lstorage.set(keys.account.tempKeystore, tempKeystore);
        }
        const keystore = tempKeystore.keystore;
        let addressArray = await lstorage.get(keys.account.addresses);
        if (addressArray) {
            addressArray.push(keystore.address);
        } else {
            addressArray = [keystore.address];
        }
        await lstorage.set(keys.account.addresses, addressArray);
        await lstorage.set(keys.infoKey(keystore.address), keystore);
        await lstorage.set(keys.detailKey(keystore.address), tempKeystore.detail);
        await this.setCurrent(tempKeystore.detail);
        await lstorage.delete(keys.account.tempKeystore);
    }

    async getTempKeystore(){
        return lstorage.get(keys.account.tempKeystore);
    }

    async exportMnemonic(address, password) {
        const keystore = await lstorage.get(keys.infoKey(address));
        return new Promise(function (resolve, reject) {
            accountService.exportMnemonic({keystore,password},function (msg) {
                if(msg.error){
                    reject(msg.error)
                }else{
                    const word = msg.data;
                    sessionStorage.setItem("worddata", word);
                    sessionStorage.setItem("MnemonicType", "export");
                    resolve(true)
                }
            })
        })
    }

    async importMnemonic(name,hint,word,password){
        const that = this;
        return new Promise(function (resolve,reject) {
            accountService.importMnemonic({word,password},function (msg) {
                if(msg.error){
                    reject(msg.error)
                }else{
                    const keystore = msg.data;
                    that._setStorage(keystore,name,hint).then(()=>{
                        resolve(true);
                    }).then(error=>{
                        reject(error);
                    })
                }
            })
        })
    }

    async _setStorage(keystore,name,hint){
        let addressArray = await lstorage.get(keys.account.addresses);
        const address = keystore.address;
        if (addressArray) {
            for(let addr of addressArray){
                if(addr === address){
                    return new Promise(function (resolve, reject) {
                        reject("Account Exist!!")
                    })
                }
            }
            addressArray.push(address);
        } else {
            addressArray = [address];
        }
        await lstorage.set(keys.account.addresses, addressArray);
        await lstorage.set(keys.infoKey(address), keystore);
        let detail = {
            address: address,
            name: name,
            hint: hint,
            tk:keystore.tk,
            avatar: utils.getRandomAvatar(),
        }
        await this.setCurrent(detail);
        await lstorage.set(keys.detailKey(address), detail);
    }

    async List() {
        let list = [];
        let addresses = await lstorage.get(keys.account.addresses);
        if (addresses) {
            for (let address of addresses) {
                let account = await lstorage.get(keys.infoKey(address));
                list.push(account)
            }
            return list;
        }
        return [];
    }

    async Details() {
        const that = this;
        let list = [];
        let addresses = await lstorage.get(keys.account.addresses);
        if (addresses) {
            for (let address of addresses) {
                // let account = storage.get(keys.detailKey(address));
                const detail = await that.Detail(address);
                list.push(detail)
            }
            return list;
        }
        return [];
    }

    async getCurrent() {
        return await lstorage.get(keys.account.current);
    }

    async setCurrent(info) {
        // console.log(JSON.stringify(info))
        await lstorage.set(keys.account.current, info);
    }

    async setDetail(detail) {
        const current = await lstorage.get(keys.account.current);
        if (current.address === detail.address) {
            await lstorage.set(keys.account.current, detail);
        }
        await lstorage.set(keys.detailKey(detail.address), detail)
    }

    async Keystore() {
        return lstorage.get(keys.infoKey(this.address));
    }

    async Detail(address) {
        if(!address){
            return new Promise(function (resolve, reject) {
                reject("params address required!")
            })
        }
        let detail = await lstorage.get(keys.detailKey(address));
        if (detail) {
            let keystore = await lstorage.get(keys.infoKey(address));
            if(keystore.tk){
                if (!detail.mainPKr) {
                    // detail.mainPKr = jsuperzk.createPkrHash(keystore.tk, 1,keystore.version);
                    detail.mainPKr = 'X'+jsuperzk.createPkrHash(keystore.tk, 1,keystore.version);//AXIS
                }
                if(!detail.currentPKr){
                    // detail.currentPKr =  jsuperzk.createPkrHash(keystore.tk, 1,keystore.version);
                    detail.currentPKr =  'X'+jsuperzk.createPkrHash(keystore.tk, 1,keystore.version);//AXIS
                }
                assetService.getPKrIndex(keystore.tk).then(info=>{
                    // const _pkr = jsuperzk.createPkrHash( keystore.tk, info.PkrIndex,keystore.version);
                    const _pkr = 'X'+jsuperzk.createPkrHash( keystore.tk, info.PkrIndex,keystore.version);//AXIS
                    if(detail.currentPKr !== _pkr){
                        detail.currentPKr = _pkr;
                        lstorage.set(keys.detailKey(address), detail).then();
                    }
                })
            }
            return new Promise(function (resolve, reject) {
                resolve(detail)
            })
        }
    }

}

export default Account