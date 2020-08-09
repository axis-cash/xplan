import React, {Component} from 'react'
import {WhiteSpace, WingBlank, Icon, Flex, List, Badge, NavBar} from 'antd-mobile'
import Layout from "../layout/layout";
import './personal.css'
import {storage, keys, config, url, baseDecimal, lang} from "../../config/common";
import axis from '../../public/images/mine_logo@2x.png'

class Personal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'my',
            hidden: false,
            fullScreen: false,
        }
    }

    render() {
        return <div>
            <NavBar
                style={{background:"#1A1A1B"}}
                mode="light"
                leftContent={<Icon type="left" style={{color:'#ffffff'}} onClick={() => {
                    url.goBack()
                }}/>}
            >

            </NavBar>
            <div style={{textAlign: 'center'}}>
                <div className="my-header" style={{"height": document.documentElement.clientHeight * 0.15, padding: "15px 0px 30px",background:'#1A1A1B'}}>
                    <img src={axis} style={{width:"250px"}}/>
                </div>

                {/*<div style={{background:"#f7f7f7"}}>*/}
                {/*    <Flex style={{textAlign: 'center'}}>*/}
                {/*        <Flex.Item>*/}
                {/*            <List>*/}
                {/*                <List.Item*/}
                {/*                    onClick={()=>{*/}
                {/*                        // window.location.replace("/#/address")*/}
                {/*                        url.goPage(url.AddressList,url.Personal)*/}
                {/*                    }}*/}
                {/*                    thumb={<Icon type="iconAddressbook-" color="gray"/>}><span>Address Book</span></List.Item>*/}
                {/*            </List>*/}
                {/*        </Flex.Item>*/}
                {/*        <Flex.Item>*/}
                {/*            <List>*/}
                {/*                <List.Item thumb={<Icon type="iconNotification" color="gray"/>} extra={<Badge text={77} overflowCount={55} />}><span>Notifycations</span></List.Item>*/}
                {/*            </List>*/}
                {/*        </Flex.Item>*/}
                {/*    </Flex>*/}

                {/*</div>*/}
                <div>
                    {/*<div style={{background:"#FFFFFF"}}>*/}

                        {/*<List>*/}
                            {/*<List.Item*/}
                                {/*onClick={()=>{*/}
                                    {/*// window.location.replace("/#/address")*/}
                                    {/*url.goPage(url.AddressList,url.Personal)*/}
                                {/*}}*/}
                                {/*arrow="horizontal"*/}
                                {/*thumb={<img src={require('../../public/images/mine_add@2x.png')}/>}><span>{lang.e().page.my.addressBook}</span></List.Item>*/}
                        {/*</List>*/}
                    {/*</div>*/}
                    {/*<WhiteSpace size="lg"/>*/}

                    {/*<div style={{background:"#FFFFFF"}}>*/}

                        {/*<List>*/}

                                {/*<List.Item arrow="horizontal" thumb={<img src={require('../../public/images/mine_wallet@2x.png')}/>} onClick={()=>{*/}
                                    {/*// window.location.replace("/#/walletManage")*/}
                                    {/*url.goPage(url.WalletManager,url.Personal);*/}
                                {/*}} ><span>{lang.e().page.my.walletManage}</span></List.Item>*/}

                        {/*</List>*/}
                    {/*</div>*/}
                    {/*<WhiteSpace size="lg"/>*/}

                    <div style={{background:"#1A1A1B"}}>

                            <List>
                                <List.Item
                                onClick={()=>{
                                    // window.location.replace("/#/address")
                                    url.goPage(url.AddressList,url.Personal)
                                }}
                                arrow="horizontal"
                                thumb={<img src={require('../../public/images/mine_add@2x.png')}/>}><span>{lang.e().page.my.addressBook}</span></List.Item>
                                <List.Item arrow="horizontal" thumb={<img src={require('../../public/images/mine_wallet@2x.png')}/>} onClick={()=>{
                                    // window.location.replace("/#/walletManage")
                                    url.goPage(url.WalletManager,url.Personal);
                                }} ><span>{lang.e().page.my.walletManage}</span></List.Item>
                                <List.Item arrow="horizontal" thumb={<img src={require('../../public/images/mine_edit@2x.png')}/>} onClick={()=>{
                                    url.goPage(url.Settings,url.Personal);
                                }}><span >{lang.e().page.my.settings}</span></List.Item>
                                <List.Item arrow="horizontal" thumb={<img src={require('../../public/images/mine_xieyi@2x.png')}/>} onClick={()=>{
                                    url.goPage(url.browser(config.language==="zh_CN"?"termOfUse-cn.html":"termOfUse.html"),url.Personal)
                                }}
                                ><span >{lang.e().page.my.termOfUse}</span></List.Item>
                                <List.Item arrow="horizontal" thumb={<img src={require('../../public/images/mine_about@2x.png')}/>} onClick={()=>{
                                    url.goPage(url.About,url.Personal)
                                }}><span >{lang.e().page.my.about}</span></List.Item>
                            </List>

                    </div>
                    <WhiteSpace size="lg"/>

                </div>

            </div>

        </div>
    }
}

export default Personal