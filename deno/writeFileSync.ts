// 同步写入文件
const data = new TextEncoder().encode('This is my first name');

Deno.writeFileSync('./newWriteFile.txt', data)
console.log(data)