<template>
    <div>
        <div class="tab-wrap">

          <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="setTab">
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="content-wrap">

          <router-view></router-view>
        </div>
    </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        editableTabsValue: '',
        editableTabs: [],
      }
    },
    methods: {
      removeTab(targetName) {
          let tabList = this.tabList;
          let cur = false;
          for (let i = 0; i < tabList.length; i++) {
              const tab = tabList[i];
              if(tab.name === targetName) {
                  cur = i;
                  break;
              }
          }
          tabList.splice(cur,1);
          let activeTabName;
          //如果关闭当前标签
          if(cur === (this.index - 1)) {
              if(cur < tabList.length) {
                  //活动标签右移
                  cur++;
              } else {
                  //活动标签左移
                  cur--;
              }
              activeTabName = tabList[cur].name;
          } else {
              activeTabName = this.activeTabName;
          }
          this.changeTab({activeTabName,tabList});
          if(tabList.length === 0) {
              this.$router.push('/admin');
          }
      },
      setTab() {
          let r;
          console.log('this.tabList',this.tabList);
          for(let tab of this.tabList) {
            if(tab.name === this.editableTabsValue) {
              r = tab.router;
              break;
            }
          }
          console.log('r',r);
          if(r) {
            this.$router.push(r);  
          }
      },
      ...mapMutations(['changeTab'])
    },
    created() {
      this.editableTabs = this.tabList;
      
    },
    computed: {
        ...mapState(['activeTabName','tabList'])
    },
    watch: {
        activeTabName:function() {
          this.editableTabsValue = this.activeTabName;
        },

        tabList:function() {
           this.editableTabs = this.tabList;
        }
    }
  }
</script>
<style lang="stylus" scoped>
    .tab-wrap
      width 100%;
    .content-wrap
      padding-left 20px;;
</style>