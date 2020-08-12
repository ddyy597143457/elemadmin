<template>
    <div class="left-side">
    <el-row class="tac">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        active-text-color="#ffd04b">
        <template  v-for="item of menuData">
          <!--存在子菜单-->
          <el-submenu v-if="item.children" :key="item.id" :index="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item v-for="item1 of item.children" :key="item1.id" :index="item1.index" @click="goMenu(item1.router)">
              <span>{{item1.name}}</span>
            </el-menu-item>
          </el-submenu>
          <!--不存在子菜单-->
           <el-menu-item v-else :key="item.id" :index="item.index" @click="goMenu(item.router)">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-row>
    </div>
</template>
<script>
export default {
    name: 'LeftSide',
    data() {
      return {
          menuData:[]
      };
    },
    methods: {
      goMenu(router) {
        console.log('/admin'+router);
        this.$router.push('/admin'+router);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      initMenu() {
        this.axios.get('/menu/list').then((response) => {
          this.renderMenu(response)
        });
      },
      renderMenu(response) {
        console.log(response);
        if(response.status == 200) {
          this.menuData = response.data.data;
        }
      }
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
      .el-submenu
        .el-menu-item 
        
          font-size: 0.85em
</style>