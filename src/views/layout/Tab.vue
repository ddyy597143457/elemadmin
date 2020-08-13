<template>
    <div>
        <div class="tab-wrap">

          <el-tabs v-model="editableTabsValue" 
            type="border-card" 
            closable 
            @tab-remove="removeTab" 
            @tab-click="setTab"
            >
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
        editableTabsValue: 'home',
        editableTabs: [],
      }
    },
    methods: {
      removeTab(targetName) {
          let tabList = this.tabList;
          console.log(this.editableTabsValue);
          if(this.editableTabsValue === 'home') {
             return;
          }
          let cur = false,curName = '';
          for (let i = 0; i < tabList.length; i++) {
              const tab = tabList[i];
              if(tab.name === targetName) {
                  cur = i;
                  curName = tab.name;
              }
          }
          let r, c = cur,activeTabName;
          
          //如果关闭当前标签
          if(curName === this.editableTabsValue) {
              //最后一个标签了
              if(cur === 0) {
                  tabList = [];
                  activeTabName = '';
                  this.changeTab({activeTabName,tabList});
                  this.$router.push('/admin');
                  return;
              }
              if(c < tabList.length-1) {
                  //活动标签右移
                  c++;
              } else {
                  //活动标签左移
                  c--;
              }
              activeTabName = tabList[c].name;
              r = tabList[c].router;
          } else {
              activeTabName = this.activeTabName;
          }
          tabList.splice(cur,1);
          this.changeTab({activeTabName,tabList});
          if(r) {
             this.$router.push(r);
          }

      },
      setTab() {
          let r;
          for(let tab of this.tabList) {
            if(tab.name === this.editableTabsValue) {
              r = tab.router;
              break;
            }
          }
          if(r) {
            this.$router.push(r);  
          }
      },
      ...mapMutations(['changeTab'])
    },
    created() {
      this.editableTabs = this.tabList;
      
    },
    mounted() {

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
      padding-left 20px;

    .el-tabs,.el-tabs--border-card,.el-tabs__header
      box-shadow: none;
      border-bottom: none;

</style>