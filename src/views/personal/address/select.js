import React, {Component} from 'react'
import {NavBar, Icon, WhiteSpace, List,Toast,WingBlank} from 'antd-mobile'
import Address from "../../../components/address/address";
import Utils from "../../../config/utils";
import axis from "../../../axis.png"
import "./address.css"
import copy from "copy-text-to-clipboard";
import {storage, keys, config, url, baseDecimal, lang} from "../../../config/common";

let utils = new Utils();
const address = new Address();
const Item = List.Item;
const Brief = Item.Brief;


class AddressSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addressHtml:[]
        }
    }

    componentDidMount() {
        this.load();
    }

    load(){
        const addresses = address.List();
        let tempArray = [];
        let i=0;
        for(let ad of addresses){
            tempArray.push(
                <Item wrap key={i++} className="address-box">
                    <h4 className="address-title">
                        <span>
                            {ad.name}
                            <Brief>{ad.desc}</Brief>
                        </span>
                        <img src={axis}/>
                    </h4>
                    <div className="list-address" onClick={()=>{
                        url.goPage(url.transfer(this.props.match.params.currency+"/"+ad.address))
                    }}>{ad.address}</div>
                </Item>
            )
        }
        if(tempArray.length === 0 ){
            tempArray = <div style={{textAlign:"center",background:"#0B0B0C",padding:"15px 0"}}>
                <Icon type="iconwushuju" style={{width:"100px",height:"100px"}}/><br/>
                <span style={{color:"gray"}}>No Data</span>
            </div>
        }
        this.setState({
            addressHtml:tempArray
        })
    }

    render() {
        return <div>
            <div className="layout-top">
                <NavBar
                    style={{background:"#1A1A1B"}}
                    mode="light"
                    leftContent={<Icon type="left" style={{color:"#ffffff"}}/>}
                    onLeftClick={()=>{
                        url.goBack();
                    }}
                    rightContent={<Icon type="iconadd" style={{color:"#ffffff"}} onClick={()=>{
                        url.goPage(url.AddressAdd,url.addressSelect(this.props.match.params.currency))
                    }}/>}
                >
                    {lang.e().page.addressBook.title}
                </NavBar>

            </div>
            <WhiteSpace size="lg"/>
            <div style={{marginTop:"45px"}}>
                <List className="address-listbox">
                    {this.state.addressHtml}
                </List>
            </div>
        </div>
    }
}

export default AddressSelect