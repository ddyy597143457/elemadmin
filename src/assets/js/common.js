/**
 * 全局方法
 */

//返回一个tab索引
function indexOftablist(tabname,tabList) {
    let cur = false;
    for (let i = 0; i < tabList.length; i++) {
        const tab = tabList[i];
        if(tab.name === tabname) {
            cur = i;
            break;
        }
    }
    return cur;
 }

 //移除一个tab
 function removeTab(tabname,tabList) {
     let cur;
     cur = indexOftablist(tabname,tabList);
     if(cur === false) {
         return false;
     }
     tabList.splice(cur,1);
     return tabList;
 }

 exports.install = function(Vue) {
     Vue.prototype.$indexOftablist = indexOftablist;
     Vue.prototype.$removeTab = removeTab;
 }