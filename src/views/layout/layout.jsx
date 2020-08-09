import React, {Component} from 'react'
import {NavBar, TabBar, Icon, Toast} from 'antd-mobile'
import './layout.css'
import {storage, keys, config, url, baseDecimal, lang} from "../../config/common";

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div>

            {this.props.children}

            {/*<div className="tabbar">*/}
                {/*<TabBar*/}
                    {/*tintColor='#FFFFFF'*/}
                    {/*unselectedTintColor='#7E7E7E'*/}
                {/*>*/}
                    {/*<TabBar.Item*/}
                        {/*icon={<Icon type="iconcopper-coin-line"/>}*/}
                        {/*selectedIcon={<Icon type="iconcopper-coin-line1"/>}*/}
                        {/*title={lang.e().navbar.wallet}*/}
                        {/*key="home"*/}
                        {/*selected={this.props.selectedTab === 'home'}*/}
                        {/*onPress={()=>{*/}
                            {/*url.goPage(url.Home,"")*/}
                        {/*}}*/}
                        {/*style={{background:'#f00'}}*/}
                    {/*>*/}
                    {/*</TabBar.Item>*/}
                    {/*<TabBar.Item*/}
                    {/*    icon={<Icon type="iconStaking"/>}*/}
                    {/*    selectedIcon={<Icon type="iconStaking1"/>}*/}
                    {/*    title="Stake"*/}
                    {/*    key="stake"*/}
                    {/*    selected={this.props.selectedTab === 'stake'}*/}
                    {/*    onPress={()=>{*/}
                    {/*        url.goPage(url.Stake,"")*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*</TabBar.Item>*/}
                    {/*<TabBar.Item*/}
                        {/*icon={<Icon type="icondapp"/>}*/}
                        {/*selectedIcon={<Icon type="icondapp1"/>}*/}
                        {/*title={lang.e().navbar.dapp}*/}
                        {/*key="dapp"*/}
                        {/*selected={this.props.selectedTab === 'dapp'}*/}
                        {/*onPress={()=>{*/}
                            {/*url.goPage(url.DApp,"")*/}
                        {/*}}*/}
                    {/*>*/}
                    {/*</TabBar.Item>*/}
                    {/*<TabBar.Item*/}
                        {/*icon={<Icon type="iconmy2"/>}*/}
                        {/*selectedIcon={<Icon type="iconmy1"/>}*/}
                        {/*title={lang.e().navbar.my}*/}
                        {/*key="my"*/}
                        {/*selected={this.props.selectedTab === 'my'}*/}
                        {/*onPress={()=>{*/}
                            {/*url.goPage(url.Personal,"")*/}
                        {/*}}*/}
                    {/*>*/}
                    {/*</TabBar.Item>*/}
                {/*</TabBar>*/}
            {/*</div>*/}
            <div className="appbtmbar">
                <a className={this.props.selectedTab === 'home' ? 'active' : ''} onClick={()=>{
                    url.goPage(url.Home,"")
                }}>

                    <img src={require('../../public/images/nav_home_default@2x.png')}/>
                    <img src={require('../../public/images/nav_home_actived@2x.png')}/>
                    X-Cash
                </a>
                <a className={this.props.selectedTab === 'miner' ? 'active' : ''}  onClick={()=>{
                    // url.goPage(url.DApp,"")
                    Toast.info(lang.e().conf.layout_build, 1.5)
                }}>
                    <img src={require('../../public/images/nav_miner_default@3x.png')}/>
                    <img src={require('../../public/images/nav_miner_default@3x.png')}/>
                    {/*<img src={require('../../public/images/nav_miner_actived@3x.png')}/>*/}
                    X-Miner
                </a>
                <a className={this.props.selectedTab === 'dao' ? 'active' : ''}  onClick={()=>{
                    // url.goPage(url.Personal,"")
                    Toast.info(lang.e().conf.layout_build, 1.5)
                }}>
                    <img src={require('../../public/images/nav_dao_default@3x.png')}/>
                    <img src={require('../../public/images/nav_dao_default@3x.png')}/>
                    {/*<img src={require('../../public/images/nav_dao_actived@3x.png')}/>*/}
                    X-DAO
                </a>
                <a className={this.props.selectedTab === 'dapp' ? 'active' : ''}  onClick={()=>{
                    url.goPage(url.DApp,"")
                }}>
                    <img src={require('../../public/images/nav_app_default@2x.png')}/>
                    <img src={require('../../public/images/nav_app_actived@2x.png')}/>
                    X-Code
                </a>
            </div>
        </div>
    }
}

export default Layout