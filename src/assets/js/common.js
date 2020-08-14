/**
 * 全局方法
 */
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

 exports.install = function(Vue) {
     Vue.prototype.$indexOftablist = indexOftablist;
 }