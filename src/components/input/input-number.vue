<template>
    <div class="vp-inputNumber">
        <span class="reduce" @click.stop="readonly ? false : reduce()">-</span>
        <span class="amount">
            <input type="tel" v-model="curVal"
                onkeyup="value=value.replace(/[^\d\.\-]/g,'');"
                disabled
            >
        </span>
        <span class="plus" @click.stop="readonly ? false : plus()">+</span>
    </div>
</template>
<script type = 'text/javascript'>
export default {
    name: 'vpInputNumber',
    props: {
        readonly: {
            type: Boolean,
            default: false
        },
        value:{
            require: true,
            type: Number,
            default: 1
        },
        maxValue: {
            require: true,
            type: Number
        },
        minValue: {
            require: true,
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            curVal: this.value
        }
    },
    methods:{
        reduce(){
            if (this.curVal === this.minValue) return
            this.curVal--;
        },
        plus(){
            if (this.curVal === this.maxValue) return
            this.curVal++;
        }
    },
    watch:{
        value(val){
            this.curVal = val;
        },
        curVal(val){
            this.$emit('input',val*1)
            this.$event.$emit('changeNum',val*1)
        }
    }
}
</script>
<style lang = 'less' scoped>
.vp-inputNumber {
    height: 0.48rem;
    font-size: 0;
    .reduce,
    .plus {
        display: inline-block;
        width: 0.5rem;
        height: 0.48rem;
        line-height: 0.37rem;
        vertical-align: middle;
        text-align: center;
        font-size: 24px;
        color: #979797;
        background: #FBFBFB;
        border: 1px solid #F5F5F5;
    }
    .amount {
        display: inline-block;
        width: 0.88rem;
        height: 0.48rem;
        vertical-align: middle;
        border-radius: 0.04rem;
        input{
            width: 100%;
            height: 100%;
            text-align: center;
            font-size: 12px;
            color: #333333;
            border: none;
            background: #F5F5F5;
            box-shadow: none;
        }
    }
}
input:disabled, input[disabled]{
color: #333;
-webkit-text-fill-color:#333;
-webkit-opacity:1;
opacity: 1;
}
</style>
