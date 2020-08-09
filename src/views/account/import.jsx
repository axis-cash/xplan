import React,{Component} from 'react'
import {Icon, InputItem, NavBar, TextareaItem, WingBlank, Button, Toast,WhiteSpace} from "antd-mobile";
import {url,lang} from "../../config/common";
import {createForm} from "rc-form";
import Account from "../../components/account/account";
const account = new Account();
class Form extends Component{

    constructor(props) {
        super(props);

        this.state={
            checkConfirming:true,
            tipsShow:"none"
        }
        this.nameDecorator = this.props.form.getFieldDecorator('name', {
            rules: [{required: true}],
        });

        this.wordDecorator = this.props.form.getFieldDecorator('word', {
            rules: [{required: true}],
        });
        this.passwordDecorator = this.props.form.getFieldDecorator('password', {
            rules: [{required: true}],
        });
        this.repasswordDecorator = this.props.form.getFieldDecorator('repassword', {
            rules: [{required: true}],
        });
        this.hindDecorator = this.props.form.getFieldDecorator('hint', {
            rules: [{required: false}],
        });

    }

    checkConfirming = () => {
        this.props.form.validateFields((error, value) => {
            if (value["name"] && value["word"] && value["password"] && value["repassword"] ) {
                this.setState({
                    checkConfirming: false
                })
            }else{
                this.setState({
                    checkConfirming: true
                })
            }
        })
    }

    import(){
        let that = this;
        that.setState({
            checkConfirming: true
        });
        this.props.form.validateFields((error, value) => {
            if (error == null) {
                if(value["password"].length<8 || value["repassword"].length<8){
                    Toast.fail(lang.e().toast.error.passwordVerify,1.5);
                    that.setState({
                        checkConfirming: false
                    });
                    return;
                }

                if(value["password"] !== value["repassword"]){
                    Toast.fail(lang.e().toast.error.passwordNotMatch,1.5);
                    that.setState({
                        checkConfirming: false
                    });
                }else{
                        Toast.loading(lang.e().toast.loading.importing,60);
                        setTimeout(function () {
                            account.importMnemonic(value["name"],value["hint"],value["word"],value["password"]).then(function (data) {
                                Toast.success(lang.e().toast.success.import,1.5);
                                setTimeout(function () {
                                    url.goPage(url.Home)
                                    // window.location.href="/"
                                },1000)
                            }).catch(error=>{
                                Toast.fail(error,2);
                                that.setState({
                                    checkConfirming: false
                                });
                            })
                        },500)

                }
            }
        })

    }

    render() {
        return <div>
            <WingBlank>
            {/*<p style={{color:'#F4465A',background:'#FFF3F5',padding: '5px',fontSize: '12px',margin: '0',textAlign:"center"}}>{lang.e().page.import.tips}</p>*/}
            {/*<div style={{fontSize:"14px",color:"#64727e"}}>*/}
                {/*{lang.e().page.import.tips}*/}
            {/*</div>*/}
            </WingBlank>
            <WhiteSpace size="lg"/>
            <div>
            <label style={{paddingLeft:"30px",color:"#DFDFDF"}}>{lang.e().conf.import_mnemonic}</label>
            <WingBlank>
                <div className="am-list-item-bgnone" style={{paddingRight:"15px"}}>
                {
                    this.wordDecorator(<TextareaItem
                        placeholder={lang.e().page.import.inputTips}
                        rows='5'
                        style={{fontSize: ' 14px',borderBottom:"1px solid #46464A",paddingBottom: "10px",color:"#DFDFDF"}}
                    />)
                }
                </div>
            </WingBlank>
            </div>
            <WhiteSpace size="lg"/>

            <div>
            <label style={{paddingLeft:"30px",color:"#DFDFDF"}}>{lang.e().page.import.name}</label>
                <WingBlank>
                    <div className="am-list-item-bgnone">
                    {
                        this.nameDecorator(
                            <InputItem type="text" placeholder={lang.e().page.create.pleaseInput + lang.e().page.import.name} onBlur={this.checkConfirming} onChange={this.checkConfirming}  autoComplete="off" style={{fontSize: ' 14px',borderBottom:"1px solid #46464A",paddingBottom: "10px",color:"#DFDFDF"}}/>
                        )
                    }
                    </div>
                </WingBlank>
            </div>
            <WhiteSpace size="lg"/>

            <div>
            <label style={{paddingLeft:"30px",color:"#DFDFDF"}}>{lang.e().page.import.password}</label>
            <WingBlank>
                <div className="am-list-item-bgnone">
                {
                    this.passwordDecorator(
                        <InputItem type="password" placeholder={lang.e().page.create.pleaseInput + lang.e().page.import.password} onBlur={this.checkConfirming} onChange={this.checkConfirming} autoComplete="off" onFocus={()=>{
                            this.setState({
                                tipsShow:"block"
                            })
                        }} onBlur={()=>{
                            this.setState({
                                tipsShow:"none"
                            })
                        }} style={{fontSize: ' 14px',borderBottom:"1px solid #46464A",paddingBottom: "10px",color:"#DFDFDF"}}/>
                    )
                }
                </div>
            </WingBlank>
                <div style={{color:"#DFDFDF",fontSize:"12px",textAlign:"right",marginTop:"5px",marginRight: '30px',display:`${this.state.tipsShow}`}}>{lang.e().page.create.step1.passwordTips}</div>
            </div>
            <WhiteSpace size="lg"/>

            <div>
            <label style={{paddingLeft:"30px",color:"#DFDFDF"}}>{lang.e().page.import.rePassword}</label>
            <WingBlank>
                <div className="am-list-item-bgnone">
                {
                    this.repasswordDecorator(
                        <InputItem type="password" placeholder={lang.e().page.create.pleaseInput + lang.e().page.import.rePassword} onBlur={this.checkConfirming} onChange={this.checkConfirming} autoComplete="new-password" style={{fontSize: ' 14px',borderBottom:"1px solid #46464A",paddingBottom: "10px",color:"#DFDFDF"}}/>
                    )
                }
                </div>
            </WingBlank>
            </div>
            <WhiteSpace size="lg"/>

            <div>
            <label style={{paddingLeft:"30px",color:"#DFDFDF"}}>{lang.e().page.import.hint}</label>
            <WingBlank>
                <div className="am-list-item-bgnone">
                {
                    this.hindDecorator(
                        <InputItem type="text" placeholder={lang.e().page.create.pleaseInput + lang.e().page.import.hint} onBlur={this.checkConfirming} onChange={this.checkConfirming} autoComplete="new-password" style={{fontSize: ' 14px',borderBottom:"1px solid #46464A",paddingBottom: "10px",color:"#DFDFDF"}}/>
                    )
                }
                </div>
            </WingBlank>
            </div>

            <div className="btn-bottom">
                <Button type="primary" onClick={() => {
                    this.import()
                }} disabled={this.state.checkConfirming}>{lang.e().button.import}</Button>
            </div>

        </div>
    }
}

const ImportAccountForm = createForm()(Form);

class ImportAccount extends Component{

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div style={{height: document.documentElement.clientHeight,background:"#1A1A1B"}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" style={{color:'#ffffff'}}/>}
                onLeftClick={() => {
                    url.goBack();
                }}
                style={{background:"#1A1A1B"}}
            >
                {lang.e().button.importWallet}
            </NavBar>
            <WhiteSpace size="lg"/>
            <ImportAccountForm/>
        </div>
    }
}

export default ImportAccount