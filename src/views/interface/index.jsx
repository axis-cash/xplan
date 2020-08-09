import React,{Component} from 'react'
import {Icon, InputItem, NavBar, TextareaItem, WingBlank, Button, Toast,WhiteSpace} from "antd-mobile";
import {url, lang, config} from "../../config/common";
import {createForm} from "rc-form";
import Account from "../../components/account/account";

const account = new Account();
import async from 'async';
import {assetService} from "../../components/service/service";
import {Transactions} from "../../components/tx/transactions";
import {decimals} from "../../components/tx/decimals";
import BigNumber from "bignumber.js";

let decimal = new BigNumber(10).pow(18);
class Interface extends Component{

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        window['importAccoount'] = this.importAccoount;
        window['getAccountList'] = this.getAccountList;
        window['setAccount'] = this.setAccount;
        window['getCurrentAccount'] = this.getCurrentAccount;
        window['getCurrentAccountDetail'] = this.getCurrentAccountDetail;
        window['getCurrentBalance'] = this.getCurrentBalance;
        window['getBalanceOfTk'] = this.getBalanceOfTk;
        window['transfer'] = this.transfer;
        window['transferOfSK'] = this.transferOfSK;
        window['getTxList'] = this.getTxList;
        window['getPKrIndex'] = this.getPKrIndex;
        window['setRpc'] = this.setRpc;
        window['getRpcList'] = this.getRpcList;
        window['clearData'] = this.clearData;
        window['clearLocalStoreData'] = this.clearLocalStoreData;
        window['stake'] = this.stake;
    }

    /*
    *  原生APP返回
    * */
    execResult(result){
        var u = navigator.userAgent;
        if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1 && window.ShowFitness !== undefined) {
            return window.javaFunction.Rusult(result);
        } else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            return Result(result);
        } else {
            console.log(result);
            return result;
        }
        // if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        //     return window.javaFunction.Rusult(result);
        // } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        //     return Result(result);
        // } else {
        //     console.log(result);
        //     return result;
        // }
    }

    /*
    * 助记词导入钱包
    * data.name
    * data.hint
    * data.word
    * data.password
    * */
    importAccoount = async(IMPdata) => {
        let that = this;
        if(!IMPdata || !IMPdata.name || !IMPdata.hint || !IMPdata.word || !IMPdata.password){
            this.execResult(JSON.stringify({code:-1,msg:'缺少参数'}));
            return;
        }

        let res;
        try{
            res = await account.importMnemonic(IMPdata["name"],IMPdata["hint"],IMPdata["word"],IMPdata["password"]);
        }catch(err){
            console.log('catcherror:',err);
            this.execResult(JSON.stringify({code:-2,msg:'钱包导入失败',result:err}));
            return;
        }
        console.log('res:',res);
        this.execResult(JSON.stringify({code:0,msg:'钱包导入成功',result:res}));
        return;
    }

    /*
    * 获取账号列表
    * */
    getAccountList = async () => {
        let that = this;
        let res;
        try{
            res = await account.Details();
        }catch(err){
            console.log('catcherror:',err);
            this.execResult(JSON.stringify({code:-2,msg:'查询失败',result:err}));
            return;
        }
        console.log('res:',res);
        this.execResult(JSON.stringify({code:0,msg:'查询成功',result:res}));
        return;
    }

    /*
    * 选择账号
    * ac getAccountList每个账号的内容{}
    * */
    setAccount = async (ac) => {
        let that = this;
        let res;
        try{
            res = await account.setCurrent(ac);
        }catch(err){
            console.log('catcherror:',err);
            this.execResult(JSON.stringify({code:-2,msg:'选择失败',result:err}));
            return;
        }
        console.log('res:',res);
        this.execResult(JSON.stringify({code:0,msg:'选择成功',result:res}));
        return;
    }

    /*
    * 获取当前选中的账号
    * */
    getCurrentAccount = async () =>{
        let res;
        try{
            res = await account.getCurrent();
        }catch(err){
            console.log('catcherror:',err);
            this.execResult(JSON.stringify({code:-2,msg:'查询失败',result:err}));
            return;
        }
        console.log('res:',res);
        this.execResult(JSON.stringify({code:0,msg:'查询成功',result:res}));
        return;
    }

    /*
    * 获取选择账号的详情
    * */
    getCurrentAccountDetail = async () => {
        let current,detail;
        try{
            current = await account.getCurrent();
            detail = await account.Detail(current.address);
        }catch(err){
            console.log('catcherror:',err);
            this.execResult(JSON.stringify({code:-2,msg:'查询失败',result:err}));
            return;
        }
        console.log('detail:',current);
        this.execResult(JSON.stringify({code:0,msg:'查询成功',result:current}));
        return;
    }

    /*
    * 获取选中账号余额
    * */
    getCurrentBalance = async () => {
        let current,detail,balanceOf;
        try{
            current = await account.getCurrent();
            detail = await account.Detail(current.address);
            balanceOf = await assetService.balanceOf(detail.tk);
        }catch(err){
            console.log('catcherror:',err);
            this.execResult(JSON.stringify({code:-2,msg:'查询失败',result:err}));
            return;
        }
        console.log('balanceOf:',balanceOf);
        let balance = new Array();
        balanceOf.forEach(function(value,key,map){
            balance.push({'key' :key, 'value': new BigNumber(value).dividedBy(decimal).toFixed(6)});
        })
        this.execResult(JSON.stringify({code:0,msg:'查询成功',result:balance}));
        return;
    }

    /*
    * 通过TK获取余额
    * */
    getBalanceOfTk = async (data) => {
        let tk = data.TK;
        if(!tk){
            this.execResult(JSON.stringify({code:-1,msg:'查询失败,缺少参数TK'}));
            return;
        }
        let balanceOf;
        try{
            balanceOf = await assetService.balanceOf(tk);
        }catch(err){
            console.log('catcherror:',err);
            this.execResult(JSON.stringify({code:-2,msg:'查询失败',result:err}));
            return;
        }
        console.log('balanceOf:',balanceOf);
        let balance = new Array();
        balanceOf.forEach(function(value,key,map){
            balance.push({'key' :key, 'value': new BigNumber(value).dividedBy(decimal).toFixed(6)});
        })
        this.execResult(JSON.stringify({code:0,msg:'查询成功',result:balance}));
        return;
    }

    /*
    * 转账
    * data.TK   发送方TK
    * data.password 密码
    * data.ToPKr    接收方地址
    * data.value    发送数量
    * data.cy   单位
    * */
    transfer = async (data) => {
        if(!data || !data.TK || !data.password || !data.ToPKr || !data.value || !data.cy){
            this.execResult(JSON.stringify({code:-1,msg:'缺少参数'}));
            return;
        }

        const transaction = new Transactions(data.TK);
        let tx = {
            // from:,
            to: data.ToPKr,
            // data:"",
            cy: data.cy,
            value: new BigNumber(data.value).times(decimal).toString(),
            gas: 25000,
            gasPrice: 1000000000
        }

        let trans;
        try{
            trans = await transaction.transfer(tx, data.password);
        }catch(e){
            if(typeof e === "object"){
                e = e.message;
            }
            if (e.indexOf("wrong passphrase") > -1) {
                // Toast.fail(lang.e().toast.error.passwordError, 2);
            } else if (e.indexOf("no enough") > -1) {
                // Toast.fail(lang.e().toast.error.notEnough, 2);
            } else {
                // Toast.fail(e, 3);
            }
            this.execResult(JSON.stringify({code:-2,msg:'转账失败',result:e}));
            return;
        }
        console.log('success',trans);
        this.execResult(JSON.stringify({code:0,msg:'转账成功',result:trans}));
        return;
    }

    /*
    * 质押投票
    * data.TK   发送方TK
    * data.password 密码
    * data.ToPKr    接收方地址
    * data.nodeId    节点id
    * data.value    投票数量
    * data.cy   单位
    * */
    stake = async (data) => {
        if(!data || !data.TK || !data.password || !data.ToPKr || !data.value || !data.cy){
            this.execResult(JSON.stringify({code:-1,msg:'缺少参数'}));
            return;
        }

        const transaction = new Transactions(data.TK);
        let tx = {
            // from:,
            to: data.ToPKr,
            // data:"",
            cy: data.cy,
            value: new BigNumber(data.value).times(decimal).toString(),
            gas: 25000,
            gasPrice: 1000000000,
            Stake:'onstake',
            Vote:'0x3759e2632c2944aaac3d975167a4b1ecf3055b493e7a3b1815a303ca2f6f420b75ee74a1d64d085f2b60b62285f8fa54d443b3414be928b89fee3612a29d9b12177d50f8390ef47d600432769ff4eebbf875afe9ce98cf740218b6a70c0140ec',
            Pool:'0x4e44c7bacb8ed789989971ae0a67496bc456262dad74427a496c2433073b5b4d'
        }

        let trans;
        try{
            trans = await transaction.stake(tx, data.password);
        }catch(e){
            if(typeof e === "object"){
                e = e.message;
            }
            if (e.indexOf("wrong passphrase") > -1) {
                // Toast.fail(lang.e().toast.error.passwordError, 2);
            } else if (e.indexOf("no enough") > -1) {
                // Toast.fail(lang.e().toast.error.notEnough, 2);
            } else {
                // Toast.fail(e, 3);
            }
            this.execResult(JSON.stringify({code:-2,msg:'转账失败',result:e}));
            return;
        }
        console.log('success',trans);
        this.execResult(JSON.stringify({code:0,msg:'转账成功',result:trans}));
        return;
    }

    /*
    * 转账-使用SK
    * data.TK   发送方TK
    * data.SK   私钥
    * data.ToPKr    接收方地址
    * data.value    发送数量
    * data.cy   单位
    * */
    transferOfSK = async (data) => {
        if(!data || !data.TK || !data.ToPKr || !data.value || !data.cy || !data.SK){
            this.execResult(JSON.stringify({code:-1,msg:'缺少参数'}));
            return;
        }

        const transaction = new Transactions(data.TK);
        let tx = {
            from:data.TK,
            to: data.ToPKr,
            // data:"",
            cy: data.cy,
            value: new BigNumber(data.value).times(decimal).toString(),
            gas: 25000,
            gasPrice: 1000000000
        }

        let act = new Account()
        let cy = tx.cy;
        let gas = tx.gas;
        let gasPrice = tx.gasPrice;
        let from = tx.from;
        if (!cy) cy = "AXIS"
        if (!gas) {
            gas = "0x"+new BigNumber("4700000").toString(16);
        }
        if (!gasPrice) {
            gasPrice = "0x"+new BigNumber("1000000000").toString(16);
        }

        let txReq = {}
        txReq.From=from;
        txReq.To=tx.to;
        txReq.Cy=cy;
        txReq.Value=tx.value;
        txReq.Data=tx.data;
        txReq.Gas=new BigNumber(gas).toString(16);
        txReq.GasPrice=new BigNumber(gasPrice).toString(16);
        txReq.SK = data.SK;

        let trans;
        try{
            trans = await assetService.commitTx(txReq);
        }catch(e){
            if(typeof e === "object"){
                e = e.message;
            }
            if (e.indexOf("wrong passphrase") > -1) {
                // Toast.fail(lang.e().toast.error.passwordError, 2);
            } else if (e.indexOf("no enough") > -1) {
                // Toast.fail(lang.e().toast.error.notEnough, 2);
            } else {
                // Toast.fail(e, 3);
            }
            console.log('error',data)
            this.execResult(JSON.stringify({code:-2,msg:'转账失败',result:data}));
            return;
        }
        console.log('success',trans);
        this.execResult(JSON.stringify({code:0,msg:'转账成功',result:trans}));
        return;
    }


    /*
    * 获取交易记录
    * data.TK
    * data.cy
    * data.count
    * */
    getTxList = async (data) => {
        if(!data || !data.TK || !data.cy || !data.count){
            this.execResult(JSON.stringify({code:-1,msg:'缺少参数'}));
            return;
        }
        let getTxList;
        try{
            getTxList = await assetService.getTxList(data.TK,data.cy,data.count);
        }catch(err){
            console.log('catcherror:',err);
            this.execResult(JSON.stringify({code:-2,msg:'查询失败',result:err}));
            return;
        }
        console.log('getTxList:',getTxList);
        this.execResult(JSON.stringify({code:0,msg:'查询成功',result:getTxList}));
        return;
    }

    /*
    * 通过TK获取当前账号同步状态
    * TK
    * */
    getPKrIndex = async (data) => {
        let TK = data.TK;
        if(!TK){
            this.execResult(JSON.stringify({code:-1,msg:'缺少参数'}));
            return;
        }
        let getPKrIndex;
        try{
            getPKrIndex = await assetService.getPKrIndex(TK);
        }catch(err){
            console.log('catcherror:',err);
            this.execResult(JSON.stringify({code:-2,msg:'查询失败',result:err}));
            return;
        }
        console.log('getTxList:',getPKrIndex);
        this.execResult(JSON.stringify({code:0,msg:'查询成功',result:getPKrIndex}));
        return;
    }

    /*
    * 输出RPC地址列表
    * */
    getRpcList = async () => {
        var network = [{
                id: "1",
                network: "main",
                name: "华南(成都)",
                rpc: "http://148.70.169.73:8545",
            },
            {
                id: "1",
                network: "main",
                name: "华南(成都)",
                rpc: "http://140.143.83.98:8545",
            },
            {
                id: "2",
                network: "main",
                name: "华南(广州)",
                rpc: "http://129.204.197.105:8545",
            },
            {
                id: "3",
                network: "main",
                name: "JAPAN",
                rpc: "http://52.199.145.159:8545",
            }];
        this.execResult(JSON.stringify({code:0,msg:'获取成功',result:network}));
        return;
    }

    /*
    * 修改链接的RPC地址
    * HTTPIP
    * */
    setRpc = async (data) => {
        let HTTPIP = data.HTTPIP;
        if(!HTTPIP){
            this.execResult(JSON.stringify({code:-1,msg:'缺少参数'}));
            return;
        }
        let setRpc;
        try{
            setRpc = await config.setRpc(rpc);
            assetService.init()
        }catch(err){
            console.log('catcherror:',err);
            this.execResult(JSON.stringify({code:-2,msg:'修改失败',result:err}));
            return;
        }
        console.log('setRpc:',setRpc);
        this.execResult(JSON.stringify({code:0,msg:'修改成功',result:setRpc}));
        return;
    }

    /*
    * 清除链接rpc的缓存
    * */
    clearData = async () => {
        let clearData;
        try{
            clearData = await assetService.clearData();
        }catch(err){
            console.log('catcherror:',err);
            this.execResult(JSON.stringify({code:-2,msg:'清除失败',result:err}));
            return;
        }
        console.log('clearData:',clearData);
        this.execResult(JSON.stringify({code:0,msg:'清除成功',result:clearData}));
        return;
    }

    /*
    * 清除所有导入的钱包内容
    * */
    clearLocalStoreData = async () => {
        localStorage.clear();
        this.execResult(JSON.stringify({code:0,msg:'清除成功'}));
        return;
    }



    render (){
        return <div style={{height: document.documentElement.clientHeight}}>
            <NavBar
                mode="light"
                icon={<Icon type="left"/>}
                onLeftClick={() => {
                    url.goBack();
                }}
            >
                AXIS接口
            </NavBar>
            <WhiteSpace size="lg"/>
        </div>
    }
}

export default Interface