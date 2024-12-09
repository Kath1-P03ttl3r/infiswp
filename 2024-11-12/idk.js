const filePath = './nmap-datenfiles';
async function main() {
    try {
        const dirEntries = await Deno.readDir(filePath);
        for await (const dirEntry of dirEntries) {
            console.log(dirEntry.name);
        }
    } catch (err) {
        console.error('Error reading the directory:', err);
    }
}
main();
