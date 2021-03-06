import React, {Component} from 'react'
import {NavBar, Toast, Icon, Modal, WingBlank, WhiteSpace, List} from 'antd-mobile'
import Account from "../../../components/account/account";
import {storage, keys, config, url, baseDecimal, lang} from "../../../config/common";
const ac = new Account();
class Manage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detail:''
        }
    }

    componentWillMount() {
        const that = this;
        const address = that.props.match.params.address;
        let act = new Account(address);
        act.Detail(address).then(detail=>{
            if(detail){
                that.setState({
                    detail:detail
                })
            }else{
                Toast.fail(lang.e().toast.error.accountExisted,1)
                setTimeout(function () {
                    url.goPage(url.Personal,"")
                },1000)
            }
        });

    }

    changePasswordHint = ()=>{
        const detail = this.state.detail;
        Modal.prompt(lang.e().page.walletManage.changePasswordHint, '',
            [
                {
                    text: lang.e().button.cancel,
                    onPress: value => new Promise((resolve) => {
                        resolve();
                    }),
                },
                {
                    text: lang.e().button.confirm,
                    onPress: value => new Promise((resolve, reject) => {
                        if(value){
                            detail.hint = value;
                            storage.set(keys.detailKey(detail.address),detail)
                            resolve();
                            Toast.success(lang.e().toast.success.save,1)
                        }else{
                            reject();
                        }
                    }),
                },
            ], 'default', detail.hint, [lang.e().page.walletManage.changePasswordHint])
    }

    exportMnemonicPhrase = ()=>{
        let that = this;
        Modal.prompt(lang.e().page.walletManage.export, '',
            [
                {
                    text: lang.e().button.cancel,
                    onPress: value => new Promise((resolve) => {
                        resolve();
                    }),
                },
                {
                    text: lang.e().button.confirm,
                    onPress: password => new Promise((resolve, reject) => {

                        if(password){
                            Toast.loading(lang.e().toast.loading.exporting,60)
                            ac.exportMnemonic(that.props.match.params.address,password).then(()=>{
                                Toast.success(lang.e().toast.success.export,2)
                                resolve();
                                setTimeout(function () {
                                    url.goPage(url.AccountCreate2,url.manage(that.props.match.params.address));
                                },2000)
                            }).catch(e=>{
                                if (e.indexOf("wrong passphrase") > -1) {
                                    Toast.fail(lang.e().toast.error.passwordError, 2);
                                } else {
                                    Toast.fail(e, 3);
                                }
                                reject();
                            });
                        }else{
                            reject();
                        }
                    }),
                },
            ], 'secure-text', null, [lang.e().page.walletManage.password])
    }

    render() {
        const {detail} = this.state;
        return <div style={{height: document.documentElement.clientHeight-45}}>
            <div className="layout-top">
                <NavBar
                    style={{background:"#1A1A1B"}}
                    mode="light"
                    leftContent={<Icon type="left" style={{color:'#ffffff'}}/>}
                    onLeftClick={()=>{
                        // window.location.replace("/#/walletManage/")
                        url.goBack();
                    }}
                >
                    {lang.e().page.my.walletManage}
                </NavBar>

            </div>
            <div style={{marginTop:"45px"}} className="manage-list">
                <List>
                        <List.Item
                            arrow="horizontal"
                            multipleLine
                            onClick={()=>{
                                // window.location.replace("/#/manage/name/"+ this.state.ac.Detail().address)
                                url.goPage(url.manageName(detail.address),url.manage(this.props.match.params.address));
                            }}
                            // extra={<Icon className="icon-avatar" type={detail.avatar} size="sm" style={{border: '0',borderRadius: '50%'}}/>}
                            extra={<img className="icon-avatar" src={detail.avatar} size="sm" style={{border: '0',borderRadius: '50%'}}/>}
                        >
                            {detail.name} <List.Item.Brief>{ detail.mainPKr}</List.Item.Brief>
                        </List.Item>
                        <List.Item arrow="horizontal" multipleLine onClick={this.changePasswordHint}><span >{lang.e().page.walletManage.changePasswordHint}</span></List.Item>
                        <List.Item arrow="horizontal" multipleLine onClick={this.exportMnemonicPhrase}><span >{lang.e().page.walletManage.export}</span></List.Item>
                </List>
            </div>
        </div>
    }
}

export default Manage