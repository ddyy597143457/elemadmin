<template>
    <div class="admin">
        <!-- 左侧菜单导航 -->
        <left-side></left-side>
        <!-- 内容区 -->
        <div class="content">
            <!-- 顶部 -->
            <top-component></top-component>
            <!-- tab页 -->
            <tab-component></tab-component>
        </div>
    </div>
</template>
<script>
import TopComponent from "./layout/Top"
import TabComponent from "./layout/Tab"
import LeftSide from "./layout/LeftSide"

export default {
  name: 'Admin',
  components: {
    TopComponent,
    TabComponent,
    LeftSide,

  }
}
</script>
<style lang="stylus" scoped>
    @import "~@/assets/styles/var.styl"
    .content 
          float left
          width: $mainWidthPersent;
          min-height: $minHeight;
          box-sizing: border-box;

</style>