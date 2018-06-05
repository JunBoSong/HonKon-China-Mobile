
<script type = 'text/javascript'>
    export default {
        filters:{
            link(item){
                return {path:'home/zone/child',query:{parentId:item && item.parentSubject,childId: item && item.id}}
            }
        }
    }
</script>