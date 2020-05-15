// Deno.removeSync('./new_dir')

async function main () {
  await Deno.remove('./newWriteFile.txt')
}
main()