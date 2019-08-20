//右键菜单

chrome.contextMenus.create({
    id:'a',
    type: 'normal',
    title: '快速搜索资源 (&G)',
    contexts:['selection']
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[搜索]百度一下',
    contexts:['selection'],
    onclick: s_baidu
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[搜索]360',
    contexts:['selection'],
    onclick: s_360
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[搜索]Google',
    contexts:['selection'],
    onclick: s_google
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[搜索]Bing',
    contexts:['selection'],
    onclick: s_bing
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[图片]百度',
    contexts:['selection'],
    onclick: t_baidu
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[图片]Google',
    contexts:['selection'],
    onclick: t_google
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[翻译]百度',
    contexts:['selection'],
    onclick: f_baidu
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[翻译]Google',
    contexts:['selection'],
    onclick: f_google
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[文学]百度文库',
    contexts:['selection'],
    onclick: w_baidu
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[文学]豆丁网',
    contexts:['selection'],
    onclick: w_douding
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[购物]淘宝',
    contexts:['selection'],
    onclick: g_taobao
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[购物]京东',
    contexts:['selection'],
    onclick: g_jingdong
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[娱乐]小说',
    contexts:['selection'],
    onclick: y_xiaoshuo
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[娱乐]音乐',
    contexts:['selection'],
    onclick: y_yinyue
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[娱乐]电影',
    contexts:['selection'],
    onclick: y_dianyin
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[下载]BT/磁力',
    contexts:['selection'],
    onclick: x_bt
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[下载]网盘',
    contexts:['selection'],
    onclick: x_wangpan
});

chrome.contextMenus.create({
    parentId:'a',
    type: 'normal',
    title: '[其他]生成二维码',
    contexts:['selection'],
    onclick: q_erweima
});

//百度一下
function s_baidu(info,tab){
    var KeyWord = info.selectionText;
    var url = "https://www.baidu.com/s?wd="+KeyWord;
    window.open(url);

}

//360搜索
function s_360(info,tab){
    var KeyWord = info.selectionText;
    var url = "https://www.so.com/s?q="+KeyWord;
    window.open(url);

}

//Google搜索
function s_google(info,tab){
    var KeyWord = info.selectionText;
    var url = "https://www.google.com/search?q="+KeyWord;
    window.open(url);
}

//Bing搜索
function s_bing(info,tab){
    var KeyWord = info.selectionText;
    var url = "http://cn.bing.com/search?q="+KeyWord;
    window.open(url);
}

//百度图片
function t_baidu(info,tab){
    var KeyWord = info.selectionText;
    var url = "https://image.baidu.com/search/index?tn=baiduimage&word="+KeyWord;
    window.open(url);
}

//Google图片
function t_google(info,tab){
    var KeyWord = info.selectionText;
    var url = "https://www.google.com/search?q="+KeyWord+"&tbm=isch";
    window.open(url);
}

//百度翻译
function f_baidu(info,tab){
    var KeyWord = info.selectionText;
    var url = "https://fanyi.baidu.com/?#zh/en/"+KeyWord;
    window.open(url);
}

//Google翻译
function f_google(info,tab){
    var KeyWord = info.selectionText;
    var url = "https://translate.google.com/?q="+KeyWord;
    window.open(url);
}

//百度文库
function w_baidu(info,tab){
    var KeyWord = info.selectionText;
    var url = "https://wenku.baidu.com/search?word="+KeyWord;
    window.open(url);
}

//豆丁网
function w_douding(info,tab){
    var KeyWord = info.selectionText;
    var url = "http://www.docin.com/search.do?searchcat=1001&nkey="+KeyWord;
    window.open(url);
}

//淘宝
function g_taobao(info,tab){
    var KeyWord = info.selectionText;
    var url = "https://s.taobao.com/search?q="+KeyWord+"&sort=sale-desc";
    window.open(url);
}

//京东
function g_jingdong(info,tab){
    var KeyWord = info.selectionText;
    var url = "https://search.jd.com/Search?keyword="+KeyWord+"&enc=utf-8&psort=3";
    window.open(url);
}

//小说
function y_xiaoshuo(info,tab){
    var KeyWord = info.selectionText;
    var url = "https://www.xiashu.la/search.html?searchkey="+KeyWord;
    window.open(url);
}

//音乐
function y_yinyue(info,tab){
    var KeyWord = info.selectionText;
    var url = "http://music.sonimei.cn/?name="+KeyWord+"&type=netease";
    window.open(url);
}

//电影
function y_dianyin(info,tab){
    var KeyWord = info.selectionText;
    var url = "https://www.bttwo.com/?s="+KeyWord;
    window.open(url);
}

//生成二维码图片
function q_erweima(info,tab){
    var KeyWord = info.selectionText;
    var url = "http://qr.liantu.com/api.php?w=250&text="+KeyWord;
    window.open(url);
}