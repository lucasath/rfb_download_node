import "dotenv/config";
import { Urls } from "./providers/urls";
import { Verificador } from "./providers/verificador";
import { Downloader } from "./providers/downloader";
import { Notify } from "./providers/notify";

async function rfb() {
    const urls = new Urls();

    const links = await urls.get_links();

    const result = await Verificador.executar(links);

    if (result) {
        const downloads = links.map((link) => {
            const downloader = new Downloader(link);

            downloader.start();
        });

        await Notify.discord();

        console.log("Iniciando Downloads");

        await Promise.all(downloads);
    }
}

rfb();
