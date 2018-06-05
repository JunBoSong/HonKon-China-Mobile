<template>
    <div>
      <slot></slot>
       <div class="content">
            <div class="content-item">
                <router-link :to="childList[0] | link" class="img-wrapper">
                    <img v-lazy="{src: childList[0] && childList[0].cover, error: defaultImg, loading: defaultImg }">
                </router-link>
            </div>
            <div class="content-item">
                <router-link :to="childList[1] | link" class="img-wrapper-block">
                    <img v-lazy="{src: childList[1] && childList[1].cover, error: defaultImg, loading: defaultImg }">
                </router-link>
                <router-link :to="childList[2] | link" class="img-wrapper-block">
                    <img v-lazy="{src: childList[2] && childList[2].cover, error: defaultImg, loading: defaultImg }">
                </router-link>
            </div>
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
        .content-item{
            flex: 1;
            width: 0;
            .img-wrapper {
                .img-box(112%);
            }
            .img-wrapper-block{
                display: block;
                .img-box(56%);
            }
        }
    }
</style>