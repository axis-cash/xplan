import React, {Component} from 'react'
import {NavBar, Icon, WhiteSpace, Toast, WingBlank, InputItem, Button,TextareaItem} from 'antd-mobile'
import {createForm, formShape} from "rc-form";
import Address from "../../../components/address/address";
import Utils from "../../../config/utils";
import axis from "../../../axis.png";
import {validPkr} from "jsuperzk/dist/wallet/wallet"
import './address.css'
import {storage, keys, config, url, baseDecimal, lang} from "../../../config/common";

const utils = new Utils();
const address = new Address();
class Form extends React.Component {

    static propTypes = {
        form: formShape,
    };

    constructor(props) {
        super(props);
        this.state = {
            confirming: true
        }
    }

    componentWillMount() {
        const {getFieldDecorator ,setFieldsValue } = this.props.form;
        this.nameDecorator = getFieldDecorator('name', {
            rules: [{required: true}],
        });
        this.addressDecorator = getFieldDecorator('address', {
            rules: [{required: true}],
        });
        this.descDecorator = getFieldDecorator('desc', {
            rules: [{required: false}],
        });

        setFieldsValue({
            address:this.props.address
        })
    }

    checkConfirming = () => {
        let that = this;
        this.props.form.validateFields((error, value) => {
            if(value["name"] && value["address"]){
                that.setState({
                    confirming:false
                })
            }else{
                that.setState({
                    confirming:true
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
                //AXIS修改判断
                if(!validPkr(value["address"].substr(0,1) == 'X' ? value["address"].substr(1) : value["address"])){
                    Toast.fail(lang.e().toast.error.invalidAddress,1)
                    that.setState({
                        confirming: false
                    });
                }else{
                    try{
                        address.add({
                            name:value["name"],
                            address:value["address"],
                            desc:value["desc"]
                        });
                        Toast.success(lang.e().toast.success.add,1);
                        setTimeout(function () {
                            // window.location.replace("/#/address/")
                            url.goBack();
                        },1000)
                    }catch (e) {
                        console.log(e.message);
                        Toast.fail(e.message,1)
                        that.setState({
                            confirming: false
                        });
                    }
                }
            }
        });
    }

    render() {
        const {getFieldProps} = this.props.form;
        return (
            <div style={{background:"#1A1A1B",color:"#DFDFDF"}}>
                <div style={{padding:"0 10px"}}>
                <WhiteSpace size="lg"/>
                <label style={{paddingLeft:"15px"}}>{lang.e().page.addressBook.name}</label>
                <div className="addcontent">
                    {this.nameDecorator(
                        <TextareaItem
                            className="textarea-bottom"
                            title=""
                            placeholder={lang.e().page.create.pleaseInput + lang.e().page.addressBook.name}
                            name="name"
                            ref={el => this.autoFocusInst = el}
                            autoHeight
                            clear
                            onBlur={this.checkConfirming}
                            style={{fontSize:"14px",color:"#DFDFDF",background:"none"}}
                        />
                    )}
                </div>
                <hr style={{border: '0',height: '1px',background: '#46464A',width: 'calc(100% - 30px)',transform: "scaleY(0.6)",marginTop: "0"}}/>
                <WhiteSpace size="lg"/>
                <label style={{paddingLeft:"15px",display:'block'}}>{lang.e().page.addressBook.address}
                    <img src={require('../../../public/images/transaction_scan@2x.png')} className="address-add-iconscan" onClick={() => {
                        url.goPage(url.scan("address"),url.AddressAdd)
                    }}/>
                </label>
                <div className="addcontent">
                    {this.addressDecorator(
                        <TextareaItem
                            className="textarea-bottom"
                            title=""
                            clear
                            placeholder={lang.e().page.create.pleaseInput + lang.e().page.addressBook.address}
                            name="address"
                            ref={el => this.autoFocusInst = el}
                            rows={4}
                            count={150}
                            autoHeight
                            onBlur={this.checkConfirming}
                            style={{fontSize:"14px",color:"#DFDFDF"}}
                        />
                    )}
                    {/*<Icon type="iconscan"*/}
                          {/*className="address-add-iconscan"*/}
                          {/*onClick={()=>{*/}
                             {/*url.goPage(url.scan("address"),url.AddressAdd)*/}
                          {/*}}*/}
                    {/*/>*/}

                </div>
                <hr style={{border: '0',height: '1px',background: '#46464A',width: 'calc(100% - 30px)',transform: "scaleY(0.6)",marginTop: "0"}}/>
                <WhiteSpace size="lg"/>
                <label style={{paddingLeft:"15px"}}>{lang.e().page.addressBook.description}</label>
                <div className="addcontent">
                    {this.descDecorator(
                        <TextareaItem
                            className="textarea-bottom"
                            title=""
                            clear
                            placeholder={lang.e().page.create.pleaseInput + lang.e().page.addressBook.description}
                            name="desc"
                            ref={el => this.autoFocusInst = el}
                            autoHeight
                            onBlur={this.checkConfirming}
                            style={{fontSize:"14px",color:"#DFDFDF"}}
                        />
                    )}
                </div>
                <hr style={{border: '0',height: '1px',background: '#46464A',width: 'calc(100% - 30px)',transform: "scaleY(0.6)",marginTop: "0"}}/>
                </div>
                <div className="btn-bottom">
                    <Button type="primary" onClick={() => {
                        this.submit()
                    }} disabled={this.state.confirming}>{lang.e().button.add}</Button>
                </div>
            </div>
        );
    }
}

const AddAddressForm = createForm()(Form);

class AddressAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.setState({
        })
    }


    render() {
        return <div style={{background:"#1A1A1B",height: document.documentElement.clientHeight-45}}>
            <div className="layout-top">
                <NavBar
                    style={{background:"#1A1A1B"}}
                    mode="light"
                    leftContent={<Icon type="left" style={{color:"#ffffff"}}/>}
                    onLeftClick={()=>{
                        url.goBack()
                    }}
                >
                    {lang.e().page.addressBook.add}
                </NavBar>

            </div>
            <div style={{marginTop:"45px"}}>
                <AddAddressForm address={this.props.match.params.address}/>
            </div>
        </div>
    }
}

export default AddressAdd