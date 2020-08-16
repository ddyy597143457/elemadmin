<template>
    <div class="admin">
        <!-- 左侧菜单导航 -->
        <left-side></left-side>
        <!-- 顶部 -->
        <top-component></top-component>
        <!-- 内容 -->
        <content-component></content-component>

    </div>
</template>
<script>

import LeftSide from "./layout/LeftSide"
import TopComponent from "./layout/Top"
import ContentComponent from "./layout/Content"

export default {
  name: 'Admin',
  components: {
    LeftSide,
    TopComponent,
    ContentComponent,
  }
}
</script>