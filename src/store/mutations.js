//设置顶部面包屑
function setNavMenu(state,navMenu) {
    state.navMenu = navMenu
}

//设置tab页
function changeTab(state,obj) {
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
    changeTab,
}