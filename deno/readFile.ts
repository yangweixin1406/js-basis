// Deno.readFile(string: filePath):Promise<Uint8Array>
// 异步读取文件
async function main () {
  const bytes = await Deno.readFile('./os.ts');
  const text = new TextDecoder().decode(bytes)
  console.log(text)
}

main()