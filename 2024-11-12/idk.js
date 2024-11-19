

const fileslocation = './nmap-datenfiles/';
async function main() {
    try{
        const dirEntries = await Deno.readDir('./nmap-datenfiles');
        for await (const dirEntry of dirEntries) {
        //console.log(dirEntry.name);
        const data = await Deno.readTextFile('./nmap-datenfiles/'+filePath);
        const lines = data.split('\n');
        console.log(lines);
        }       
     }catch (err) {
        console.error('Error reading the directory:', err);
    }
}
main();

// nmap/ date csv oder so und nicht mehr umgeleitet
//Deno.writeTextFile
//sont vorgeschriebenes nehemen