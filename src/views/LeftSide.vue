<template>
    <div class="left-side">
    <el-row class="tac">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        active-text-color="#ffd04b">
        <el-submenu v-for="item of menuData" :key="item.id" :index="item.index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="item1 of item.children" :key="item1.id" :index="item1.index">
            {{item1.name}}
            </el-menu-item>
        </el-submenu>
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
      .el-menu-item 
          margin-left :10px;
          font-size: 0.85em
    
</style>