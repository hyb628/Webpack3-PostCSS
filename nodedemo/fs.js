// fs.access(__filename, fs.R_OK | fs.W_OK, function(err) {
//     console.log(err ? '不可操作!' : '可以读/写');
// });

// fs.access(__filename,fs.constants.F_OK,(err)=>{
// console.log(err?'文件不存在':'文件已经存在');
// });

// 文件插入数据
// fs.appendFile(__filename,'hello world!\r\n',(err)=>{
//     if(err) throw err;
//     console.log('写入成功');
// });
// appendFile同步版本，返回值为undefined
// fs.appendFileSync(__filename,'hello nodejs!\r\n');

// 文件读取和写入 readFile的data是String类型 ，readFileSync的data是Buffer类型
// fs.readFile(__filename, {encoding:'utf8',flag:'r'}, (err, data) => {
//     if(err) throw err;
//     console.log(data.includes('huangyb'));
// })

// var data = fs.readFileSync(__filename,{encoding:'utf8',flag:'r'});
// console.log(data);
