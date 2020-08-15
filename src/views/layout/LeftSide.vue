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
        let it = item1?item1:item;
        if(!it.router) {
            this.$message({
              message: it.name+'未配置路由',
              type: 'warning'
            });
            return;
        }
        //跳转
        this.$router.push(it.router);
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
      ...mapMutations(['setNavMenu'])
    },
    computed:{
        ...mapState(['navMenu','tabList'])
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
      overflow hidden
      .logo
        padding-left 20px;
        height 50px
        line-height 50px
    .el-submenu
      .el-menu-item
        background #ccc
        min-width 150px;  //element设为200px，最低200px的话会导致和父菜单边框一样宽，但是父级有右边框，从而导致表现不一致
        font-size 13px;
        span
          margin-left 10px;


</style>