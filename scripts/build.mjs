import { readdir, readdirSync, writeFileSync } from 'fs';

const myArgs = process.argv.slice(2);
const path = myArgs[0];
const out = './out/public.json';

readdir(path, (err, data) => {
    if (err) throw err;
    filesToArray(data);
});

function filesToArray(data) {
    const files = [];
    for (let name of data) {
        if (name !== '.DS_Store') {
            if (name === 'build') {
                let buildDir = readdirSync(path + '/' + name);
                for (let bFile of buildDir) {
                    files.push(name + '/' + bFile);
                }
                continue; // don't add 'build' to files
            }
            files.push(name);
        }
    }
    console.log(`found ${files.length} files in '${path}'`);
    console.log(files);
    writeFileSync(out, JSON.stringify(files, null, 4));
}
