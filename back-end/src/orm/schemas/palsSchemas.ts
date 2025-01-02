import { model, Schema } from "mongoose";
import { pals } from "../../interfaces/pals";

export const palsSchemas = new Schema<pals>({
    id:{ type: String, required: true },
    name:{ type: String, required: true },
    attribute:{ type: String, required: true },
    workCompatibility:{ type: String, required: true },
    image:{ type: String, required: true },
});

export const palsModel = model<pals>('pals', palsSchemas);
