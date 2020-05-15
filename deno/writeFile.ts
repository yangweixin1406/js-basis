async function main () {
  const data = new TextEncoder().encode('This is next writeFile');
  await Deno.writeFile('./writeFile.txt', data)
}
main()