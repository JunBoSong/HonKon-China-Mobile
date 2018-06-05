<template>
    <div>
        <slot></slot>
         <div class="content">
            <router-link 
                v-for="(item,index) in 4" 
                :key="index"
                :to="childList[index] | link" 
                :class="`img-wrapper-${index}`">
                <img :src="childList[index] && childList[index].cover" alt="专题图片">
                <img v-if="index === 3" :src="childList[index+1] && childList[index+1].cover" alt="专题图片">
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

        }
    }
}
</script>
<style lang = 'less' scoped>
@import '../../assets/less/mixin.less';
    .content{
        display: flex;
        flex-wrap: wrap;
    }
    .img-wrapper-0{
        flex: 1 1 100%;
        .img-box(53%);
    }
    .img-wrapper-1{
        flex: 1 1 3.1rem;
        .img-box(41%);
    }
    .img-wrapper-2{
        flex: 1 1 1.9rem;
        .img-box(25%);
    }
    .img-wrapper-3{
        flex: 1 1 2.5rem;
        img{
            display: block;
            width: 100%;
            height: 50%;
        }
    }
/*.content {
    display: flex;
    &.first {
        margin-bottom: 0.24rem;
    }
    .content-item {
        width: 100%;
        &.first{
            width: 2.8rem;
        }
        &.second{
            width: 1.6rem;
            margin: 0 0.24rem;
        }
        &.third{
            flex: 1;
        }
        .content-item-img{
            &.first{
                margin-bottom: 0.24rem;
            }
        }
    }
}*/
</style>