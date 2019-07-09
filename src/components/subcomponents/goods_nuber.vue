<template>
    <div>
        <div class="mui-numbox" data-numbox-min="0" :data-numbox-max="60">
            <button class="mui-btn mui-btn-numbox-minus" type="button" disabled="">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1">
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>

</template>

<script>
    export default {
        name: "goods_nuber"
    }
</script>

<style scoped>

</style>