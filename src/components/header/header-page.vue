<template>
    <!--webview头部，显示返回按钮和菜单按钮，origin != '3'分为Android和IOS两种样式 -->
    <div class="header">
        <div class="header-title" :class="{'iphone': false,'android': true}">
            <a href="javascript:" @click="goBack" class="back"></a>
            <div class="title">
                {{title}}
            </div>
            <a href="javascript:" v-if="share" @click="bubbleShow = !bubbleShow" class="share"></a>
            <div v-else class="options">
                <slot name="right-options"></slot>
            </div>
        </div>
        <div class="bubble-box-share" v-if="share" v-show="bubbleShow">
            <i class="triangle"></i>
            <div class="share-item vux-1px-b" @click="$emit('on-share',1)">
                <i class="share-icon qrcode"></i>
                <span class="share-text">二维码</span>
            </div>
            <div class="share-item" @click="$emit('on-share',2)">
                <i class="share-icon normal"></i>
                <span class="share-text">分享</span>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<script type = 'text/javascript'>
export default {
    name: 'vpPageHeader',
    props: {
        title: String, 
        share: {
            type: Boolean,
            default: false
        }, 
        hasBackCb: { //如果为true 则会触发 back 事件
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            bubbleShow: false
        }
    },
    methods: {
        goHome() {
            this.$router.replace({ path: '/home' })
        },
        goBack() {
            if (this.hasBackCb) return this.$emit('back')
            if (this.$store.state.common.beginPath === this.$route.path) {
                try {
                    window.LvUJsBridge.invoke('GoBack', {}, function(response) { })
                } catch (error) {
                    // this.$router.replace('/home')
                }
            } else {
                this.$router.go(-1)
            }
        },
    }
}
</script>
<style lang ="less" scoped>
@import '../../assets/less/theme.less';
.header {
    position: relative;
    .bubble-box-share {
        position: absolute;
        right: @page-space;
        bottom: -1.6rem;
        z-index: 10;
        padding: 0 0.3rem;
        box-shadow: 3px 3px 6px 0 rgba(0, 0, 0, 0.10);
        border-radius: 0.08rem;
        border: 1px solid #D8D8D8;
        background: #fff;
        .triangle {
            position: absolute;
            right: 0.2rem;
            top: -0.12rem;
            display: block;
            width: 0.2rem;
            height: 0.2rem;
            border-left: 1px solid #D8D8D8;
            ;
            border-bottom: 1px solid #D8D8D8;
            ;
            transform: rotate(135deg);
            background: #fff;
        }
        .share-item {
            width: 1.8rem;
            height: 0.69rem;
            padding-left: 0.3rem;
            .share-icon {
                display: inline-block;
                width: 0.34rem;
                height: 0.34rem;
                vertical-align: middle;
                &.qrcode {
                    background: url('~@/assets/images/topbar_options_qrcode@2x.png') center center no-repeat;
                    background-size: 0.4rem;
                }
                &.normal {
                    background: url('~@/assets/images/topbar_options_share@2x.png') center center no-repeat;
                    background-size: 0.4rem;
                }
            }
            .share-text {
                display: inline-block;
                vertical-align: middle;
                line-height: 0.69rem;
                margin: 0 auto;
                font-size: 0.28rem;
                color: #333333;
            }
            
        }
    }
}

.header-title {
    position: relative;
    display: flex;
    align-items: center;
    background: #F9F9F9;
    box-shadow: inset 0 -1px 0 0 #AFAFAF;
    &.iphone {
        height: 1.28rem;
        padding: 0.4rem 0.14rem 0;
    }
    &.android {
        height: 0.88rem;
        padding: 0 0.14rem;
    }

    .back,
    .options,
    .share {
        width: 0.78rem;
        height: 100%;
    }
    .back {
        background: url('~@/assets/images/topbar_back_arrow@2x.png') center center no-repeat;
        background-size: 0.4rem;
    }
    .share {
        background: url('~@/assets/images/topbar_options@2x.png') center center no-repeat;
        background-size: 0.5rem;
    }
    .options{
        border: none;
        font-size: 0.28rem;
        color: #222;
    }
    .title {
        flex: 1;
        text-align: center;
        font-size: 0.36rem;
        color: #353535;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
