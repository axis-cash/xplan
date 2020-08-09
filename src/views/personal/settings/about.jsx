import React, {Component} from 'react'
import {Icon, List, NavBar} from "antd-mobile";
import {lang, url} from "../../../config/common";
import axis from '../../../public/images/mine_logo@2x.png'
import './about.css'
import axios from 'axios';

const urls = [
    {
        name: "Website",
        value: "https://axis.cash",
        url: "https://axis.cash"
    }, {
        name: "GitHub",
        value: "https://github.com/axis-cash/",
        url: "https://github.com/axis-cash/"
    }, {
        name: "Twitter",
        value: "@AXISdotCASH",
        url: ""
    }, {
        name: "Wechat",
        value: "@AXIS9413",
        url: ""
    }]

class AboutUs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            version:"0.0.1"
        }
    }

    componentDidMount() {
        // if(plus && plus.runtime){
        //     this.setState({
        //         version:plus.runtime.version
        //     })
        // }
    }

    checkUpdate() {
        const that = this;
        const ua = navigator.userAgent;
        if (ua.indexOf('Html5Plus') > -1 && ua.indexOf('StreamApp') === -1) {
            let url = "https://raw.githubusercontent.com/axis-cash/xplan/master/other/client.json";
            // const localUtc = new Date().getTimezoneOffset() / 60;
            // if (localUtc === -8) {
            //     url = "https://gitee.com/axis-cash/xplan/other/client.json";
            // }

            axios.get(url)
                .then( (response) => {
                    let clientdata = response.data;
                    if (version !== clientdata.version) {
                        plus.nativeUI.confirm(clientdata.note, function (event) {
                            if (0 === event.index) {
                                plus.runtime.openURL(clientdata.url);
                            }
                        }, clientdata.title, [lang.e().button.update, lang.e().button.cancel]);
                    } else {
                        plus.nativeUI.alert(lang.e().toast.info.isLatest, function(){}, "AXIS Xplan", "OK");
                    }
                })
                .catch( (error) => {
                    console.log(error);
                });

            // that.getReq(url,function (data,err) {
            //     alert(JSON.stringify(data));
            //     if(data){
            //         const rData = JSON.parse(data);
            //         const rsp = rData[lang.e().key];
            //         const version = rsp["version"];
            //         console.log("latest version:"+version);
            //         console.log("plus.runtime.version:"+plus.runtime.version);
            //         if (version !== plus.runtime.version) {
            //             plus.nativeUI.confirm(rsp["note"], function (event) {
            //                 if (0 === event.index) {
            //                     plus.runtime.openURL(rsp["url"]);
            //                 }
            //             }, rsp["title"], [lang.e().button.update, lang.e().button.cancel]);
            //         } else {
            //             plus.nativeUI.alert(lang.e().toast.info.isLatest, function(){}, "AXIS Xplan", "OK");
            //         }
            //     }
            // })
        }
    }

    getReq(url,cb){
        const xhr = new plus.net.XMLHttpRequest();
        xhr.onreadystatechange = function () {
            switch ( xhr.readyState ) {
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                case 4:
                    if ( xhr.status === 200 ) {
                        cb(xhr.responseText,null);
                    } else {
                        cb(null,xhr.readyState);
                    }
                    break;
                default :
                    break;
            }
        }
        xhr.open( "GET", url);
        xhr.send();
    }


    render() {

        let abouts = [];
        let i = 0;
        urls.forEach(function (o) {
            abouts.push(
                <List.Item key={i++} arrow="horizontal" extra={<span style={{color: "#CAAC7B", flexBasis: "60%"}} onClick={() => {
                    if (o.url) {
                        url.goPage(url.browser(o.url))
                    }
                }}>{o.value}</span>}>{o.name}</List.Item>
            )
        })

        return (
            <div>
                <NavBar
                    style={{background:"#1A1A1B"}}
                    mode="light"
                    leftContent={<Icon type="left" style={{color:'#ffffff'}} onClick={() => {
                        url.goBack()
                    }}/>}
                >
                    {lang.e().page.my.about}
                </NavBar>
                <div>
                    <div className="my-header"
                         style={{"height": document.documentElement.clientHeight * 0.15, padding: "15px 0px 30px",background:"#1A1A1B"}}>
                        <img src={axis} style={{width: "250px"}}/>

                    </div>
                    <List>
                        {abouts}
                        <List.Item key={i++} arrow="horizontal" onClick={
                            () => this.checkUpdate()
                        } extra={<span>{this.state.version}</span>}>Version</List.Item>
                    </List>
                </div>
            </div>
        )
    }
}

export default AboutUs