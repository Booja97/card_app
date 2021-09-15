<template>
    <div>
        <appheader></appheader>
        <hr >
        <appcontent></appcontent>
    </div>
</template>

<script>
import head from "./Header.vue";
import content from "./Content.vue";
export default {
  components:{
    appheader: head,
    appcontent: content
  }
}

</script>
<style scoped>

</style>