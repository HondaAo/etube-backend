import { User } from "../entity/User"
import { Video } from "../entity/Video"
import { createConnection } from "typeorm"
import { Script } from "../entity/Script"

export const testConn = (drop: boolean = false) => {
    return createConnection({
        type: "postgres",
        database: "elearn-test",
        username: "postgres",
        password: "postgres",
        host: 'localhost',
        port: 5432,
        dropSchema: drop,
        synchronize: drop,
        entities: [User,Video,Script]
    })
}