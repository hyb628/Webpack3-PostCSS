import '../css/reset.css';
import './index.css';
import '../css/test.less';
import '../css/test.scss';

import CardBgColor from './verdor/verdor';

function testES6 (str) {
    console.log(13);
    // 测试ES6
    str.map(n => n ** 2);
    return Array.from(new Set(str));
}
testES6([1, 2, 3, 5, 3, 2, 1]);

console.log('vendor', CardBgColor);


// 测试 async await
const getPosts = () => {
    console.log('getPosts');
}

const printPostsToConsole = async () => {
    const posts = await getPosts();
    console.log(posts);
};
printPostsToConsole();

// // 测试
var sym = Symbol('foo');
console.log('Symbol测试', typeof sym);

// test Promise
var p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, 5000);
});

p.then(() => {
    console.log('Got it, Promise');
})

// test includes API
const strings = 'huangyb';
console.log('test includes', strings.includes('yb'));
