import { Db, MongoClient } from "mongodb";
import { GameMode } from "../common/types";


class MongoDAL {
    
    async getModeIds(mode: GameMode): Promise<Array<string>> {
        const { modeIds } = await this.db.collection('modes').findOne({ mode });
        return modeIds;
    }

    async addModeId(mode: GameMode, newModeId: string): Promise<void> {
        await this.db.collection('modes').updateOne({ mode }, {
            $push: {
                modeIds: newModeId
            }
        }, { upsert: true });
    }

    async init() {
        const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.db = client.db(process.env.MONGO_DBNAME);
        console.info("DB connected!");
    }

    db: Db = null;
}

export const DAL = new MongoDAL();