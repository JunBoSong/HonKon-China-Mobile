<template>
    <div>
        <slot></slot>
       <div class="content">
            <router-link :to="childList[index] | link" class="img-wrapper"  v-for="(item,index) in 4" :key="item">
                <img v-lazy="{src: childList[index] && childList[index].cover, error: defaultImg, loading: defaultImg }" >
            </router-link>
       </div>
      
       
    </div>
</template>
<script type = 'text/javascript'>
    import link from './mixin.vue';
    export default {
        props:['childList'],
        mixins:[link],
        data() {
            return {
                defaultImg: require('@/assets/images/default/750x300.png'),
            }
        }
    }
</script>
<style lang = 'less' scoped>
@import '../../assets/less/mixin.less';
    
    .content{
        display: flex;
        flex-wrap: wrap;
        .img-wrapper{
             flex: 1 1 50%;
            .img-box(40%);
        }
       
    }
</style>