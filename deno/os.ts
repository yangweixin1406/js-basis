// 环境变量信息
const env = Deno.env.get('HOME')
console.log(env)

// 判断是否在terminal环境
const _ttf = Deno.isatty(0)
console.log(_ttf)

// 获取进程id
const pid = Deno.pid
console.log(pid)

// 获取平台信息
console.log(Deno.build)