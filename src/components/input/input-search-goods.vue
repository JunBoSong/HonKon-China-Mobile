<template>
    <div class="vp-search">
        <vp-input-search :placeholder="placeholder" v-model="curValue" @back="goBack" @submit="submitHandler"></vp-input-search>
        <div class="vp-search-content">
            <div class="vp-search-hot">
                <h3 class="vp-search-hot-title">大家都在搜</h3>
                <ul>
                    <li v-for="(item,index) in hotList" :key="index" @click="clickSuggestionHandler(item)" class="vp-search-hot-item">{{item}}</li>
                </ul>
            </div>
            <div class="vp-search-history">
                <h3 class="vp-search-history-title vux-1px-b">搜索历史</h3>
                <ul class="vp-search-history-wrapper" v-if="history.length">
                    <li v-for="(item,index) in history" :key="index" @click="clickSuggestionHandler(item)" class="vp-search-history-item vux-1px-b">{{item}}</li>
                </ul>
                <p v-else class="vp-search-history-item none">
                    无
                </p>
            </div>
            <div class="vp-search-btn-clear" v-if="history.length" @click="clearHistoryHandler">
                <i class="icon icon-clear"></i>
                <span class="text">清空搜索历史</span>
            </div>

        </div>
    </div>
</template>
<script type = 'text/javascript'>

import { vpInputSearch } from '@/components';
const HISTORY_LENGTH = 10; //存储历史纪录数量
import goBack from '@/mixin/goBack.js';
export default {
    mixins: [goBack],
    props: {
        placeholder: String,
        value: String,
        hotList:{
            type:Array
        },
        historyKey: {
            type: String,
            require: true
        }
    },
    components: {
        vpInputSearch
    },
    data() {
        return {
            curValue: this.value,
            history: [],
            showHolder: true,
        }
    },
    methods: {
        clickSuggestionHandler(val) {
            this.curValue = val;
        },
        clearHistoryHandler() {
            this.history = [];
            localStorage.removeItem(this.historyKey);
        },
        submitHandler() {
            if (this.history.length > HISTORY_LENGTH) this.history.pop();//如果存储的历史数量大于限制，就从数组尾部删除一个
            this.history.forEach((item, index) => {//如果当前搜索值已在搜索历史中则删除之前的该记录，下面重新push进去
                if (item === this.curValue) this.history.splice(index, 1)
            })
            if (this.curValue) {
                this.history.unshift(this.curValue);
                window.localStorage.setItem(this.historyKey, JSON.stringify(this.history));
            }
            this.$emit('submit');
        },
    },
    created() {
        this.history = localStorage.getItem(this.historyKey) ? JSON.parse(localStorage.getItem(this.historyKey)) : [];
    },
    watch: {
        curValue(val) {
            this.$emit('input', val);
        },
        value(val) {
            this.curValue = val;
        }
    }

}
</script>
    <style lang = 'less' scoped>
@import '../../assets/less/theme.less';
@import '../../assets/less/mixin.less';
.vp-search {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
    font-size: 0.28rem;
    color: #353535;
    .vp-search-content{
        flex: 1 1 auto;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
}

.vp-search-hot-title {
    height: 0.8rem;
    line-height: 0.8rem;
    padding-left: @page-space;
}

.vp-search-hot {
    padding-top: 0.04rem;
    background: #fff;
    ul{
        padding:0 0.09rem;
    }
    .vp-search-hot-item {
        display: inline-block;
        padding: 0 0.33rem;
        margin: 0 0.15rem 0.3rem;
        line-height: 0.5rem;
        font-size: 0.24rem;
        color: #353535;
        background: #F6F5F6;
        border-radius: 100px;
    }
}

.vp-search-history {
    border-top: 0.2rem solid @theme-bg;
    background: #fff;
    .vp-search-history-title {
        .vp-search-hot-title();
    }
    .vp-search-history-wrapper {
        padding: 0 @page-space;
    }
    .vp-search-history-item {
        height: 0.98rem;
        line-height: 0.98rem;
        &.none {
            margin: 0 @page-space;
        }
    }
}

.vp-search-btn-clear {
    width: 2.96rem;
    height: 0.74rem;
    margin: 0.7rem auto;
    text-align: center;
    background: #FFFFFF;
    border: 0.02rem solid #E0DFDF;
    border-radius: 0.04rem;
    .text {
        display: inline-block;
        height: 0.74rem;
        line-height: 0.74rem;
        vertical-align: middle;
    }
}
</style>