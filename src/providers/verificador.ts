import fs from "fs";
import _ from "underscore";

class Verificador {
    static async executar(props: Array<any>): Promise<boolean> {
        const file = process.env.FILE;

        try {
            const data = fs.readFileSync(`./${file}`, "utf8");
            const parsed = JSON.parse(data).map((e: any) => {
                return { url: e.url, date: new Date(e.date) };
            });
  
            const result = _.isEqual(props, parsed);

            if (!result) {
                fs.writeFileSync(`./${file}`, JSON.stringify(props));
                return true;
            }

            return false;
        } catch (err) {
            fs.writeFileSync(`./${file}`, JSON.stringify(props));
            return true;
        }
    }
}

export { Verificador };
