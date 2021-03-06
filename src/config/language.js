import {keys, storage} from "./common";

class Language {

    e = () => {
        let tLang = storage.get(keys.settings.language);
        if (!tLang) {
            let localUtc = new Date().getTimezoneOffset() / 60;
            if (localUtc === -8) {
                storage.set(keys.settings.language, "zh_CN")
                return this.zh_CN;
            } else {
                storage.set(keys.settings.language, "en_US")
                return this.en_US;
            }
        } else {
            if (tLang === "en_US") {
                return this.en_US;
            } else if (tLang === "zh_CN") {
                return this.zh_CN;
            } else if (tLang === "ja_JP") {
                return this.ja_JP;
            } else if (tLang === "be_BY") {
                return this.be_BY;
            } else if (tLang === "ko_KR") {
                return this.ko_KR;
            } else {
                return this.en_US;
            }
        }
    }

    en_US = {
        key: "en_US",
        value: "English",
        conf:{
            home_transfer: "Transfer",
            home_scan: "Scan Code",
            home_blocknumber: "current block",
            home_change: "Switch",
            home_receive: "Address",
            home_backup: "You have not verified the mnemonic phrase, please click to verify, otherwise it may cause asset loss!",
            import_mnemonic: "mnemonic",
            layout_build:"In development"
        },
        button: {
            confirm: "Confirm",
            cancel: "Cancel",
            next: "Next",
            receive: "Receive",
            transfer: "Transfer",
            add: "Add",
            save: "Save",
            deleteAddress: "Delete Address",
            createWallet: "Create Wallet",
            importWallet: "Import Wallet",
            create: "Create",
            done: "Done",
            import: "Import",
            ok: "OK",
            openTip: "Open on October 31",
            update: "Update",
        },

        navbar: {
            wallet: "Wallet",
            dapp: "DApp",
            my: "My",
        },

        toast: {
            info: {
                quitApp: "Press again to exit App !",
                isLatest: "You are the latest version!",
                createWallet: "Please create wallet first !"
            },
            success: {
                add: "Add Successfully",
                copy: "Copy Successfully",
                create: "Create Wallet Successfully",
                export: "Export Successfully",
                save: "Save Successfully",
                import: "Import Successfully",
                send: "Send Successfully",
                clear: "Clear Successfully"
            },
            loading: {
                creating: "Creating...",
                exporting: "Exporting...",
                importing: "Importing...",
                sending: "Sending..."
            },
            error: {
                passwordVerify: "Password at least 8 characters!",
                passwordNotMatch: "Password do not match!",
                incorrectOrder: "Incorrect order of Mnemonic Phrase!",
                invalidAddress: "Invalid Address!",
                accountExisted: "The account has existed!",
                notEnough: "The balance is not enough!",
                passwordError: "Password is incorrect!",
                notEnoughFee: "Not enough AXIS to pay gas fee !"
            }
        },

        modal: {
            help: "Help",
            sure: "Are you sure???",
            mainPKr: "This is a collection address that can be used for frequent collections such as mining.",
            pkr: "The collection address will change after each successful transaction.",
            createWallet: "Create Wallet",
            importWallet: "Import Wallet",
            clearData: "Clear app data",
            confirmClear: "Please confirm that you have backed up your account. Cleared will resynchronize transaction data",
            clearTip: 'Click "Confirm" to start syncing data. There may be a white screen during the process. Please wait patiently for data synchronization to complete, do not end the process easily.',
        },

        page: {
            wallet: {
                mainPKr: "mainPKr",
                PKr: "PKr",
                Assets: "Assets",
                selectWallet: "Select Wallet",
            },

            txList: {
                all: "All",
                out: "Out",
                in: "In",
                noData: "No data",
            },

            txDetail: {
                title: "Transaction info",
                success: "Success",
                pending: "Pending",
                amount: "Amount",
                fee: "Fee",
                from: "From",
                to: "To",
                hash: "Hash",
                block: "Block",
                goto: "Go to block explorer for more details >"
            },

            txTransfer: {
                balance: "Balance",
                address: "Address",
                inputAmount: "Input Amount",
                inputAddress: "Please Input AXIS Address",
                fee: "Fee",
                total: "Total",
                amount: "Amount",
                gas: "Gas",
                gasPrice: "Gas Price",
                inputPassword: "Input Password",
                passwordMsg: "Your account password"
            },

            addressBook: {
                title: "Address book",
                add: "Add Address",
                name: "Name",
                address: "Address",
                description: "Description(optional)",
                detail: "Address Detail",
            },

            walletManage: {
                mainPKr: "MainPKr",
                PKr: "PKr",
                passwordHint: "Password hint",
                export: "Export Mnemonic Phrase",
                password: "Input password",
                changePasswordHint: "Change Password Hint",
                changeProfilePhoto: "Change Profile Photo",
                changeWalletName: "Change Wallet Name",
            },

            setting: {
                language: "Language",
                unit: "Currency Unit",
                node: "Node Settings",
                pkr: "Check synchronization status",
                source:"Select Wallet Source"
            },

            create: {
                import: "Import",
                pleaseInput: "please enter",
                step1: {
                    title: "Create AXIS Wallet",
                    walletName: "Wallet Name",
                    password: "Password",
                    rePassword: "Repeat Password",
                    hint: "Password hint(optional)",
                    passwordTips: "At least 8 characters, recommended to mix uppercase and lowercase alphabets, numbers and symbols"
                },
                step2: {
                    title: "Backup Tips",
                    d1: "Obtaining Mnemonic equals owning all assets",
                    d2: "Backup Mnemonic",
                    d3: "Please write down the Mnemonic . If your phone is lost, stolen, damaged, the Mnemonic will be able to recover your assets",
                    d4: "Offline storage",
                    d5: "Please save it in a secure place, isolated from the internet . Please do not share or store the Mnemonic in a network environment, such as email, albums, social apps and others.",
                    d6: "Do not take screenshot .",
                    d7: "Please do not share or store the screenshots, which may be collected by third-party, resulting in loss of assets.",
                },
                step3: {
                    title: "Backup Mnemonic Phrase",
                    d1: "Please transcribe the Mnemonic phrase properly and back up it securely",
                },
                step4: {
                    title: "Confirm",
                    d1: "Please select Mnemonic Phrase in correct order",
                    skip:"Already backed up? Skip this step",
                },
            },
            import: {
                tips: "You can reset the password while importing the Mnemonic Phrase",
                inputTips: "Enter mnemonic phrases separated by spaces",
                name: "Wallet Name",
                password: "Wallet Password",
                rePassword: "Repeat Password",
                hint: "Password hint",
            },
            my: {
                addressBook: "Address Book",
                walletManage: "Wallet Manage",
                settings: "Settings",
                termOfUse: "Term of use",
                about: "About us",
                clear: "Clear app data",

                address: {
                    name: "Name",
                    address: "Address",
                    description: "Description(optional)",
                    add: "Add Address",
                    edit: "Edit Address",
                    detail: "Address detail"
                },
                manage: {
                    mainPKr: "MainPKr",
                    pkr: "PKr",
                    hint: "Password hint",
                    export: "Export Mnemonic Phrase"
                },

            },
            dapp: {
                search: "Enter DApp url",
                invalidDApp: "Invalid DApp url",
                recent: "Recent",
                recommended: "Recommended",
            }

        }
    };

    zh_CN = {
        key: "zh_CN",
        value: "简体中文",
        conf:{
            home_transfer:"转 账",
            home_scan:"扫 码",
            home_blocknumber:"当前区块",
            home_change:"切换",
            home_receive:"收款地址",
            home_backup:"您还未验证助记词，请点击进行验证，否则可能导致资产丢失！",
            import_mnemonic:"助记词",
            layout_build:"开发中"
        },
        button: {
            confirm: "确认",
            cancel: "取消",
            next: "下一步",
            receive: "收款",
            transfer: "交易",
            add: "增加",
            save: "保存",
            deleteAddress: "删除",
            createWallet: "创建钱包",
            importWallet: "导入钱包",
            create: "创建",
            done: "完成",
            import: "导入",
            ok: "好的",
            openTip: "10月31号开启此功能",
            update: "立即更新",
        },

        navbar: {
            wallet: "钱包",
            dapp: "应用",
            my: "我的",
        },

        toast: {
            info: {
                quitApp: "再按一次退出应用!",
                isLatest: "已经是最新版本!",
                createWallet: "请先创建钱包账户 !"
            },
            success: {
                add: "增加成功",
                copy: "拷贝成功",
                create: "创建钱包成功",
                export: "导出成功",
                save: "保存成功",
                import: "导入成功",
                send: "发送成功",
                clear: "清理成功"
            },
            loading: {
                creating: "创建中...",
                exporting: "导出中...",
                importing: "导入中...",
                sending: "发送中..."
            },
            error: {
                passwordVerify: "密码为8位以上字符长度!",
                passwordNotMatch: "两次密码输入的不一致!",
                incorrectOrder: "助记词的顺序不正确!",
                invalidAddress: "无效的收款地址!",
                accountExisted: "账户存在!",
                notEnough: "余额不足!",
                passwordError: "密码不正确!",
                notEnoughFee: "没有足够的AXIS支付矿工费用",
            }

        },

        modal: {
            help: "帮助",
            sure: "确认删除吗???",
            mainPKr: "此收款地址可作为常用收款码，例如：挖矿地址。",
            pkr: "此收款地址不可做常用收款码，每次收款后将会刷新。",
            createWallet: "新建钱包",
            importWallet: "导入钱包",
            clearData: "清除应用数据",
            confirmClear: "请确认你已经备份好账户。清除后将重新同步交易数据",
            clearTip: "点击“确认”开始同步数据，过程中可能会出现白屏，请耐心等待数据同步完成，不要轻易结束进程。",
        },

        page: {
            wallet: {
                mainPKr: "常规收款",
                PKr: "匿名收款",
                Assets: "资产",
                selectWallet: "选择钱包",
            },

            txList: {
                all: "全部",
                out: "转出",
                in: "转入",
                noData: "暂无数据",
            },

            txDetail: {
                title: "交易详情",
                pending: "处理中",
                success: "交易成功",
                amount: "金额",
                fee: "费用",
                from: "发送",
                to: "收款",
                hash: "交易哈希",
                block: "块号",
                goto: "到区块浏览器查看详情 >"
            },

            txTransfer: {
                balance: "余额",
                address: "收款地址",
                inputAmount: "请输入金额",
                inputAddress: "请输入地址",
                fee: "费用",
                total: "总计",
                amount: "金额",
                gas: "Gas",
                gasPrice: "Gas Price",
                inputPassword: "请输入密码",
                passwordMsg: "账户密码"
            },

            addressBook: {
                title: "地址簿",
                add: "添加地址簿",
                name: "钱包名称",
                address: "地址",
                description: "描述(可选)",
                detail: "地址详情",
            },

            walletManage: {
                mainPKr: "常规收款",
                PKr: "匿名收款",
                password: "请输入密码",
                passwordHint: "密码提示信息",
                export: "导出助记词",
                changePasswordHint: "修改密码提示信息",
                changeProfilePhoto: "修改头像",
                changeWalletName: "修改钱包名称",
            },

            setting: {
                language: "语言",
                unit: "币种单位",
                node: "节点设置",
                pkr: "查看同步状态",
                source:"设置钱包开源社区",
            },

            create: {
                import: "导入",
                pleaseInput: "请输入",
                step1: {
                    title: "创建钱包",
                    walletName: "钱包名称",
                    password: "密码",
                    rePassword: "重复输入密码",
                    hint: "密码提示信息(可选)",
                    passwordTips: "不少于8位字符，建议混合大小字母、数字组合"
                },
                step2: {
                    title: "备份提示",
                    d1: "获得助记词等于拥有钱包资产所有权利",
                    d2: "备份助记词",
                    d3: "使用纸和笔正确抄写助记词，如果你的手机丢失、被盗、损坏、助记词将可以恢复你的资产",
                    d4: "离线保管",
                    d5: "妥善保管至隔离网络的安全地方，请勿将助记词在联网环境下分享和存储，比如：邮件、相册、社交应用等",
                    d6: "请勿截屏",
                    d7: "请勿截屏分享和存储，这将可能被第三方恶意软件收集，造成资产损失",
                },
                step3: {
                    title: "备份助记词",
                    d1: "请按顺序选择助记词，确保备份正确",
                },
                step4: {
                    title: "确认助记词",
                    d1: "请按顺序点击助记词，以确认您正确备份",
                    skip:"已备份? 跳过此步骤",
                },
            },
            import: {
                tips: "使用助记词导入的同时可以修改钱包密码。",
                inputTips: "输入助记词单词，并使用空格分隔",
                name: "钱包名称",
                password: "钱包密码",
                rePassword: "重复输入密码",
                hint: "密码提示信息",
            },
            my: {
                addressBook: "地址簿",
                walletManage: "钱包管理",
                settings: "使用设置",
                termOfUse: "用户协议",
                about: "关于我们",
                clear: "清除缓存",

                address: {
                    name: "钱包名称",
                    address: "地址",
                    description: "备注(可选)",
                    add: "增加地址",
                    edit: "编辑地址",
                    detail: "地址详情"
                },

                manage: {
                    mainPKr: "主收款码",
                    pkr: "收款码",
                    hint: "密码提示信息",
                    export: "导出助记词"
                },

            },

            dapp: {
                search: "输入DApp的地址",
                invalidDApp: "无效的DApp url",
                recent: "最近使用",
                recommended: "推荐",
            }

        }
    };

    ja_JP = {
        key: "ja_JP",
        value: "日本語",
        conf:{
            home_transfer:"転 送",
            home_scan:"スキャン",
            home_blocknumber:"現在のブロック",
            home_change:"スイッチ",
            home_receive:"アドレス",
            home_backup:"ニーモニックフレーズを確認していません。クリックして確認してください。確認しないと、資産が失われる可能性があります。",
            import_mnemonic:"ニーモニック",
            layout_build:"開発中"
        },
        button: {
            confirm: "確認する",
            cancel: "キャンセル",
            next: "次",
            receive: "受け取る",
            transfer: "転送",
            add: "加える",
            save: "セーブ",
            deleteAddress: "住所を削除",
            createWallet: "ウォレットを作成",
            importWallet: "ウォレットをインポート",
            create: "ート",
            done: "完了",
            import: "完了",
            ok: "OK",
            openTip: "10月31日にオープン",
            update: "今すぐ更新",
        },

        navbar: {
            wallet: "財布",
            dapp: "DApp",
            my: "僕の",
        },

        toast: {
            info: {
                quitApp: "もう一度押すとアプリが終了します！",
                isLatest: "すでに最新バージョンです!",
                createWallet: "最初にウォレットを作成してください!"
            },
            success: {
                add: "正常に追加されました",
                copy: "正常にコピーされました",
                create: "ウォレットを作成しました 首尾よく",
                export: "正常にエクスポートされました",
                save: "正常に保存",
                import: "正常にインポートされました",
                send: "正常に送信されました",
                clear: "正常にクリアされました"
            },
            loading: {
                creating: "作成...",
                exporting: "エクスポートしています...",
                importing: "インポートしています...",
                sending: "送信 ..."
            },
            error: {
                passwordVerify: "少なくとも8文字のパスワード！",
                passwordNotMatch: "パスワードが一致しません！",
                incorrectOrder: "ニーモニックフレーズの順序が正しくありません！",
                invalidAddress: "無効なアドレス！",
                accountExisted: "アカウントは既に存在します！",
                notEnough: "バランスが十分ではありません！",
                passwordError: "間違ったパスワード！",
                notEnoughFee: "料金を支払うのに十分なAXISがありません！"
            }
        },

        modal: {
            help: "助けて",
            sure: "本気ですか？？？",
            mainPKr: "これは、マイニングなどの頻繁な収集に使用できる収集アドレスです。",
            pkr: "収集アドレスは、トランザクションが成功するたびに変更されます。",
            createWallet: "ウォレットを作成",
            importWallet: "ウォレットをインポート",
            clearData: "アプリデータを消去する",
            confirmClear: "アカウントをバックアップしたことを確認してください。トランザクションデータはクリア後に再同期されます",
            clearTip: '[確認]をクリックして、データの同期を開始します。プロセス中に白い画面が表示される場合があります。データの同期が完了するまでお待ちください。プロセスを突然終了しないでください。'
        },

        page: {
            wallet: {
                mainPKr: "メインPKr",
                PKr: "PKr",
                Assets: "資産",
                selectWallet: "ウォレットを選択",
            },

            txList: {
                all: "すべて",
                out: "でる",
                in: "に",
                noData: "データなし",
            },

            txDetail: {
                title: "取引情報",
                success: "成功",
                pending: "ペンディング",
                amount: "量",
                fee: "料金",
                from: "から",
                to: "に",
                hash: "ハッシュ",
                block: "ブロック",
                goto: "詳細については、ブロックエクスプローラーに移動してください"
            },

            txTransfer: {
                balance: "バランス",
                address: "住所を",
                inputAmount: "入力量",
                inputAddress: "AXISアドレスを入力してください",
                fee: "料金",
                total: "合計",
                amount: "量",
                gas: "ガス",
                gasPrice: "ガス価格",
                inputPassword: "入力パスワード",
                passwordMsg: "アカウントのパスワード"
            },

            addressBook: {
                title: "住所録",
                add: "住所を追加",
                name: "名",
                address: "住所を",
                description: "説明（オプション）",
                detail: "住所の詳細",
            },

            walletManage: {
                mainPKr: "メインPKr",
                PKr: "PKr",
                passwordHint: "パスワードのヒント",
                export: "ニーモニックフレーズのエクスポート",
                password: "パスワードを入力してください",
                changePasswordHint: "パスワードのヒントを変更する",
                changeProfilePhoto: "プロフィール写真の変更",
                changeWalletName: "ウォレット名を変更",
            },

            setting: {
                language: "言語",
                unit: "通貨単位",
                node: "ノード設定",
                pkr: "PKrを確認する",
                source:"ウォレットをオープンソースに設定します",
            },

            create: {
                import: "インポート",
                pleaseInput: "入ってください",
                step1: {
                    title: "AXISウォレットを作成",
                    walletName: "ウォレット名",
                    password: "パスワード",
                    rePassword: "パスワードを再度入力してください",
                    hint: "パスワードヒント（オプション）",
                    passwordTips: "少なくとも8文字。大文字と小文字のアルファベット、数字、記号を混在させることをお勧めします"
                },
                step2: {
                    title: "バックアップのヒント",
                    d1: "ニーモニックを取得することは、すべての資産を所有することに等しい",
                    d2: "バックアップニーモニック",
                    d3: "ニーモニックを書き留めてください。スマートフォンが紛失、盗難、破損した場合、Mnemonicを使用して資産を回復できます",
                    d4: "オフラインストレージ",
                    d5: "インターネットから隔離された安全な場所に保存してください。メール、アルバム、ソーシャルアプリなどのネットワーク環境でニーモニックを共有または保存しないでください。",
                    d6: "スクリーンショットを撮らないでください",
                    d7: "スクリーンショットを共有または保存しないでください。サードパーティが収集したスクリーンショットは、資産の損失につながる可能性があります。",
                },
                step3: {
                    title: "バックアップニーモニックフレーズ",
                    d1: "ニーモニックフレーズを適切にメモし、安全にバックアップしてください",
                },
                step4: {
                    title: "確認する",
                    d1: "ニーモニックフレーズを正しい順序で選択してください",
                    skip:"バックアップ済みですか？このステップをスキップしてください",
                },
            },
            import: {
                tips: "ニーモニックフレーズのインポート中にパスワードをリセットできます",
                inputTips: "ニーモニックフレーズをスペースで区切って入力してください",
                name: "ウォレット名",
                password: "ウォレットパスワード",
                rePassword: "パスワードを再度入力してください",
                hint: "パスワードのヒント",
            },
            my: {
                addressBook: "住所録",
                walletManage: "ウォレット管理",
                settings: "設定",
                termOfUse: "利用規約",
                about: "私たちに関しては",
                clear: "アプリのデータを消去",

                address: {
                    name: "名",
                    address: "住所を",
                    description: "説明（オプション）",
                    add: "住所を追加",
                    edit: "住所を編集",
                    detail: "住所の詳細"
                },
                manage: {
                    mainPKr: "メインPKr",
                    pkr: "PKr",
                    hint: "パスワードのヒント",
                    export: "ニーモニックフレーズのエクスポート"
                },

            },
            dapp: {
                search: "DApp URLを入力してください",
                invalidDApp: "無効なDApp URL",
                recent: "最近",
                recommended: "お勧め",
            }

        }
    };

    be_BY = {
        key: "be_BY",
        value: "русский",
        conf:{
            home_transfer:"Трансфер",
            home_scan:"Сканировать код",
            home_blocknumber:"текущий блок",
            home_change:"Переключатель",
            home_receive:"Получающий адрес",
            home_backup:"Вы не подтвердили мнемоническую фразу, нажмите, чтобы подтвердить, иначе это может привести к потере активов!",
            import_mnemonic:"мнемонический",
            layout_build:"В развитие"
        },
        button: {
            confirm: "Подтвердите",
            cancel: "Отмена",
            next: "следующ",
            receive: "Получать",
            transfer: "перечислить",
            add: "Добавлять",
            save: "Сохранить",
            deleteAddress: "Удалить адрес",
            createWallet: "Создать кошелек",
            importWallet: "Импортный кошелек",
            create: "Создайте",
            done: "Выполнено",
            import: "импорт",
            ok: "OK",
            openTip: "Открыт 31 октября",
            update: "обновление",
        },

        navbar: {
            wallet: "бумажник",
            dapp: "DApp",
            my: "Мой",
        },

        toast: {
            info: {
                quitApp: "Нажмите еще раз, чтобы выйти из приложения!",
                isLatest: "Уже последняя версия!",
                createWallet: "Пожалуйста, сначала создайте кошелек!"
            },
            success: {
                add: "Добавлено Успешно",
                copy: "Успешно Скопировано",
                create: "Успешно Создан Кошелек",
                export: "Успешно Экспортировано",
                save: "Сохранено Успешно",
                import: "Импортировано Успешно",
                send: "Отправлено Успешно",
                clear: "Успешно очищено"
            },
            loading: {
                creating: "Творя...",
                exporting: "Экспорт...",
                importing: "Импортирующий...",
                sending: "Посылка ..."
            },
            error: {
                passwordVerify: "Пароль должен содержать не менее 8 символов!",
                passwordNotMatch: "Пароли не соответствуют!",
                incorrectOrder: "Неверный порядок мнемонической фразы!",
                invalidAddress: "Неверный адрес!",
                accountExisted: "Аккаунт уже существует!",
                notEnough: "Баланса недостаточно!",
                passwordError: "Неверный пароль!",
                notEnoughFee: "Недостаточно AXIS для оплаты платы за газ!"
            }
        },

        modal: {
            help: "Помогите",
            sure: "Вы уверены???",
            mainPKr: "Это адрес коллекции, который можно использовать для частых коллекций, таких как майнинг.",
            pkr: "Адрес коллекции будет меняться после каждой успешной транзакции.",
            createWallet: "Создать кошелек",
            importWallet: "Импортный кошелек",
            clearData: "Очистить данные приложения",
            confirmClear: "Пожалуйста, подтвердите, что вы создали резервную копию своей учетной записи. Очистка данных приложения приведет к повторной синхронизации данных транзакции",
            clearTip: 'Нажмите «Подтвердить», чтобы начать синхронизацию данных. Во время процесса может быть белый экран. Пожалуйста, терпеливо дождитесь завершения синхронизации данных, не прерывайте процесс внезапно.'
        },

        page: {
            wallet: {
                mainPKr: "mainPKr",
                PKr: "PKr",
                Assets: "активы",
                selectWallet: "Выберите кошелек",
            },

            txList: {
                all: "весь",
                out: "наружу",
                in: "в",
                noData: "Никакие данные",
            },

            txDetail: {
                title: "Информация о транзакции",
                success: "успех",
                pending: "В ожидании",
                amount: "сумма",
                fee: "сборы",
                from: "от",
                to: "к",
                hash: "Хэш",
                block: "блок",
                goto: "Для получения более подробной информации перейдите в обозреватель блоков >"
            },

            txTransfer: {
                balance: "Остаток средств",
                address: "Адрес",
                inputAmount: "Сумма ввода",
                inputAddress: "Пожалуйста, введите адрес AXIS",
                fee: "сборы",
                total: "весь",
                amount: "сумма",
                gas: "газ",
                gasPrice: "Цена на газ",
                inputPassword: "Введите пароль",
                passwordMsg: "Пароль от вашей учетной записи"
            },

            addressBook: {
                title: "адресная книга",
                add: "Добавить адрес",
                name: "имя",
                address: "Адрес",
                description: "Описание (необязательно)",
                detail: "Деталь адреса",
            },

            walletManage: {
                mainPKr: "MainPKr",
                PKr: "PKr",
                passwordHint: "Подсказка пароля",
                export: "Экспортировать мнемоническую фразу",
                password: "Введите пароль",
                changePasswordHint: "Сменить пароль Подсказка",
                changeProfilePhoto: "Изменить фотографию профиля",
                changeWalletName: "Изменить имя кошелька",
            },

            setting: {
                language: "язык",
                unit: "Валютная единица",
                node: "Настройки узла",
                pkr: "Проверьте PKr",
                source:"Выберите источник кошелька",
            },

            create: {
                import: "импорт",
                pleaseInput: "Пожалуйста входите",
                step1: {
                    title: "Создать AXIS Кошелек",
                    walletName: "Название кошелька",
                    password: "пароль",
                    rePassword: "Повторите пароль",
                    hint: "Подсказка к паролю (необязательно)",
                    passwordTips: "Не менее 8 символов, рекомендуется смешивать прописные и строчные буквы, цифры и символы."
                },
                step2: {
                    title: "Резервное копирование Советы",
                    d1: "Владение мнемоникой аналогично владению всеми активами",
                    d2: "Резервное Копирование Мнемоника",
                    d3: "Пожалуйста, запишите мнемонику. Если ваш телефон потерян, украден, поврежден, Mnemonic будет использоваться для восстановления ваших активов",
                    d4: "Offline storage",
                    d5: "Пожалуйста, сохраните его в безопасном месте, изолированном от Интернета. Пожалуйста, не передавайте и не храните Mnemonic в сетевой среде, такой как электронная почта, альбомы, приложения для социальных сетей и т. Д.",
                    d6: "Не снимайте скриншот.",
                    d7: "Пожалуйста, не делитесь и не храните скриншоты, которые могут быть получены третьими лицами, что может привести к потере активов.",
                },
                step3: {
                    title: "Резервное Копирование Мнемонической Фразы",
                    d1: "Пожалуйста, запишите фразу-мнемонику правильно и надежно сделайте резервную копию",
                },
                step4: {
                    title: "Подтвердите",
                    d1: "пожалуйста, выберите мнемоническую фразу в правильном порядке",
                    skip:"Уже создана резервная копия? Пропустить этот шаг",
                },
            },
            import: {
                tips: "Вы можете сбросить пароль при импорте мнемонической фразы",
                inputTips: "Введите мнемонические фразы, разделенные пробелами",
                name: "Название кошелька",
                password: "Пароль кошелька",
                rePassword: "Повторите пароль",
                hint: "Подсказка пароля",
            },
            my: {
                addressBook: "Адресная книга",
                walletManage: "Управление кошельком",
                settings: "настройки",
                termOfUse: "Условия пользования",
                about: "О нас",
                clear: "Очистить данные приложения",

                address: {
                    name: "имя",
                    address: "Адрес",
                    description: "Описание (необязательно)",
                    add: "Добавить адрес",
                    edit: "Редактировать Адрес",
                    detail: "Адрес подробно"
                },
                manage: {
                    mainPKr: "MainPKr",
                    pkr: "PKr",
                    hint: "Подсказка пароля",
                    export: "Экспортировать мнемоническую фразу"
                },

            },
            dapp: {
                search: "Введите DApp URL",
                invalidDApp: "Неверный DApp URL",
                recent: "Недавний",
                recommended: "рекомендуемые",
            }
        }
    };

    ko_KR = {

        key: "ko_KR",
        value: "언어",
        conf : {
            home_transfer : "전송",
            home_scan : "스캔 코드",
            home_blocknumber : "현재 블록",
            home_change : "스위치",
            home_receive : "수신 주소",
            home_backup : "니모닉 문구를 확인하지 않았습니다. 클릭하여 확인하십시오. 그렇지 않으면 자산 손실이 발생할 수 있습니다!",
            import_mnemonic : "니모닉",
            layout_build:"개발 중"
        },
        button: {
            confirm: "확인",
            cancel: "취소",
            next: "다음 것",
            receive: "받다",
            transfer: "보내기",
            add: "더하다",
            save: "구하다",
            deleteAddress: "주소 삭제",
            createWallet: "월렛 만들기",
            importWallet: "수입 지갑",
            create: "창조하다",
            done: "끝난",
            import: "가져오기",
            ok: "OK",
            openTip: "10 월 31 일 오픈",
            update: "업데이트",
        },

        navbar: {
            wallet: "지갑",
            dapp: "DApp",
            my: "내",
        },

        toast: {
            info: {
                quitApp: "다시 누르면 앱이 종료됩니다!",
                isLatest: "이미 최신 버전입니다!",
                createWallet: "먼저 지갑을 만드십시오!"
            },
            success: {
                add: "성공적으로 추가되었습니다",
                copy: "성공적으로 복사",
                create: "월렛이 성공적으로 생성되었습니다",
                export: "성공적으로 수출",
                save: "성공적으로 저장 되었음",
                import: "성공적으로 가져오기",
                send: "성공적으로 보냄",
                clear: "성공적으로 클리어"
            },
            loading: {
                creating: "만드는 중 ...",
                exporting: "내보내는 중 ...",
                importing: "가져 오기 ...",
                sending: "보내기..."
            },
            error: {
                passwordVerify: "비밀번호 최소 8 글자!",
                passwordNotMatch: "비밀번호가 일치하지 않습니다!",
                incorrectOrder: "니모닉의 잘못된 순서!",
                invalidAddress: "잘못된 주소!",
                accountExisted: "계정이 이미 존재합니다!",
                notEnough: "균형이 충분하지 않습니다!",
                passwordError: "비밀번호가 맞지 않습니다!",
                notEnoughFee: "AXIS는 가스를 지불하기에 충분하지 않습니다수수료!"
            }
        },

        modal: {
            help: "도움",
            sure: "확실합니까???",
            mainPKr: "채굴과 같이 자주 수집하는 데 사용할 수있는 수집 주소입니다.",
            pkr: "수집 주소는 각 성공적인 거래 후 변경됩니다.",
            createWallet: "월렛 만들기",
            importWallet: "가져오기 지갑",
            clearData:"명확한 앱 데이터",
            confirmClear:"계정을 백업했는지 확인하십시오. 앱 데이터를 지운 후 트랜잭션 데이터가 다시 동기화됩니다.",
            clearTip:'"확인"을 클릭하여 데이터 동기화를 시작하십시오. 처리하는 동안 흰색 화면이 표시 될 수 있습니다. 데이터 동기화가 완료 될 때까지 기다리십시오. 프로세스를 갑자기 종료하지 마십시오.'
        },

        page: {
            wallet: {
                mainPKr: "mainPKr",
                PKr: "PKr",
                Assets: "자산",
                selectWallet: "지갑 선택",
            },

            txList: {
                all: "모든",
                out: "아웃",
                in: "에서",
                noData: "데이터가 없습니다",
            },

            txDetail: {
                title: "거래 정보",
                success: "성공",
                pending: "보류 중",
                amount: "양",
                fee: "수수료",
                from: "부터",
                to: "으로",
                hash: "해시",
                block: "블록",
                goto: "자세한 내용은 블록 탐색기로 이동하십시오.>"
            },

            txTransfer: {
                balance: "균형",
                address: "주소",
                inputAmount: "입력 금액",
                inputAddress: "AXIS 주소를 입력하십시오",
                fee: "수수료",
                total: "합계",
                amount: "양",
                gas: "가스",
                gasPrice: "가스 가격",
                inputPassword: "입력 비밀번호",
                passwordMsg: "계정 비밀번호"
            },

            addressBook: {
                title: "주소록",
                add: "주소 추가",
                name: "이름",
                address: "주소",
                description: "설명 (선택 사항)",
                detail: "주소 세부 사항",
            },

            walletManage: {
                mainPKr: "MainPKr",
                PKr: "PKr",
                passwordHint: "암호 힌트",
                export: "니모닉 문구 내보내기",
                password: "비밀번호 입력",
                changePasswordHint: "비밀번호힌트변경",
                changeProfilePhoto: "프로필 사진 변경",
                changeWalletName: "월렛 이름 변경",
            },

            setting: {
                language: "언어",
                unit: "통화 단위",
                node: "노드 설정",
                pkr: "PKr 확인",
                source:"월렛 오픈 소스 커뮤니티 설정",
            },

            create: {
                import: "가져오기",
                pleaseInput: "들어 오세요",
                step1: {
                    title: "AXIS Wallet 생성",
                    walletName: "지갑 이름",
                    password: "암호",
                    rePassword: "암호 반복",
                    hint: "암호 힌트(선택 사항)",
                    passwordTips: "최소 8 자, 대문자와 소문자 알파벳, 숫자 및 기호를 혼합하는 것이 좋습니다."
                },
                step2: {
                    title: "백업 팁",
                    d1: "니모닉을 소유하는 것은 모든 자산을 소유하는 것과 유사합니다",
                    d2: "백업 니모닉",
                    d3: "니모닉 문구를 적어 둡니다. 니모닉은 휴대 전화를 분실, 도난 당하거나 손상된 경우 자산을 복구 할 수 있습니다.",
                    d4: "오프라인 저장소",
                    d5: "인터넷과 격리 된 안전한 장소에 보관하십시오. 이메일, 앨범, 소셜 앱 등과 같은 네트워크 환경에서 Mnemonic을 공유하거나 저장하지 마십시오.",
                    d6: "Do not take screenshot .",
                    d7: "스크린 샷을 공유하거나 저장하지 마십시오. 타사에서 수집 한 스크린 샷은 자산 손실로 이어질 수 있습니다.",
                },
                step3: {
                    title: "니모닉 문구 백업",
                    d1: "제대로 니모닉 텍스트를주의하고 안전하게 백업",
                },
                step4: {
                    title: "확인",
                    d1: "올바른 순서로 니모닉 구문을 선택하십시오",
                    skip:"이미 백업 되었습니까? 이 단계를 건너 뛰십시오",
                },
            },
            import: {
                tips: "가져 오는 동안 비밀번호를 재설정 할 수 있습니다 니모닉 문구.",
                inputTips: "공백으로 구분 된 니모닉 문구를 입력하십시오.",
                name: "지갑 이름",
                password: "월렛 비밀번호",
                rePassword: "암호 반복",
                hint: "암호 힌트",
            },
            my: {
                addressBook: "주소록",
                    walletManage: "월렛 관리",
                    settings: "설정",
                    termOfUse: "서비스 약관",
                    about: "우리에 대해",
                    clear: "명확한 앱 데이터",
                    address: {
                    name: "이름",
                    address: "주소",
                    description: "설명 (선택 사항)",
                    add: "주소 추가",
                    edit: "주소 편집",
                    detail: "주소 세부 사항"
                },
                manage: {
                    mainPKr: "MainPKr",
                    pkr: "PKr",
                    hint: "암호 힌트",
                    export: "니모닉 문구 내보내기"
                },

            },
            dapp:{
                search:"DApp URL 입력",
                invalidDApp:"잘못된 DApp URL",
                recent:"충적세",
                recommended:"제안 됨",
            }
        }
    };

}

export default Language