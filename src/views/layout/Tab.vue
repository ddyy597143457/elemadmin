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
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        editableTabsValue: '首页',
        editableTabs: [],
      }
    },
    methods: {
      removeTab(targetName) {
          //如果是首页，直接返回
          if(targetName === '首页') return;
          let cur,r,next,tabList = this.tabList;
          //要删除的tab的索引
          cur = this.$indexOftablist(targetName,tabList);
          if(cur === false) {
              return;
          }
          next = cur;
          //如果关闭当前标签
          if(targetName === this.editableTabsValue) {
             if(next < tabList.length-1) {
                  //活动标签右移
                  next++;
              } else {
                  //活动标签左移
                  next--;
              }
              r = tabList[next].router;
          }
          tabList.splice(cur,1);
          //移除后只剩一个tab，必然是首页
          if(tabList.length <= 1) {
            r = '/';
          }
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
          this.$router.push(r);
      },
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
        activeTabName: {
          immediate: true,
          handler(newValue) {
            this.editableTabsValue = newValue;
          }
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