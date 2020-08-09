import React, {Component} from 'react'
import {NavBar, TabBar, Icon, Toast, WingBlank, WhiteSpace, List,Modal,Grid} from 'antd-mobile'
import Account from "../../../components/account/account";
import Utils from "../../../config/utils";
import { storage,keys, config, url,lang} from "../../../config/common";

const utils = new Utils();
const avatar_img = new Array();
const ac = new Account();

// const data = Array.from(utils.avatars).map((_val, i) => ({
//     icon: <Icon type={_val} className="icon-avatar" size="lg"/>,
//     text: "",
// }));

const data = Array.from(utils.avatarsimg).map((_val, i) => ({
    icon: <img src={require("../../../public/images/"+_val)} style={{width:"50px"}}/>,
    text: "",
}));


class ManageName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detail:{}
        }
    }

    componentWillMount() {
        const address = this.props.match.params.address;
        const that = this;
        let act = new Account(address);
        act.Detail(address).then(detail=>{
            if(detail){
                that.setState({
                    detail:detail
                })
            }else{
                Toast.fail("Account not exist!",1)
                setTimeout(function () {
                    url.goPage(url.Personal,"")
                },1000)
            }
        })
    }

    showChangeAvatar=()=>{
        let modalId ;
        modalId = Modal.alert(lang.e().page.walletManage.changeProfilePhoto, <div><Grid data={data} hasLine={false} onClick={(o,i)=>{
            // const type = o.icon.props.type;
            const src = o.icon.props.src;

                const detail = this.state.detail;
                // detail.avatar = type;
                detail.avatar = src;
                ac.setDetail(detail).then();
                this.setState({
                    detail:detail
                })
            modalId.close()}
        } columnNum={3}/></div>,
            [
                {
                    text: lang.e().button.confirm,
                    onPress: () => new Promise((resolve) => {
                        resolve();
                    }),
                },
            ], 'default')
    }

    showChangeName=()=>{
        Modal.prompt(lang.e().page.walletManage.changeWalletName, '',
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
                            const detail = this.state.detail;
                            detail.name = value;
                            ac.setDetail(detail).then();
                            this.setState({
                                detail:detail
                            })
                            resolve();
                        }else{
                            reject();
                        }
                    }),
                },
            ], 'default', null, [lang.e().page.walletManage.changeWalletName]);
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
                        url.goBack();
                    }}
                >
                    {lang.e().page.my.walletManage}
                </NavBar>

            </div>
            <div style={{marginTop:"45px"}}>
                <List>
                        <List.Item
                            onClick={this.showChangeAvatar}
                            // extra={<Icon type={detail?detail.avatar:""} className="icon-avatar" size="sm" style={{border: '0',borderRadius: '50%'}}/>} ><span >{lang.e().page.walletManage.changeProfilePhoto}</span>
                            extra={<img src={detail?detail.avatar:""} className="icon-avatar" size="sm" style={{border: '0',borderRadius: '50%'}}/>} ><span >{lang.e().page.walletManage.changeProfilePhoto}</span>
                            </List.Item>
                        <List.Item
                            onClick={this.showChangeName}
                            extra={<span style={{color:"#4e73df"}}>{detail?detail.name:""}</span>} ><span >{lang.e().page.walletManage.changeWalletName}</span></List.Item>
                </List>
            </div>
        </div>
    }
}

export default ManageName