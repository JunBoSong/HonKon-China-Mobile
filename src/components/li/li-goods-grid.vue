<template>

    <!--<ul style="padding: 0.12rem;font-size: 0;">-->
        <li class="goods-item vux-1px-b vux-1px-l">
            <div>
                <img v-lazy="data.coverImage" width="100%">
            </div>
            <p class="name row-2-ellipsis">{{data.name}}</p>
            <p class="other">
                <span class="price">{{ data.sellPrice | filterPrice }}</span>
            </p>
        </li>
    <!--</ul>-->
</template>
<script type = 'text/javascript'>
//用此组件时，外层要添加 <ul style="padding: 0.12rem;font-size: 0;"></ul>

    export default {
        props: ['data'],
        data() {
            return {
               
            }
        }
    }
</script>
<style lang = 'less' scoped>
    @import '~@/assets/less/mixin.less';
    @import '~@/assets/less/theme.less';
    @import "~vux/src/styles/1px.less";
    .goods-item{
            display: inline-block;
            overflow: hidden;
            width: 50%;
            padding: 0.25rem;
            height: 5.22rem;
            vertical-align: top;
            margin-left: -1px;
            &.vux-1px-b {
                &:after {
                    .setBottomLine(#ededed);
                }
            }
            &.vux-1px-l {
                &:before {
                    .setLeftLine(#ededed);
                }
            }
            .img-box{
                .img-box(100%)
            }
            img{
                width: 3.24rem;
                height: 3.24rem;
            }
            .name{
                margin: 0.14rem 0 0;
                line-height: 0.3rem;
                font-size: 0.24rem;
                color: #353535;
            }
            .other{
                .price{
                    margin-right: 0.18rem;
                    font-size: 0.32rem;
                    color: @theme;
                    font-weight: 500;
                }
                .rebates{
                    font-size: 0.2rem;
                    color: #999999;
                }
            }
        }
</style>