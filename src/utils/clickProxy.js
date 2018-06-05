export function clickProxy(evt) {
    let node = evt.target;
    if (node.nodeName.toUpperCase() == "UL") {
        return false
    } else if (node.nodeName.toUpperCase() === 'LI') {
        return node;
    } else {
        return clickProxy(node.parentNode);
    }
}
//在ul上绑定@click="clickHandler"事件。
// clickHandler (evt) {
//     let target = clickProxy(evt);
// }