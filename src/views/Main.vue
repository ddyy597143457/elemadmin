<template>
    <div class="main">
        this is content
    </div>
</template>
<script>
export default {
    name: 'Main'
}
</script>
<style lang="stylus" scoped>
    @import "~@/assets/styles/var.styl"
    .main {
        float left
        width: $mainWidthPersent;
        min-height: $minHeight;
        background: black
    }
</style>