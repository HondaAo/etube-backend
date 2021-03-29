import { VideoInput } from "../graphql-types/VideoInput";
import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { Video } from '../entity/Video'
@Resolver()
export class VideoResolver {
    @Mutation(() => Video)
    async registerVideo(
        @Arg('input')
        { title, category, series,  url, scripts, level, end }: VideoInput
    ):Promise<Video>{
        const jsonb = JSON.stringify(scripts);
        const newVideo = await Video.create({
            title,
            category,
            series,
            url,
            script: jsonb,
            level,
            view: 0,
            end
        }).save()
        console.log(newVideo)
        return newVideo
    }
    @Mutation(() => String)
    async deleteVideo(
        @Arg('id')
        id: number
    ): Promise<String>{
        try{
            await Video.delete(id)
            return "Deleted"
        }catch(err){
            return "Error"
        }
    }
    @Mutation(() => String)
    async updateVideo(
        @Arg('id')
        id: number,
        @Arg('input')
        { title, category, series,  url, scripts, level }: VideoInput
    ): Promise<String>{
        const jsonb = JSON.stringify(scripts)
        const video = await Video.update({ id }, { title, category, series,  url, script: jsonb, level})
        console.log(video)
        return "Updated!!"
    }
    @Query(() => [Video])
    async listingVideo()
    :Promise<Video[] | null>{
        const videos = await Video.find();
        if(!videos){
            return null
        }

        return videos
    }
    // @Query(() => [Video])
    // async sortingVideo(

    // )
    // :Promise<Video[] | null>{
    //     const videos = await Video.find({}).
    //     if(!videos){
    //         return null
    //     }

    //     return videos
    // }
    @Query(() => [Video])
    async searchVideo(
        @Arg('category') category: String
    ):Promise<Video[] | null >{
        const videos = await Video.find({ where: { category }});
        if(!videos){
            return null
        }
        return videos
    }
    @Query(() => [Video])
    async seriesVideo(
        @Arg('series') series: String
    ):Promise<Video[] | null >{
        const videos = await Video.find({ where: { series }});
        if(!videos){
            return null
        }
        return videos
    }
    @Query(() => Video)
    async watchVideo(
        @Arg('id') id: number
    ):Promise<Video | null >{
        const video = await Video.findOne({ where: { id }});
        if(!video){
            return null
        }
        // if(!user?.video){
        //     user!.video = [ id ]
        // }else {
        //     user?.video.push(id)   
        // }
        // await User.update({ id: ctx.req.session.userId }, { video: user?.video })
        await Video.update({ id }, { view: video.view + 1})
        return video
    }
    @Query(() => [Video])
    async checkedVideo(
        @Arg('ids') ids: string,
        @Arg('show') show: number
    ):Promise<Video[] | null >{
        console.log(ids)
        let numbers = ids.split(',')
        let showId: number[] = [];
        for(let i = 0; i < numbers.length; i++){
            let int = parseInt(numbers[i])
            showId?.push(int)
        }
        let videos = await Video.findByIds(showId);
        if(!videos){
            return null
        }
        if(videos.length > show){
            videos = videos.slice(0, show)
        }
        return videos
    }
}