<template>
    <div class="content">
        <left-side></left-side>
        <main-side></main-side>
    </div>
</template>
<script>
import LeftSide from "./LeftSide"
import MainSide from "./Main"

export default {
    name: 'ContentComponent',
    components: {
        LeftSide,
        MainSide
    }
}
</script>
<style lang="stylus" scoped>
    @import "~@/assets/styles/var.styl"
    .content {
        width: 100%;
        min-width : $minWidth;
        background: green
    }
</style>