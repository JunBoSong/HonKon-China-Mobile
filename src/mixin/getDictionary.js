//通过传入数据字典类型和当前类型获取对应value
import { _getDictionary } from 'service'

export default {

    methods: {
        async getDictionary(type, key) {
            let res = await _getDictionary({ "type": type });
            res = res.pageData;
            let arr = res.filter(item => item.value == key)
            let name = arr[0] && arr[0].name || '';
            return name
        }

    }
}