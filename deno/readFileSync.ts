// console.log(Deno.readFileSync('./os.ts'))
// deno读取文件的操作
const bytes = Deno.readFileSync('./os.ts')

const text = new TextDecoder().decode(bytes)

console.log(text)