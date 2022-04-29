import { Connection } from "typeorm";
import { testConn } from "../test-utils/testConn"
import { gCall } from "../test-utils/gCall";
import { Video } from "../entity/Video";

let conn: Connection;

beforeAll(async() => {
    conn = await testConn();
})

afterAll(async() => {
    await conn.close();
})

const registerVideoMutation = `
mutation RegisterVideo($input: VideoInput!) {
    registerVideo(input: $input){
      title
      category
    }
}
`

describe("Register", () => {
    it("create video", async() => {
        const video = {
            title: "She's got a gun!",
            category: "anime",
            series: "Madagascar",
            url: "p2zDdb_MqmI",
            scripts: [{"id":1,"text":"She's got a gun. Get out while we can. Pass it on. He said let's have some fun and take out the dam. That's how.","timestamp":0},{"id":2,"text":"Skipper! Alex wants to take out the dam All right","timestamp":18},{"id":3,"text":"Come back! That's my dinner. Kowalski Full-throttle!. Music! Oh I like this song. It never gets old. ","timestamp":35},{"id":4,"text":"Pull up. Don't kill us. There is gonna be another way. Pass it on. He said don't pull up, kill us, there is no other way. That's it how.","timestamp":60},{"id":5,"text":"Are you sure? There is no scrifice greater than someone else. No! Patek!","timestamp":75},{"id":6,"text":"Bring it on. Bad kitties.","timestamp":87}],
            level: "intermediate",
            end: 48
        };

        const res = await gCall({
            source: registerVideoMutation,
            variableValues: {
                input: video
            }
        });

        expect(res).toMatchObject({
          data: {
            registerVideo: {
                title: video.title,
                category: video.category  
              }
          }
        })

        const dbVideo = await Video.findOne({ where: { title: video.title}})
        expect(dbVideo).toBeDefined();
    })
})