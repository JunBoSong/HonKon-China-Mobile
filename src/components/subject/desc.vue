<template>
    <div class="subject-desc">
         <h4 class="subject-desc-title">{{title}}</h4>
         <p class="subject-desc-tips">{{desc}}</p>
    </div>
</template>
<script type = 'text/javascript'>

    export default {
        props:['title','desc'],
        data() {
            return {
                
            }
        }
    }
</script>
<style lang = 'less' scoped>
    .subject-desc{
        width: 100%;
        padding-bottom: 0.1rem;
        .subject-desc-title,.subject-desc-tips{
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .subject-desc-title{
            line-height: 1;
            margin-bottom: 0.14rem;
            font-size: 0.28rem;
            color: #353535;
        }
        .subject-desc-tips{
            line-height: 1;
            font-size: 0.22rem;
            color: #999999;
        }
    }
</style>