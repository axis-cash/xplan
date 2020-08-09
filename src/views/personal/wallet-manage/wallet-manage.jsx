import React, {Component} from 'react'
import {NavBar, Icon, Card, WingBlank, WhiteSpace, Modal, Button, Toast} from 'antd-mobile'
import Account from "../../../components/account/account";
import Utils from "../../../config/utils";
import copy from "copy-text-to-clipboard";
import QRCode from "qrcode";
import { storage,keys, config, url,lang} from "../../../config/common";

const ac = new Account();
const utils= new Utils();

class WalletManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accountHtml :[]
        }
    }

    showQrCode = (pkr)=>{
        Modal.alert("QR-Code",<div>
            <canvas id="qrImg"/>
            <p style={{marginTop: '0', fontSize: '12px',overflowWrap: "break-word"}}>{pkr}</p>
            <Button className='copyTxt' size="small" onClick={()=>{
                copy(pkr);
                Toast.success("Copy Successfully", 1);
            }}>Copy</Button>
        </div>,[{
            "text":"Close"
        }])

        let canvas = document.getElementById('qrImg')
        QRCode.toCanvas(canvas, pkr, function (error) {
            if (error) console.error(error)
        })
    }

    modalTips(msg){
        Modal.alert(lang.e().modal.help,msg,[{text:lang.e().button.ok}])
    }

    componentDidMount() {
        let that = this;
        that.loadAccounts().then();
    }

    async loadAccounts(){
        const that = this;
        const list = await ac.List()
        let i=0;
        let tmpArray = [];
        for(let account of list){
            const detail = await ac.Detail(account.address);
            const mainPKr = detail.mainPKr;
            const currentPKr = detail.currentPKr;
            tmpArray.push(
                <WingBlank size="lg" key={i++}>
                    <WhiteSpace size="lg"/>
                    <Card className="wallet-card">
                        <Card.Header
                            // thumb={<div><Icon className="icon-avatar" type={detail.avatar} size="sm"/></div>}
                            thumb={<div><img className="icon-avatar" src={detail.avatar} size="sm" style={{width:"20px"}}/></div>}
                            title={detail.name}
                            // extra={<Icon type="ellipsis" onClick={()=>{
                            //     // window.location.replace("/#/manage/"+account.address)
                            //     url.goPage(url.manage(account.address),url.WalletManager)
                            // }}/>}
                            onClick={()=>{
                                // window.location.replace("/#/manage/"+account.address)
                                url.goPage(url.manage(account.address),url.WalletManager)
                            }}
                        />
                        <Card.Body style={{padding:"0px 15px 6px"}}>
                            <div>
                                <span >
                                    {/*<Icon type="iconhelp" className="icon-pkr" onClick={()=>{that.modalTips(lang.e().modal.mainPKr)}}/>*/}
                                    {lang.e().page.walletManage.mainPKr}:</span>
                                <span> {utils.ellipsisAddress(mainPKr,19)}</span>
                                <Icon type="iconqr-code" className="icon-qrcode" onClick={()=>{
                                    url.goPage(url.receive(detail.address,"mainPKr"), url.WalletManager)
                                }}/>
                            </div>
                            <div>
                                <span >
                                    {/*<Icon type="iconhelp" className="icon-pkr" onClick={()=>{that.modalTips(lang.e().modal.pkr)}}/>*/}
                                 {lang.e().page.walletManage.PKr}:</span>
                                <span> {utils.ellipsisAddress(currentPKr,19)}</span>
                                <Icon type="iconqr-code" className="icon-qrcode" onClick={()=>{
                                    url.goPage(url.receive(detail.address,"pkr"), url.WalletManager)
                                }}/>
                            </div>
                        </Card.Body>
                    </Card>


                </WingBlank>
            )
        }
        if(tmpArray.length === 0 ){
            tmpArray = <div style={{textAlign:"center"}}>
                <Icon type="iconwushuju" style={{width:"100px",height:"100px"}}/><br/>
                <span style={{color:"gray"}}>No Data</span>
            </div>
        }
        that.setState({
            accountHtml:tmpArray
        })

    }

    render() {
        return <div style={{height: document.documentElement.clientHeight-45}}>
            <div className="layout-top">
                <NavBar
                    style={{background:"#1A1A1B"}}
                    mode="light"
                    leftContent={<Icon type="left" style={{color:'#ffffff'}}/>}
                    rightContent={<Icon style={{color:'#ffffff'}} onClick={()=>{
                        // window.location.replace("/#/account/create1")

                        Modal.operation([{
                            text:<span style={{textAlign:'center',color:'#DFDFDF',fontWeight:'0',fontSize:'16px'}}>{lang.e().modal.createWallet}</span>,
                            onPress:()=>{
                                url.goPage(url.AccountCreate1,url.WalletManager);
                            }
                        },{
                            text:<span style={{textAlign:'center',color:'#DFDFDF',fontWeight:'0',fontSize:'16px'}}>{lang.e().modal.importWallet}</span>,
                            onPress:()=>{
                                url.goPage(url.ImportAccount,url.WalletManager);
                            }
                        }])
                    }} type="iconadd"/>}
                    onLeftClick={()=>{
                        // window.location.replace("/#/my")
                        url.goBack();
                    }}
                >
                    {lang.e().page.my.walletManage}
                </NavBar>

            </div>
            <div style={{background: "#0B0B0C",marginTop:"45px",height:"100%",overflowY:'scroll'}}>
                {this.state.accountHtml}
            </div>
        </div>
    }
}

export default WalletManager