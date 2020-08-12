<template>
    <div class="admin">
        <top-component></top-component>
        <left-side></left-side>
        <div class="content">
          <!--<tab-component></tab-component>-->
          <div class="main">
            <router-view></router-view>
          </div>
        </div>
    </div>
</template>
<script>
import TopComponent from "./layout/Top"
//import TabComponent from "./layout/Tab"
import LeftSide from "./layout/LeftSide"

export default {
  name: 'Admin',
  components: {
    TopComponent,
    //TabComponent,
    LeftSide,

  }
}
</script>
<style lang="stylus" scoped>
    @import "~@/assets/styles/var.styl"
    .main 
        float left
        width: $mainWidthPersent;
        min-height: $minHeight;
        box-sizing: border-box;
        background: black
        color white;

</style>