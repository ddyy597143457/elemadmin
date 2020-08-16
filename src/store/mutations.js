//设置顶部面包屑
function setNavMenu(state,navMenu) {
    state.navMenu = navMenu
}

//处理tab
function handleTab(state,obj) {
    let tabList = state.tabList
    let found = false
    tabList.forEach((tab) => {
        if(tab.name === obj.name) {
            found = true;
        }
    })
    if(found) {
        //tab存在，激活
        state.activeTabName = obj.name;
    } else {
        //tab不存在，插入tabList并激活
        state.activeTabName = obj.name;
        tabList.push(obj);
        state.tabList = tabList;
    }
}

//更新tab
function updateTab(state,obj) {
    let {activeTabName,tabList} = obj;
    if(activeTabName) {
        state.activeTabName = obj.activeTabName;
    }
    if(tabList) {
        state.tabList = obj.tabList; 
    }
}


export default {
    setNavMenu,
    handleTab,
    updateTab
}