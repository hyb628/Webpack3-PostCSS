// import '../css/reset.css';
import './index.css';
import '../css/test.less';
import '../css/test.scss';

function testES6 (str) {
    console.log(1);
    // 测试ES6
    str.map(n => n ** 2);
    return Array.from(new Set(str));
}
testES6([1, 2, 3, 5, 3, 2, 1]);
