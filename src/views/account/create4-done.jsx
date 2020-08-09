import React, {Component} from 'react'
import {NavBar, Icon, WhiteSpace, WingBlank, Button, Tag, NoticeBar} from 'antd-mobile'
import Account from "../../components/account/account";
import './create.css'
import {Toast} from "antd-mobile/es";
import {url, lang, keys} from "../../config/common";
import lstorage from "../../components/database/lstorage";

const ac = new Account();
class AccountCreateStep4 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            word: [],
            originWord: [],
            currentWord: [],
            errorMsg: '',
            disabled:true
        }
    }

    done = (donetype = 'skip') => {
        const that = this;
        try {
            this.setState({disabled:true});
            Toast.loading(lang.e().toast.loading.creating,100);
            const type = sessionStorage.getItem("MnemonicType");
            console.log('typedone:',type)
            if(type === "create"){
                that._create(donetype).then();
            }else if (type === "export"){
                that._export(donetype).then();

            }


        }catch (e) {
            console.log(e);
            // console.log(e.message());
        }
    }

    async _export(actType = 'skip'){
        if(actType == 'normal'){
            let current = await ac.getCurrent();
            console.log('keys.account.detail + current.address',keys.account.detail + current.address);
            var accdetail = await lstorage.get(keys.account.detail + current.address);
            console.log('accdetail',accdetail)
            accdetail.overbackup = true;
            await lstorage.set(keys.account.detail + current.address, accdetail);
            await lstorage.set(keys.account.current, accdetail);
        }
        sessionStorage.removeItem("MnemonicType");
        sessionStorage.removeItem("worddata");
        Toast.success(lang.e().toast.success.export,2);
        setTimeout(function () {
            // window.location.replace("/#/walletManage");
            url.goPage(url.Home)
            url.goBack();
        },1500)
    }

    async _create(actType = 'skip'){
        // let temp = storage.get(keys.account.tempKeystore);
        // let temp = await ac.getTempKeystore();
        let invetId;
        invetId = setInterval(function () {
            try{
                ac.getTempKeystore().then(temp=>{
                    if(!temp){
                    }else{
                        clearInterval(invetId);
                        ac.CopyTempKeystore(actType).then(()=>{
                            sessionStorage.removeItem("MnemonicType");
                            sessionStorage.removeItem("worddata");
                            Toast.success(lang.e().toast.success.create,2);
                            setTimeout(function () {
                                url.goPage(url.Home)
                                // window.location.href="/"
                            },1500)
                        }).catch(e=>{
                            Toast.fail(e.message,2);
                        });
                    }
                })
            }catch (e) {
                Toast.fail(e.message,2)
            }
        },1000);
    }

    triggerA = (w,index) => {
        let that = this;
        let {word, currentWord} = this.state;

        word.splice(index,1);

        currentWord.push(w)
        this.setState({
            word: word,
            currentWord: currentWord,
        })
        setTimeout(function () {
            that.displayTag();
        }, 10)
    }

    triggerB = (w,index) => {
        let that = this;
        let {word, currentWord} = this.state;
        currentWord.splice(index,1);
        word.push(w)
        word.sort();
        this.setState({
            word: word,
            currentWord: currentWord,
        })
        setTimeout(function () {
            that.displayTag();
        }, 10)
    }

    displayTag = () => {
        let that = this;
        let {word, currentWord, originWord} = this.state;

        let tags = [];
        let i = 0;
        for (let w of word) {
            let v = i;
            tags.push(<Tag key={v} className="customer-tag" onChange={() => {
                that.triggerA(w,v)
            }}>{w}</Tag>);
            i++
        }

        let currentTags = [];
        let j = 0;
        for (let w of currentWord) {
            let v = j;
            currentTags.push(<Tag key={j} closable onChange={() => {
                that.triggerB(w,v)
            }}>{w}</Tag>);
            j++;
        }

        this.setState({
            tags: tags,
            currentTags: currentTags
        })

        let k = 0;
        let msg = '';
        for (let w of currentWord) {
            let ow = originWord[k++];
            if (ow !== w) {
                msg = lang.e().toast.error.incorrectOrder;
                break;
            }else{
                msg = "";
            }
        }
        if(currentWord.length === originWord.length && msg === ''){
            this.setState({
                disabled:false
            });
        }else{
            if (msg){
                this.setState({
                    errorMsg:lang.e().toast.error.incorrectOrder
                })
            }else{
                this.setState({
                    errorMsg:""
                })
            }
        }
    }

    componentDidMount() {
        let that = this;
        let word = sessionStorage.getItem("worddata");
        if(!word){
            url.goPage(url.Home,"")
            return
        }
        let originWordArray = word.split(" ");
        this.setState({
            originWord: originWordArray,
        })

        let wordArray = word.split(" ");
        wordArray.sort();
        this.setState({
            word: wordArray,
        })

        setTimeout(function () {
            that.displayTag();
        }, 10)
    }

    render() {

        let {tags, currentTags} = this.state;

        return <div style={{background:"#1A1A1B",height:document.documentElement.clientHeight}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" style={{color:'#ffffff'}}/>}
                onLeftClick={() => {
                    // window.location.replace("/#/account/create3");
                    url.goPage(url.AccountCreate3)
                }}
                style={{background:"#1A1A1B"}}
            >
                {lang.e().page.create.step4.title}
            </NavBar>
            <WingBlank size="lg">
                <div style={{textAlign: "center"}}>
                    {/*<Icon type="iconanquan" style={{width: '48px', height: '48px'}} color="gray"/>*/}
                    {/*<h2>{lang.e().page.create.step4.title}</h2>*/}
                    <p style={{color: 'gray'}}>{lang.e().page.create.step4.d1}</p>
                </div>

                <WhiteSpace size="lg"/>
                <div className="tag-div" style={{position: 'relative',
                    padding: '10px 0 30px 10px',border: this.state.errorMsg?'1px solid #F4465A':'1px solid #DFDFDF'}}>
                    {currentTags}
                    {
                        this.state.errorMsg?<span style={{color:'#F4465A',
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px'}}>{this.state.errorMsg}</span>:''
                    }
                </div>
                <div>
                    {tags}
                </div>
            </WingBlank>
            <WhiteSpace size="lg"/>
            <WhiteSpace size="lg"/>
            <WhiteSpace size="lg"/>
            <WhiteSpace size="lg"/>
            <div className="btn-bottom">
                <p style={{color:"#CAAC7B",textAlign:"center"}} onClick={()=>this.done('skip')}>{lang.e().page.create.step4.skip}</p>
                <Button type="primary" disabled={this.state.disabled} onClick={()=>this.done('normal')}>{lang.e().button.done}</Button>
            </div>
        </div>
    }
}

export default AccountCreateStep4