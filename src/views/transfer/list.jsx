import React ,{Component} from 'react'
import {Icon, NavBar,Tabs,ListView,PullToRefresh,List,Button,Toast} from "antd-mobile";
import {decimals} from "../../components/tx/decimals";
import './transfer.css'
import Account from "../../components/account/account";
import Utils from "../../config/utils";
import {keys, lang, storage, url} from "../../config/common";
import {assetService} from "../../components/service/service";
import BigNumber from 'bignumber.js'

const utils = new Utils();
const account = new Account();
let tabs = [
    { title: <span style={{color:"#64727c",fontWeight:"bold"}}>{lang.e().page.txList.all}</span> },
    { title: <span style={{color:"#64727c",fontWeight:"bold"}}>{lang.e().page.txList.out}</span> },
    { title: <span style={{color:"#64727c",fontWeight:"bold"}}>{lang.e().page.txList.in}</span> }
];

const Item = List.Item;
const Brief = Item.Brief;

const NUM_ROWS = 10;
let pageIndex = 1;

class TransferList extends Component{

    constructor(props) {
        super(props);

        this.state = {
            all:[],
            in:[],
            out:[],

            datas:[],
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight-45,
            hasMore:true,
            address:''
        }
    }

    componentDidMount() {
        let that = this;
        tabs = [
            { title: <span style={{color:"#64727c",fontWeight:"bold"}}>{lang.e().page.txList.all}</span> },
            { title: <span style={{color:"#64727c",fontWeight:"bold"}}>{lang.e().page.txList.out}</span> },
            { title: <span style={{color:"#64727c",fontWeight:"bold"}}>{lang.e().page.txList.in}</span> }
        ];
        pageIndex = 1;
        const hei = this.state.height;

        const act = new Account();
        act.getCurrent().then(current=>{
            that.setState({
                address:current.address
            })
        })

        Toast.loading("loading...",2)
        setTimeout(() => {
            that.initTxList(10).then(_data=>{
                that.setState({
                    datas: _data,
                    height: hei,
                    refreshing: false,
                    isLoading: false,
                    hasMore:_data.length>=10,
                });
            })

        }, 600);

    }

    onRefresh = () => {
        let that = this;
        that.setState({ refreshing: true, isLoading: true ,datas:[]});
        // simulate initial Ajax
        Toast.loading("loading...",2)
        that.initTxList().then(_data=>{
            that.setState({
                datas: _data,
                refreshing: false,
                isLoading: false,
                hasMore:_data.length>=10,
            });
        })
    };


    onEndReached = (event) => {
        let that = this;
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (that.state.isLoading) {
            return;
        }
        console.log('reach end', event);
        that.setState({ isLoading: true });
        Toast.loading("loading...",2)
        that.initTxList(++pageIndex).then((_data)=>{
            if(_data.length > that.state.datas.length){
                that.setState({
                    datas: _data,
                    isLoading: false,
                    hasMore:_data.length>=10
                });
            }else{
                that.setState({
                    datas: _data,
                    isLoading: false,
                    hasMore:false,
                });
            }
        })
    };

    async initTxList(count){
        if(!count){
            count = NUM_ROWS;
        }else{
            count = pageIndex*NUM_ROWS
        }
        let act = await account.getCurrent();
        // let address = act.address;
        let currency = this.props.match.params.currency;
        return await assetService.getTxList(act.tk,currency,count );
    }

    render() {
        let currency = this.props.match.params.currency;

        const {datas,hasMore,isLoading} = this.state;
        let renderTx = [];

        if(datas && datas.length>0){
            for(let i=datas.length-1;i>=0;i--){
                let time;
                const tx = datas[i];
                if(tx && tx.Time){
                    time = utils.formatDate(tx.Time)
                }
                let value = 0;
                tx.Tkn.forEach(function (amount,cy) {
                    if(cy === currency){
                        value = decimals.convert(amount,cy)
                    }
                })
                if(tx.Type === "out" && new BigNumber(value).comparedTo(0)===1){
                    tx.Type = "in";
                }else if(tx.Type === "in" && new BigNumber(value).comparedTo(0)===-1){
                    tx.Type = "out";
                }
                const icontype = "out"===tx.Type?"iconzhichu":"iconshouru";
                const iconcolor = "out"===tx.Type?"#F4465A":"#CAAC7B !important";
                const symbol =  "out"===tx.Type?"":"+";
                const iconsrc = "out" ===tx.Type?require('../../public/images/edit_out@2x.png'):require('../../public/images/asset_into@2x.png');

                renderTx.push(
                    <Item key={i} multipleLine
                          onClick={()=>{
                              storage.set(keys.txInfoKey("",tx.TxHash),tx);
                              url.goPage(url.transferDetail(tx.TxHash),url.transferList(currency));
                          }}
                          thumb={<img src={iconsrc}/> }
                          extra={<span className="income-span" style={{color:iconcolor}}>{symbol}{value}</span>}>
                        <span style={{fontSize: '14px',color:"#DFDFDF"}}>{utils.ellipsisHash(tx.TxHash)}</span>
                        <Brief style={{fontSize: '12px',color:"#c4c7cc",marginTop:'0'}}>{time}</Brief>
                    </Item>
                )
            }
            renderTx.push(
                <Item key={datas.length+1} multipleLine>
                    <p style={{textAlign:'center',color:'#198fea'}}>
                    {isLoading?"loading...":hasMore?<Button size={"small"} type={"ghost"} onClick={()=>this.onEndReached()}>Show more</Button>:"~"}
                    </p>
                </Item>
            )
        }else{
            if(!isLoading){
                renderTx.push(
                    <Item key={1} multipleLine>
                        <div style={{textAlign:"center",padding:"15px 0",marginTop:'25px'}}>
                            <img src={require('../../public/images/asset_empty@3x.png')} style={{width:'80px',height:'80px',marginBottom: '10px'}}/>
                            <br/>
                            <span style={{color:"gray"}}>{lang.e().page.txList.noData}</span>
                        </div>
                    </Item>
                )
            }
        }


        return <div style={{height: document.documentElement.clientHeight,background:'#1A1A1B'}}>
            <div className="layout-top">
                <NavBar
                    style={{background:"#1A1A1B"}}
                    mode="light"
                    icon={<Icon type="left" style={{color:'#ffffff'}}/>}
                    onLeftClick={() => {
                        url.goBack();
                    }}
                >
                    {this.props.match.params.currency}
                </NavBar>
            </div>

            <PullToRefresh
                damping={100}
                ref={el => this.ptr = el}
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                }}
                indicator={this.state.down ? {} : { deactivate: 'pull to refresh' }}
                direction={'down'}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
            >
                <div style={{marginTop:'45px'}}>
                <List>
                    {renderTx}
                </List>
                </div>
            </PullToRefresh>

            <div className='bottom-button-div'>
                <div className='bottom-button-div-left' style={{width: '45%'}}>
                    <Button className='bottom-button-div-receive' style={{height:'38px',lineHeight:'38px'}} onClick={
                        ()=>{
                            if(this.state.address){
                                url.goPage(url.receive(this.state.address,"pkr"),url.transferList(this.props.match.params.currency));
                            }
                        }
                    }>{lang.e().button.receive}</Button>
                </div>
                <div className='bottom-button-div-right' style={{width: '45%'}}>
                    <Button className='bottom-button-div-transfer' style={{height:'38px',lineHeight:'38px',background:'#F4465A'}} onClick={()=>{
                        url.goPage(url.transfer(this.props.match.params.currency),url.transferList(this.props.match.params.currency));
                    }}>{lang.e().button.transfer}</Button>
                </div>
            </div>

        </div>
    }
}

export default TransferList