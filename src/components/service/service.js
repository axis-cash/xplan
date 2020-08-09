import {config} from "../../config/common";
import {XplanService} from 'xplan-service'
const xpservice = new XplanService();

class AssetService {
    init() {
        xpservice.init(config.axisRpc(),10*1000,function (data) {
            console.log("init data:",data)
        })
    }

    balanceOf(tk) {
        return new Promise(function (resolve,reject) {
            xpservice.balanceOf(tk,function (msg) {
                if(msg.error){
                    reject(msg.error)
                }else{
                    resolve(msg.data)
                }
            })
        })
    }

    initAccount(tk) {
        return new Promise(function (resolve, reject) {
            xpservice.initAccount(tk, function (msg) {
                if (msg.error) {
                    reject(msg.error)
                } else {
                    resolve(msg.data)
                }
            })
        })
    }

    getTxList(tk,cy,count){
        console.log("getTxList>>>>>>",cy,count)
        return new Promise(function (resolve, reject) {
            let query = {tk: tk, cy: cy, count: count}
            xpservice.getTxList(query,function (msg) {
                if (msg.error) {
                    reject(msg.error)
                } else {
                    resolve(msg.data)
                }
            })
        })
    }

    getTxDetail(tk,hash){
        return new Promise(function (resolve, reject) {
            xpservice.getTxDetail(tk,hash,function (msg) {
                if (msg.error) {
                    reject(msg.error)
                } else {
                    resolve(msg.data)
                }
            })
        })
    }

    getPKrIndex(tk){
        return new Promise(function (resolve, reject) {
            xpservice.getPKrIndex(tk,function (msg) {
                if (msg.error) {
                    reject(msg.error)
                } else {
                    resolve(msg.data)
                }
            })
        })
    }

    commitTx(tx){
        return new Promise(function (resolve, reject) {
            xpservice.commitTx(tx,function (msg) {
                if (msg.error) {
                    reject(msg.error)
                } else {
                    resolve(msg.data)
                }
            })
        })
    }

    getPrice(t){
        return new Promise(function (resolve, reject) {
            xpservice.getAxisPrice(t,function (msg) {
                if (msg.error) {
                    reject(msg.error)
                } else {
                    resolve(msg.data)
                }
            })
        })
    }

    clearData(){
        return new Promise(function (resolve, reject) {
            xpservice.clearData(function (msg) {
                if (msg.error) {
                    reject(msg.error)
                } else {
                    resolve(msg.data)
                }
            })
        })
    }

    getSyncState(){
        return new Promise(function (resolve, reject) {
            xpservice.getSyncState(function (msg) {
                if (msg.error) {
                    reject(msg.error)
                } else {
                    resolve(msg.data)
                }
            })
        })
    }
}

const assetService = new AssetService();

export {
    assetService
}
