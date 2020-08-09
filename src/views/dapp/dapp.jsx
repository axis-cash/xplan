import React, {Component} from 'react'
import {Grid, WhiteSpace, SearchBar,Carousel,Toast} from 'antd-mobile'
import Layout from "../layout/layout";
import {storage, keys, config, url, baseDecimal, lang} from "../../config/common";
import axis from '../../axis.png'
import './dapp.css'
import axios from 'axios';


let dataRecent =[
    // {
    //     icon: <div className="dapp-icon"><img src={axis} style={{witdh:"36px",height:"36px"}}/></div>,
    //     text: `Token Tracker`,
    //     url:"https://wiki.axis.cash",
    // }
];

let dappdata = '';
/*[
	{
        icon: <div className="dapp-icon"><img src={axis} style={{witdh:"36px",height:"36px"}}/></div>,
        text: `Explorer`,
        url:"http://exp.axis.cash/",
    },
    {
        icon: <div className="dapp-icon"><img src="http://58.64.184.143:3050/logo192.png"  className="dapp-img"/></div>,
        text: `Table Game`,
        url:"http://58.64.184.143:3050/",
    }
    {
        icon: <div className="dapp-icon"><img src={axis} style={{witdh:"36px",height:"36px"}}/></div>,
        text: `AXIS`,
        url:"https://axis.cash",
    },
    {
        icon: <div className="dapp-icon"><img src={axis}  className="dapp-img"/></div>,
        text: `Wiki`,
        url:"https://wiki.axis.cash",
    },
    {
        icon: <div className="dapp-icon"><img src="https://edenworkroom.github.io/dapp/dapp.png"  className="dapp-img"/></div>,
        text: `SC Tool`,
        url:"https://edenworkroom.gitee.io/sctool/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://asnowhero.gitee.io/asnow-xplan/logo.png"  className="dapp-img"/></div>,
        text: `ASNOW`,
        url:"https://asnowhero.gitee.io/asnow-xplan/",
    },
    {
        icon: <div className="dapp-icon"><img src="http://sanguo.artfuture.store/slg/icon.png"  className="dapp-img"/></div>,
        text: `超零三国`,
        url:"http://sanguo.artfuture.store/slg/slg.html",
    },
    {
        icon: <div className="dapp-icon"><img src="http://47.92.113.69/logo.png"  className="dapp-img"/></div>,
        text: `ACES`,
        url:"http://47.92.113.69/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://alpha-live.gitee.io/alpha/logo.png"  className="dapp-img"/></div>,
        text: `ALPHA`,
        url:"https://alpha-live.gitee.io/alpha/index.html",
    },
    {
        icon: <div className="dapp-icon"><img src="http://liutyler.gitee.io/goFighting/logo.png"  className="dapp-img"/></div>,
        text: `GO Fighting`,
        url:"http://liutyler.gitee.io/goFighting",
    },
    {
        icon: <div className="dapp-icon"><img src="http://table.supernode.vip:3000/logo192.png"  className="dapp-img"/></div>,
        text: `Table Game`,
        url:"http://table.supernode.vip:3000/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://edenworkroom.gitee.io/market/logo.png"  className="dapp-img"/></div>,
        text: `Rhino Market`,
        url:"https://edenworkroom.gitee.io/market/",
    },
];*/

class DApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: ['1', '2', '3'],
            dappData:''
        }
    }

    componentDidMount() {
        this.getDapplist();
        // simulate img loading
        setTimeout(() => {
            this.setState({
                // data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }

    getDapplist(){
        console.log('getaxios')
        axios.get('https://raw.githubusercontent.com/axis-W/test/master/dapp.json')
            .then( (response) => {
                let dappdata = response.data;
                for(let i in dappdata){
                    dappdata[i]['icon'] = <div className="dapp-icon"><img src={dappdata[i].icon} style={{witdh:"36px",height:"36px"}}/></div>
                }
                this.setState({
                    dappData:dappdata
                })
            })
            .catch( (error) => {
                console.log(error);
            });
    }


    render() {

        let dapps = storage.get(keys.dapp.list);
        if(dapps) {
            dataRecent=[];
            let tripMap = new Map();
            for(let contractAddress of dapps){
                if(!tripMap.get(contractAddress) === true){
                    tripMap.set(contractAddress,true);
                    let dapp = storage.get(keys.dappsInfoKey(contractAddress));
                    dataRecent.push({
                        icon: <div className="dapp-icon"><img src={dapp.logo} className="dapp-img"/>
                        </div>,
                        text: dapp.name,
                        url: dapp.url,
                    })
                }
            }
        }

        return <Layout selectedTab="dapp">
            <div className="layout-top" style={{color:"#1A1A1B"}}>
                <SearchBar placeholder={lang.e().page.dapp.search} maxLength={200} onSubmit={(val) => {
                    // window.location.replace("/#/browser/"+encodeURIComponent(val));
                    if(val){
                        if(val.indexOf("http")>-1){
                            url.goPage(url.browser(val), url.DApp);
                        }else{
                            Toast.fail(lang.e().page.dapp.invalidDApp,3)
                        }
                    }

                }}/>
            </div>

            <div style={{padding:'45px 0 60px',overflow:'scroll',background:"#0B0B0C"}} >
                <div className="sub-title">{lang.e().page.dapp.recommended} </div>
                <div style={{textAlign: 'center'}}>
                    <Grid data={this.state.dappData} activeStyle={false}  onClick={
                        (e,index)=>{
                            url.goPage(url.browser(e.url),url.DApp)
                        }
                    } hasLine={false}/>
                </div>

                <div>
                    {
                        dataRecent.length>0?<div>
                            <div className="sub-title">{lang.e().page.dapp.recent} </div>
                            <div style={{textAlign: 'center'}}>
                                <Grid data={dataRecent} activeStyle={false} onClick={
                                    (e,index)=>{
                                        url.goPage(url.browser(e.url),url.DApp)
                                    }
                                } hasLine={false}/>

                            </div>
                        </div>:""
                    }
                </div>
            </div>

        </Layout>
    }
}

export default DApp