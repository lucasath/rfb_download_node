import axios from "axios";

class Notify {
    static async discord(): Promise<void> {
        const url = process.env.DISCORD || "";

        const data = {
            content: "RFB Atualizada! Iniciando Download.",
            username: "Receita Bot"
        };
        
        await axios.post(url, data);
    }
}

export { Notify };
