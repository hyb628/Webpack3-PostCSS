import '../css/reset.css';
import './index.css';
import '../css/test.less';
import '../css/test.scss';
import CardBgColor from './verdor/verdor'

function testES6 (str) {
    console.log(13);
    // 测试ES6
    str.map(n => n ** 2);
    return Array.from(new Set(str));
}
testES6([1, 2, 3, 5, 3, 2, 1]);

console.log('vendor', CardBgColor);
