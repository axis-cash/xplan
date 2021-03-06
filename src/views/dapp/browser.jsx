import React, {Component} from 'react'
import {NavBar, Icon, Toast, Modal, List, InputItem, Button} from "antd-mobile";
import {storage, url, keys, lang, config} from "../../config/common";
import BigNumber from 'bignumber.js'
import Account from '../../components/account/account'
import {Transactions} from "../../components/tx/transactions";
import Web3 from 'axis-web3'
import {decimals} from "../../components/tx/decimals";
import {assetService} from "../../components/service/service";

let web3 = new Web3();

const transactions = new Transactions();
const account = new Account();
const data = {
    messageId: 1,
    method: "init",
    data: "success"
}
const operation = {
    method: {
        init: "init",
        accountDetail: "accountDetail",
        accountList: "accountList",
        executeContract: "executeContract",
        call: "call",
        estimateGas: "estimateGas",
        getInfo: "getInfo"
    }
}


class Browser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            hasListener: false,
            navTitle: "",
            password: "",
            showTxInfo: false,
            txInfo: "",
        }
    }

    componentWillMount() {
        let url = this.props.match.params.url;
        url = decodeURIComponent(url);
        this.setState({
            url: url,
        })
    }

    setPassword = (password) => {
        this.setState({password: password})
    }

    componentDidMount() {

        this.initTile();

        web3.setProvider(new web3.providers.HttpProvider(config.axisRpc()))

    }

    initTile = () => {
        let that = this;
        window.addEventListener("message", this.receiveMessage, {passive: true});
        let url = this.props.match.params.url;
        if (url.indexOf("http") === -1) {
            setTimeout(function () {
                const childFrameObj = document.getElementById('ifrModel');
                that.setState({
                    navTitle: childFrameObj.contentWindow.document.title
                })
            }, 200)
        } else {
            that.setState({
                navTitle: "Browser"
            })
        }
    }

    initDApp = (data) => {
        if (data) {
            // let mainFrame = document.getElementById('ifrModel');
            this.setState({
                navTitle: data.name
            })
            if (data.name && data.contractAddress && data.github && data.author && data.url && data.logo) {
                if (data.url && data.url.indexOf("http") === -1) {
                    data.url = "http://" + data.url
                    data.logo = "http://" + data.logo
                }
                this.storageDapp(data)
            }
        }
        return "success"
    }

    getInfo = () => {
        return new Promise(function (resolve,reject) {
            let data = {}
            data.language = lang.e().key;
            data.rpc = config.axisRpc();
            try{
                if(plus && plus.device){
                    data.uuid = plus.device.uuid;
                    resolve(data)
                }else{
                    resolve(data)
                }
            }catch (e) {
                console.log('getInfo fail:',e.message);
                resolve(data)
            }
        })
    }

    async getAccountList(msg){
        try {
            let addresses = storage.get(keys.account.addresses);
            let rest = [];
            if (addresses) {
                for (let address of addresses) {
                    let detail = await account.Detail(address)
                    const assets = await assetService.balanceOf(detail.tk);
                    rest.push({Name: detail.name, PK: detail.address, MainPKr: detail.mainPKr, Balance: assets})
                }
            }
            msg.data=rest
            return msg
        } catch (e) {
            msg.data = null
            msg.error = e.message
            return msg
            // Toast.fail(e.message,3)
        }
    }

    async getAccountDetail(address, msg){
        try {
            if (address) {
                // let detail = storage.get(keys.detailKey(address));
                let detail = await account.Detail(address)
                const assets = await assetService.balanceOf(detail.tk);
                msg.data = {Name: detail.name, PK: detail.address, MainPKr: detail.mainPKr, Balance: assets}
                return msg
            }
        } catch (e) {
            msg.data = null
            msg.error = e.message
            return msg
            // Toast.fail(e.message,3)
        }
    }

    call = (data, msg) => {
        try {
            let rest = web3.axis.call(data, "latest");
            msg.data = rest
            return msg
        } catch (e) {
            msg.data = "0x"
            msg.error = e.message
            return msg
            // Toast.fail(e.message,3)
        }
    }

    estimateGas = (data, msg) => {
        try {
            let rest = web3.axis.estimateGas(data);
            msg.data = rest
            return msg
        } catch (e) {
            msg.data = "0x0"
            msg.error = e.message
            return msg
            // Toast.fail(e.message,3)
        }
    }

    executeContract = (data, cb) => {
        try {
            if (!data) {
                return
            }
            if (data && !data.cy) {
                data.cy = "AXIS"
            }

            if (data && !data.gas) {
                data.gas = "0x" + new BigNumber("4700000").toString(16);
            }

            if (data && !data.gasPrice) {
                data.gasPrice = "0x" + new BigNumber("1000000000").toString(16);
            }

            if (data && !data.value) {
                data.value = "0x0";
            }

            this.setState({
                txInfo: <List>
                    <List.Item extra={<span>{data.from}</span>}>{lang.e().page.txDetail.from}</List.Item>
                    <List.Item extra={
                        <span>{decimals.convert(data.value, data.cy).toString(10)} {data.cy}</span>}>{lang.e().page.txDetail.amount}</List.Item>
                    <List.Item extra={<span>{data.data}</span>}>Data</List.Item>
                    <List.Item extra={<div>
                        {decimals.convert(new BigNumber(data.gas).multipliedBy(new BigNumber(data.gasPrice)), "AXIS").toString(10)}<br/>
                        <span style={{
                            fontSize: '12px',
                            color: "#ddd"
                        }}>{new BigNumber(data.gas).toString(10)}(Gas) * {new BigNumber(data.gasPrice).dividedBy(new BigNumber(10).pow(9)).toString(10)}(Gta)</span><br/>
                    </div>}>
                        {lang.e().page.txDetail.fee}
                    </List.Item>
                    <List.Item>
                        <div style={{width: "100%", float: "left", display: "flex"}}>
                            <div style={{width: "25%", marginRight: "15px"}}>
                                <Button onClick={() => {
                                    this.setState({showTxInfo: false})
                                }}>{lang.e().button.cancel}</Button>
                            </div>
                            <div style={{width: "70%"}}>
                                <Button type="primary" onClick={() => {
                                    this.submit(data, cb)
                                }}>{lang.e().button.confirm}</Button>
                            </div>
                        </div>
                    </List.Item>
                </List>
            })

            this.setState({
                showTxInfo: true
            })
        } catch (e) {
            Toast.fail(e.message, 3)
        }
    }

    submit = (data, cb) => {
        try {
            Modal.prompt(lang.e().button.transfer, <div>

            </div>, [{
                text: lang.e().button.cancel, onPress: () => {
                    console.log("cancel");
                }
            }, {
                text: lang.e().button.confirm, onPress: (password) => {
                    if (!password) {
                        Toast.fail("Please Input Password!")
                    } else {
                        try {
                            Toast.loading(lang.e().toast.loading.sending,60)
                            transactions.transfer(data, password).then(hash=>{
                                Toast.success(lang.e().toast.success.send, 2)
                                cb(hash)
                            }).catch(error=>{
                                if(typeof error === "object"){
                                    error = error.message;
                                }
                                if (error.indexOf("wrong passphrase") > -1) {
                                    Toast.fail(lang.e().toast.error.passwordError, 2);
                                } else {
                                    Toast.fail(error, 3);
                                }
                            })
                            // Toast.fail(lang.e().button.openTip,3)
                        } catch (e) {
                            Toast.fail(e.message);
                        }
                    }
                }
            }], "secure-text", null, [lang.e().page.txTransfer.inputPassword])

            this.setState({
                showTxInfo: false
            })
        } catch (e) {
            Toast.fail(e.message, 3)
        }
    }

    storageDapp = (data) => {
        try {
            let list = storage.get(keys.dapp.list);
            if (!list || list.length === 0) {
                list = [data.contractAddress]
                storage.set(keys.dapp.list, list)
            } else {
                let tempList = [];
                let has = false;
                for (let v of list) {
                    if (v === data.contractAddress) {
                        has = true;
                        break
                    }
                }
                if (!has) {
                    tempList.push(data.contractAddress)
                }
                storage.set(keys.dapp.list, tempList.concat(list))
            }

            storage.set(keys.dappsInfoKey(data.contractAddress), data)
        } catch (e) {
            Toast.fail(e.message, 3)
        }
    }

    /***
     *
     * {
     *     operation:nit
     *     data:success
     * }
     * @param event
     */
    receiveMessage = (event) => {
        let that = this;
        if (event !== undefined && event.data) {
            let msg = event.data;
            console.log("xplan receive msg: ", msg);
            if (msg.method) {
                if (msg.method === operation.method.init) {
                    msg.data = that.initDApp(msg.data);
                    that.sendMessage(msg);
                } else if (msg.method === operation.method.accountDetail) {
                    that.getAccountDetail(msg.data,msg).then(msg=>{
                        that.sendMessage(msg);
                    })
                } else if (msg.method === operation.method.accountList) {
                    that.getAccountList(msg).then(msg=>{
                        that.sendMessage(msg);
                    })
                } else if (msg.method === operation.method.executeContract) {
                    that.executeContract(msg.data.tx, function (txHash) {
                        msg.data = txHash;
                        that.sendMessage(msg);
                    });
                } else if (msg.method === operation.method.call) {
                    that.sendMessage(that.call(msg.data,msg));
                } else if (msg.method === operation.method.estimateGas) {
                    that.sendMessage(that.estimateGas(msg.data,msg));
                } else if (msg.method === operation.method.getInfo) {
                    that.getInfo().then(data=>{
                        msg.data= data;
                        that.sendMessage(msg);
                    }).catch(error=>{
                        msg.error=error
                        that.sendMessage(msg);
                    });
                } else {
                    that.sendMessage("operation method is invalid !");
                }
            } else {
                that.sendMessage("operation method is required !");
            }
        }
    };


    sendMessage = (msg) => {
        console.log("xplan send msg: ", msg);
        const childFrameObj = document.getElementById('ifrModel');
        childFrameObj.contentWindow.postMessage(msg, '*');
    };

    render() {
        return <div>
            <NavBar
                style={{background:"#1A1A1B"}}
                mode="light"
                leftContent={<Icon type="left" style={{color:'#ffffff'}}/>}
                // rightContent={<Icon type={"ellipsis"}/>}
                className="layout-top"
                onLeftClick={() => {
                    // window.location.replace("/#/dapp")
                    window.removeEventListener("message", this.receiveMessage, false);
                    url.goBack();
                }}
            >
                {this.state.navTitle}
            </NavBar>
            <iframe className="h5-iframe"
                    style={{width: '100%', height: this.state.iFrameHeight, overflow: 'visible', marginTop: "45px"}}
                    onLoad={() => {
                        this.setState({
                            "iFrameHeight": document.documentElement.clientHeight - 45
                        });
                    }}
                    id="ifrModel"
                    ref="iframe"
                    src={this.state.url}
                    width="100%"
                    height={this.state.iFrameHeight}
                    frameBorder="no" border="0"
            />
            <Modal
                xplan
                maskClosable
                visible={this.state.showTxInfo}
                animationType="slide-up"
            >
                {this.state.txInfo}
            </Modal>
        </div>


    }
}

export default Browser