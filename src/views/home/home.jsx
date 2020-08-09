import React, {Component} from 'react'
import {WhiteSpace, Card, Icon, List, NavBar, Button, Modal, Toast, SwipeAction} from 'antd-mobile'
import Account from "../../components/account/account";
import Utils from "../../config/utils";
import Layout from "../layout/layout";
import logo from '../../axis.png'
import QRCode from 'qrcode';
import copy from "copy-text-to-clipboard/index"
import './home.css'
import {url, lang} from "../../config/common";
import BigNumber from "bignumber.js";
import {Price} from '../../components/tx/price';
import {decimals} from "../../components/tx/decimals";
import {assetService} from "../../components/service/service";

const priceService = new Price();

let utils = new Utils();
let Item = List.Item;
let Brief = Item.Brief;
let account = new Account();

let homeInterverId0 = null;
let homeInterverId = null;
let homeInterverId2 = null;
let homeInterverId3 = null;

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accountHtml: [],
            address: "",
            assetsHtml: [],
            axisPriceInfo: {},
            current: '',
            account: '',
            detail: '',
            assets: new Map(),
            healthy:'normal',//red dead,yellow syncing,green:normal
            hidemin:false,//隐藏小额资产
            hidemintxt:'隐藏小额资产',
            filterbg:false,//模糊背景
            pkrIndex:0//pkr当前区块
        }
    }

    componentDidMount() {
        let that = this;
        try {
            that.accounts().then();
            // that.calAxisTotal();

            if(!homeInterverId0){
                homeInterverId0 = setInterval(function () {
                    account.getCurrent().then(current=>{
                        clearInterval(homeInterverId0);
                        if (!current || !current.address) {
                            Toast.info(lang.e().toast.info.createWallet,1.5);
                            setTimeout(function () {
                                url.goPage(url.AccountCreate1, url.Home);
                            },1000)
                        }else{
                            that.accounts().then();
                            // that.calAxisTotal();
                        }
                    }).catch((e)=>{
                    });
                },1000);
            }

            if(homeInterverId){
                clearInterval(homeInterverId);
            }
            homeInterverId = setInterval(function () {
                if(that.state.healthy !== 'syncing'){
                    that.accounts().then();
                }
            },  10 * 1000)


            if(homeInterverId3){
                clearInterval(homeInterverId3);
            }
            homeInterverId3 = setInterval(function () {
                that.getSyncState();
            },  1 * 1000)


            if(homeInterverId2){
                clearInterval(homeInterverId2);
            }
            homeInterverId2 = setInterval(function () {
                // that.calAxisTotal();
            },  60 * 1000)

        } catch (e) {
            console.log(e)
        }
    }

    getSyncState=()=>{
        let that = this;
        assetService.getSyncState().then(data=>{
            if(data){
                if(data.health === true){
                    if(data.isSyncing=== true){
                        that.setState({
                            healthy:'syncing'
                        })
                    }else{
                        that.setState({
                            healthy:'normal'
                        })
                    }
                }else{
                    that.setState({
                        healthy:'dead'
                    })
                }
            }
        }).catch(e=>{
            that.setState({
                healthy:'dead'
            })
        })
    }

    showWallet = () => {
        let modalId;
        const that = this;
        // that.setState({filterbg:true});
        account.Details().then(list=>{
            let items = [];
            if (list) {
                for (let ac of list) {
                    items.push(
                        //<Item thumb={<Icon type={ac.avatar} className="icon-avatar"/>} multipleLine onClick={() => {
                        <Item thumb={<img src={ac.avatar} className="icon-avatar" style={{marginTop: "4px"}}/>} multipleLine onClick={() => {
                            account.setCurrent(ac).then(()=>{
                                that.accounts().then();
                                // that.setState({filterbg:false});
                                modalId.close();
                            });
                        }}>
                            {ac.name}
                            <small style={{
                                display: 'block',
                                fontSize: '12px',
                                color: '#666',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>{ac.mainPKr}</small>
                            {/*<Brief>{utils.ellipsisAddress(ac.address)}</Brief>*/}
                        </Item>
                    )
                }
            }
            modalId = Modal.alert(
                <div>
                    <span>{lang.e().page.wallet.selectWallet}</span>
                    <img src={require('../../public/images/home_wallet_edit@2x.png')} onClick={() => {
                        // that.setState({filterbg:false});
                        modalId.close();
                        url.goPage(url.WalletManager, url.Home);
                        // window.location.replace("/#/walletManage")
                    }} style={{
                        width: '18px',
                        position: 'absolute',
                        right: '25px'
                    }}/>
                    {/*<Icon type="iconsetting" className="icon-select-account-setting" onClick={() => {*/}
                        {/*modalId.close();*/}
                        {/*url.goPage(url.WalletManager, url.Home);*/}
                        {/*// window.location.replace("/#/walletManage")*/}
                    {/*}}/>*/}
                </div>
                , <div className="selectaccount">
                    <List>
                        {items}
                    </List>
                </div>,[
                    {text:lang.e().button.ok}
                ])
        });
    }

    showQrCode = (pkr) => {
        Modal.alert("QR-Code", <div>
            <canvas id="qrImg"/>
            <p style={{marginTop: '0', fontSize: '12px', overflowWrap: "break-word"}}>{pkr}</p>
            <Button className='copyTxt' size="small" onClick={() => {
                copy(pkr);
                Toast.success(lang.e().toast.success.copy, 1);
            }}>Copy</Button>
        </div>, [{
            "text": "Close"
        }])

        let canvas = document.getElementById('qrImg')
        QRCode.toCanvas(canvas, pkr, function (error) {
            if (error) console.error(error)
        })
    }

    modalTips(msg){
        Modal.alert(lang.e().modal.help,msg,[{text:lang.e().button.ok}])
    }

    calAxisTotal() {
        let that = this;
        priceService.axisTotal(1, function (res) {
            that.setState({
                axisPriceInfo: res
            })
        })
    }

    async accounts() {
        const that = this;
        const current = await account.getCurrent();
        that.setState({
            current: current,
        })

        if (current) {
            const detail = await account.Detail(current.address);
            that.setState({
                detail: detail,
                account: account
            })

            assetService.balanceOf(detail.tk).then(assets=>{
                that.setState({
                    assets: assets,
                })
            })

            assetService.getPKrIndex(detail.tk).then(pkrindex=>{
                that.setState({
                    pkrIndex: pkrindex.CurrentBlock,
                })
            })

        }
    }

    render() {
        let that = this;
        let assetsArr = [];
        let {current, detail, assets,healthy,hidemin} = this.state;
        let mainPKr = "";
        let currentPKr = "";
        let axisTotal = 0;
        let syncState = "check-circle"
        let stateColor="green"
        if(healthy === "normal"){
            syncState = "check-circle"
            stateColor="green"
        }else if(healthy === "syncing"){
            syncState = "loading"
            stateColor="yellow"
        }else if(healthy === "dead"){
            syncState = "cross-circle"
            stateColor="red"
        }

        if (current) {
            mainPKr = detail.mainPKr;
            currentPKr = detail.currentPKr;
            if (assets) {
                let i = 0;
                assets.forEach(function (value, cy) {
                    let cyAmount = 0;
                    let amount = decimals.convert(value, cy);
                    if (cy === "AXIS") {
                        if (that.state.axisPriceInfo.total) {
                            cyAmount = new BigNumber(decimals.convert(new BigNumber(that.state.axisPriceInfo.total).multipliedBy(new BigNumber(value)), cy));
                        }
                    }
                    axisTotal = new BigNumber(axisTotal).plus(cyAmount);
                    // console.log('hidemin',hidemin)
                    // console.log('parseInt(amount)',parseInt(amount))
                    // if(hidemin === true && parseInt(amount) > 1){
                    assetsArr.push(
                        <SwipeAction key={i++}
                                     style={{backgroundColor: '#0B0B0C'}}
                                     autoClose
                                     right={[
                                         {
                                             text: lang.e().button.transfer,
                                             onPress: () => {
                                                 url.goPage(url.transfer(cy)), url.Home
                                             },
                                             style: {backgroundColor: '#CAAC7B', color: 'white',borderRadius:"0 10px 10px 0"},
                                         }
                                     ]}
                                     onOpen={() => {
                                         url.goPage(url.transfer(cy)), url.Home
                                     }}
                                     onClose={() => console.log('global close')}
                        >
                            <Item extra={
                                <div>
                                    <div className="home-list-item-number">{amount}</div>
                                    {/*<Brief>*/}
                                        {/*<div*/}
                                            {/*className="home-list-item-money">{that.state.axisPriceInfo.type}{cyAmount.toFixed(3)}</div>*/}
                                    {/*</Brief>*/}
                                </div>} align="top"
                                  thumb={<div className="currency-icon-border"><img src={logo}/>
                                  </div>} multipleLine
                                  onClick={() => {
                                      url.goPage("/transfer/list/" + cy)
                                  }}>
                                <p className="home-list-item-name">{cy}</p>
                            </Item>
                        </SwipeAction>
                    )
                    // }
                })
            }


            if (assetsArr.length === 0) {
                assetsArr = <SwipeAction
                    style={{backgroundColor: '#0B0B0C'}}
                    autoClose
                    right={[
                        {
                            text: 'Transfer',
                            onPress: () => {
                                url.goPage(url.transfer("AXIS")), url.Home
                            },
                            style: {backgroundColor: '#CAAC7B', color: '#000000'},
                        }
                    ]}
                    onOpen={() => {
                        url.goPage(url.transfer("AXIS")), url.Home
                    }}
                    onClose={() => console.log('global close')}
                >
                    <Item extra={
                        <div>
                            <div className="home-list-item-number">0.00</div>
                        </div>}
                          align="top"
                          thumb={<div className="currency-icon-border"><img src={logo} width={16}/></div>}
                          multipleLine
                          onClick={() => {
                              url.goPage(url.transferList("AXIS"), url.Home);
                          }}
                    >
                        <p className="home-list-item-name">AXIS</p>
                    </Item>
                </SwipeAction>
            }
        }
        return <Layout selectedTab="home">
            <div className="layout-top" >
                {/*<NavBar*/}
                    {/*mode="light"*/}
                    {/*style={{background: "#f7f7f7"}}*/}
                    {/*leftContent={<Icon type="iconMenu"/>}*/}
                    {/*rightContent={<Icon type="iconscan" onClick={*/}
                        {/*() => {*/}
                            {/*url.goPage(url.scan("transfer"), url.Home)*/}
                        {/*}*/}
                    {/*}/>}*/}
                    {/*onLeftClick={this.showWallet}*/}
                {/*>*/}
                    {/*{lang.e().navbar.wallet}*/}
                {/*</NavBar>*/}

                {/*<div style={{margin: "5px", background: "#fdfdfd"}}>*/}
                    {/*<Card>*/}
                        {/*<Card.Header*/}
                            {/*thumb={<div><Icon className="icon-avatar" type={current.avatar} size="lg" onClick={() => {*/}
                                {/*url.goPage(url.manage(current.address), url.Home);*/}
                            {/*}}/></div>}*/}
                            {/*title={current.name}*/}
                            {/*extra={<Icon type="ellipsis" onClick={() => {*/}
                                {/*url.goPage(url.manage(current.address), url.Home);*/}
                            {/*}}/>}*/}
                        {/*/>*/}
                        {/*<Card.Body style={{padding: "0px 15px 6px"}}>*/}
                            {/*<div>*/}
                        {/*<span style={{color: "#f6c23e"}}>*/}
                            {/*<Icon type="iconhelp" className="icon-pkr" onClick={() => {*/}
                                {/*this.modalTips(lang.e().modal.mainPKr)*/}
                            {/*}}*/}
                            {/*/>{lang.e().page.wallet.mainPKr}:</span>*/}
                                {/*<span> {utils.ellipsisAddress(mainPKr)}</span>*/}
                                {/*<Icon type="iconqr-code" className="icon-qrcode" onClick={() => {*/}
                                    {/*// this.showQrCode(mainPKr)*/}
                                    {/*url.goPage(url.receive(current.address, "mainPKr"), url.Home);*/}
                                {/*}}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                        {/*<span style={{color: "#f6c23e"}}>*/}
                            {/*<Icon type="iconhelp" className="icon-pkr" onClick={() => {*/}
                                {/*this.modalTips(lang.e().modal.pkr)*/}
                            {/*}}*/}
                            {/*/>{lang.e().page.wallet.PKr}:</span>*/}
                                {/*<span> {utils.ellipsisAddress(currentPKr)}</span>*/}
                                {/*<Icon type="iconqr-code" className="icon-qrcode" onClick={() => {*/}
                                    {/*// this.showQrCode(currentPKr)*/}
                                    {/*url.goPage(url.receive(current.address, "pkr"), url.Home);*/}
                                {/*}}/>*/}
                            {/*</div>*/}
                        {/*</Card.Body>*/}
                        {/*<Card.Footer*/}
                            {/*extra={<span>{that.state.axisPriceInfo.type}{new BigNumber(axisTotal).toFixed(3)}</span>}/>*/}
                    {/*</Card>*/}
                {/*</div>*/}
                <div className="home-header">
                    <div className="home-header-titlelist">
                        {/*<Icon className="icon-avatar" type={current.avatar} size="sm" onClick={() => {*/}
                        <img className="icon-avatar" src={current.avatar} size="sm" onClick={() => {
                            // url.goPage(url.manage(current.address), url.Home);
                            url.goPage(url.Personal,url.Home)
                        }}/>
                        <span style={{verticalAlign: "middle"}}>{current.name}</span>
                        <button type="button" onClick={this.showWallet}>{lang.e().conf.home_change}</button>
                    </div>

                    <h1 className="home-changetousdt">
                        {/*<span>{that.state.axisPriceInfo.type}{new BigNumber(axisTotal).toFixed(3)}</span>*/}
                        {/*<small>USDT</small>*/}
                    </h1>
                </div>
                <div className="home-tools">
                    <a onClick={() => {url.goPage(url.receive(current.address, "mainPKr"), url.Home)}}>
                        <img src={require('../../public/images/home_icon_collection@2x.png')}/>
                        {lang.e().page.wallet.mainPKr}
                    </a>
                    <a onClick={() => {url.goPage(url.receive(current.address, "pkr"), url.Home)}}>
                        <img src={require('../../public/images/home_icon_linshi@2x.png')}/>
                        {lang.e().page.wallet.PKr}
                    </a>
                    <a onClick={() => {url.goPage(url.transfer('AXIS')), url.Home}}>
                        <img src={require('../../public/images/home_icon_transfer@2x.png')}/>
                        {lang.e().conf.home_transfer}
                    </a>
                    <a onClick={() => {url.goPage(url.scan("transfer"), url.Home)}}>
                        <img src={require('../../public/images/home_icon_scan@2x.png')}/>
                        {lang.e().conf.home_scan}
                    </a>
                </div>
                <div className="mainpkr">
                    <span className="spanl">{lang.e().conf.home_receive}</span>
                    <span className="spanr" onClick={()=>{
                        copy(mainPKr);
                        Toast.success(lang.e().toast.success.copy, 1);
                    }}>{utils.ellipsisAddress(mainPKr,50,16)}<Icon type="iconcopy" style={{width:"14px",height:"14px",verticalAlign:"middle",marginLeft:"3px",marginTop:"-3px"}} /></span>
                </div>
                <div style={{fontSize: '12px',
                    margin: '10px 0px',
                    textAlign: 'left',
                    padding: '5px 15px',
                    background: '#f4465a',
                    color: '#ffffff',
                    display:current.overbackup?'none':'block'
                }}
                onClick={() => {
                    url.goPage(url.manage(current.address), url.Home);
                }}>
                    <img src={require('../../public/images/warning.png')} style={{display: 'inline-block',
                        width: '15px',
                        marginRight: '5px',
                        verticalAlign: 'middle',
                        marginTop: '-5px'}}/>{lang.e().conf.home_backup}
                </div>

                <div className="am-list">
                    <div className="am-list-header">
                        {/*<div className="home-list-title" style={{color:"#DFDFDF"}}><Icon type={syncState} color={stateColor} size="small" style={{width:"14px",height:"14px",color:"#CAAC7B"}}/> {lang.e().page.wallet.Assets}<span style={{float:'right',color:'#CAAC7B',fontSize: '12px',*/}
                            {/*margin: '3px 3px 0 0'}} onClick={()=>{*/}
                                {/*if(this.state.hidemin == false){*/}
                                    {/*this.setState({*/}
                                        {/*hidemin:true,*/}
                                        {/*hidemintxt:'显示全部资产'*/}
                                    {/*})*/}
                                {/*}else{*/}
                                    {/*this.setState({*/}
                                        {/*hidemin:false,*/}
                                        {/*hidemintxt:'隐藏小额资产'*/}
                                    {/*})*/}
                                {/*}*/}

                            {/*}*/}
                        {/*}>{this.state.hidemintxt}</span></div>*/}
                        <div className="home-list-title" style={{color:"#DFDFDF"}}><Icon type={syncState} color={stateColor} size="small" style={{width:"14px",height:"14px",color:"#CAAC7B"}}/> {lang.e().page.wallet.Assets}<span style={{float:'right',color:'#CAAC7B',fontSize: '12px',
                            margin: '3px 3px 0 0'}}>{lang.e().conf.home_blocknumber}：{that.state.pkrIndex}</span></div>
                    </div>
                </div>
            </div>
            <div className="assets-wrap" style={{
                marginTop: current.overbackup?'256px':'299px',
                background: "#0B0B0C",
                height: document.documentElement.clientHeight - current.overbackup?293:346,
                overflowY: 'scroll',
                padding:'5px 4%',
                // filter:this.state.filterbg?"blur(2px)":"none"
            }}>
                <List>
                    {assetsArr}
                </List>
                <div style={{height: "50px"}}>
                </div>
            </div>
        </Layout>
    }
}

export default Home