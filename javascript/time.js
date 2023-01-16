import fs from "fs";

var date_time = new Date();
var hours = date_time.getHours();

import path from "path";
import { fileURLToPath } from "url";

var __dirname = path.dirname(fileURLToPath(import.meta.url));

const directory = "/var/www/file_reduction/Videos/";

setTimeout(() => {
    console.log(hours);
    if (hours >= 23) {
        console.log(directory);
        fs.readdir(directory, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(directory, file), (err) => {
                    if (err) throw err;
                });
            }
        });
    }
}, 3000000);
