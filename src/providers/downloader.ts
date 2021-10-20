import fs from "fs";
import path from "path";
import MultipartDownload from "multipart-download";

class Downloader {
    url: string;
    directory: string;
    file: string;
    constructor(props: Downloader) {
        this.url = props.url;
        this.directory =  `${process.env.PATH_FILE || props.directory}/Downloads/${new Date()}/`;
        this.file = props.file;
    }

    async start(): Promise<void> {
        const maxConnections = 10;

        fs.mkdirSync(path.resolve(this.directory), { recursive: true})

        new MultipartDownload()
            .start(this.url, {
                numOfConnections: maxConnections,
                saveDirectory: this.directory,
                fileName: this.file
            })
            .on("error", (err) => {
                // handle error here
                Promise.reject(console.error("Error from download", err));
            })
            .on("end", (filePath) => {
                console.log(`Downloaded file path: ${filePath}`);
                Promise.resolve()
            });
    }
}

export { Downloader };
