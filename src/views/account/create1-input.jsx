import React, {Component} from 'react'
import {NavBar, Icon, WhiteSpace, WingBlank, InputItem, Button, Toast} from 'antd-mobile'
import {createForm, formShape} from 'rc-form';
import Account from "../../components/account/account";
import './create.css'
import axis from '../../axis.png'
import { storage,keys, config, url,lang} from "../../config/common";


let ac = new Account();

class Form extends React.Component {

    static propTypes = {
        form: formShape,
    };

    constructor(props) {
        super(props);
        this.state = {
            confirming: true,
            tipsShow:"none",
        }
    }

    componentWillMount() {

        this.nameDecorator = this.props.form.getFieldDecorator('name', {
            rules: [{required: true}],
        });
        this.passwordDecorator = this.props.form.getFieldDecorator('password', {
            rules: [{required: true}],
        });
        this.repasswordDecorator = this.props.form.getFieldDecorator('repassword', {
            rules: [{required: true}],
        });


    }

    checkConfirming = () => {
        this.props.form.validateFields((error, value) => {
            if (value["name"] && value["password"] && value["repassword"]) {
                this.setState({
                    confirming: false
                })
            }else{
                this.setState({
                    confirming: true
                })
            }
        })
    }

    submit() {
        let that = this;
        that.setState({
            confirming: true
        });
        this.props.form.validateFields((error, value) => {
            if (error == null) {
                try {
                    if(value["password"].length<8 || value["repassword"].length<8){
                        Toast.fail(lang.e().toast.error.passwordVerify,1);
                        that.setState({
                            confirming: false
                        });
                        return;
                    }
                    if (value["password"] !== value["repassword"]) {
                        Toast.fail(lang.e().toast.error.passwordNotMatch,1);
                        that.setState({
                            confirming: false
                        });
                        return
                    }
                    let data = ac.genWord();
                    if (data) {
                        ac.PreCreate(value["name"],value["password"],value["hint"],data).then(()=>{
                            url.goPage(url.AccountCreate2,url.AccountCreate1);
                        }).catch(e=>{
                            Toast.fail(e.message,2);
                        })
                    }
                }catch (e) {
                    console.log(e.message);
                }
            }
            that.setState({
                confirming: false
            });
        });
    }

    render() {
        const {getFieldProps} = this.props.form;
        return (
            <div style={{background:"#1A1A1B",height:document.documentElement.clientHeight-45}}>
                <WhiteSpace size="lg"/>

                {/*<div style={{textAlign: "left"}}>*/}
                    {/*<img src={axis} width={40}/>*/}
                    {/*<h1 style={{marginLeft:"25px",fontWeight:"normal"}}></h1>*/}
                {/*</div>*/}
                <WhiteSpace size="lg"/>

                <WingBlank>
                    <label style={{paddingLeft:"15px",color:"#DFDFDF"}}>{lang.e().page.create.step1.walletName}</label>
                    <div class="am-list-item-bgnone">
                    {this.nameDecorator(
                        <InputItem className="nobg" type="text" placeholder={lang.e().page.create.pleaseInput + lang.e().page.create.step1.walletName} onBlur={this.checkConfirming} onChange={this.checkConfirming} autoComplete="off" clear style={{fontSize: "14px",color:"#DFDFDF",borderBottom:"1px solid #46464A",paddingBottom: "10px"}}/>
                    )}
                    </div>
                    <WhiteSpace size="lg"/>
                    <div>
                        <label style={{paddingLeft:"15px",color:"#DFDFDF"}}>{lang.e().page.create.step1.password}</label>
                        <div className="am-list-item-bgnone">
                        {this.passwordDecorator(
                        <InputItem type="password" placeholder={lang.e().page.create.pleaseInput + lang.e().page.create.step1.password} onBlur={this.checkConfirming} onChange={this.checkConfirming} onFocus={()=>{
                            this.setState({
                                tipsShow:"block"
                            })
                        }} onBlur={()=>{
                            this.setState({
                                tipsShow:"none"
                            })
                        }} autoComplete="new-password" clear style={{fontSize: "14px",borderBottom:"1px solid #46464A",paddingBottom: "10px"}}/>
                    )}
                        </div>
                    <div style={{color:"#DFDFDF",fontSize:"12px",textAlign:"right",marginTop:"5px",display:`${this.state.tipsShow}`}}>{lang.e().page.create.step1.passwordTips}</div>
                    <WhiteSpace size="lg"/>
                    </div>
                    <div>
                        <label style={{paddingLeft:"15px",color:"#DFDFDF"}}>{lang.e().page.create.step1.rePassword}</label>
                        <div className="am-list-item-bgnone">
                        {this.repasswordDecorator(
                            <InputItem type="password" placeholder={lang.e().page.create.pleaseInput + lang.e().page.create.step1.rePassword} onBlur={this.checkConfirming}  onChange={this.checkConfirming} autoComplete="new-password" clear style={{fontSize: "14px",color:"#DFDFDF",borderBottom:"1px solid #46464A",paddingBottom: "10px"}}/>
                        )}
                        </div>
                        <WhiteSpace size="lg"/>
                    </div>
                    <label style={{paddingLeft:"15px",color:"#DFDFDF"}}>{lang.e().page.create.step1.hint}</label>
                    <div className="am-list-item-bgnone">
                    <InputItem type="text" placeholder={lang.e().page.create.pleaseInput + lang.e().page.create.step1.hint} {...getFieldProps('hint')} clear style={{fontSize: "14px",color:"#DFDFDF",borderBottom:"1px solid #46464A",paddingBottom: "10px"}}/>
                    </div>
                </WingBlank>
                <div className="btn-bottom">
                    <Button type="primary" style={{zIndex:"-1"}} onClick={() => {
                        this.submit()
                    }} disabled={this.state.confirming}>{lang.e().button.create}</Button>

                    {/*<Button type="primary" style={{zIndex:"-1"}} disabled={true}>{lang.e().button.openTip}</Button>*/}
                </div>
            </div>
        );
    }
}

const AccountCreateForm = createForm()(Form);

class AccountCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {

        return <div style={{height: document.documentElement.clientHeight}}>
            <NavBar
                style={{background:"#1A1A1B"}}
                mode="light"
                icon={<Icon type="left" style={{color:'#ffffff'}}/>}
                onLeftClick={() => {
                    url.goBack();
                }}
                rightContent={<span style={{color:"#ffffff"}} onClick={
                    ()=>{
                        url.goPage(url.ImportAccount,url.AccountCreate1)
                    }
                }>{lang.e().page.create.import}</span>}
            >
                {lang.e().page.create.step1.title}
            </NavBar>

            <AccountCreateForm/>

        </div>
    }
}

export default AccountCreate