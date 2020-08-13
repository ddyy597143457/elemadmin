<template>
    <div class="left-side">
        <div class="logo">
           
        </div>
        <div class="menu">
          <el-row class="tac">
            <el-menu
             
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <template  v-for="item of menuData">
                <!--存在子菜单-->
                <el-submenu v-if="item.children" :key="item.id" :index="item.index">
                  <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </template>
                  <el-menu-item v-for="item1 of item.children" :key="item1.id" :index="item1.index" @click="goMenu(item,item1)">
                    <span>{{item1.name}}</span>
                  </el-menu-item>
                </el-submenu>
                <!--不存在子菜单-->
                <el-menu-item v-else :key="item.id" :index="item.index" @click="goMenu(item)">
                    <i :class="item.icon"></i>
                    <span>{{item.name}}</span>
                </el-menu-item>
              </template>
            </el-menu>
          </el-row>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'LeftSide',
    data() {
      return {
          menuData:[]
      };
    },
    methods: {
      goMenu(item,item1) {
        //设置顶部面包屑
        if(item1) {
            this.setNavMenu([item.name,item1.name]);
        } else {
            this.setNavMenu([item.name]);
        }
        //添加tab
        let it = item1?item1:item;
        if(it.name === this.activeTabName) {
          return
        }
        let tabList = this.tabList,found = false;
        for(let tab of tabList) {
          if(it.name === tab.name) {
              found = tab.name;
              break; 
          }
        }
        let r = '/admin'+it.router;
        if(found) {
          //切换标签
           this.changeTab({activeTabName:found});
        } else {
          //打开新标签
          let activeTabName = it.name;
          tabList.push({title:it.name,name:it.name,router:r});
          this.changeTab({activeTabName,tabList});
        }
        //跳转
        this.$router.push(r);
      },

      initMenu() {
        this.axios.get('/menu/list').then((response) => {
          this.renderMenu(response)
        });
      },
      renderMenu(response) {
        if(response.status == 200) {
          this.menuData = response.data.data;
        }
      },
      ...mapMutations(['setNavMenu','changeTab'])
    },
    computed:{
        ...mapState(['navMenu','activeTabName','tabList'])
    },
    created() {
      this.initMenu();
    },
  
}
</script>
<style lang="stylus" scoped>
    @import "~@/assets/styles/var.styl"
    .left-side 
      float left
      width: $leftsideWidthPersent;
      min-height: $minHeight;
      background: purple
      overflow hidden
      .logo 

        padding-left 20px;
        height 50px
        line-height 50px
</style>