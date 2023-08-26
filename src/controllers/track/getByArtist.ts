import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../../orm/dataSource"
import { Track } from "../../orm/entities/Tracks"

const queryArtist = async (artist: string) => {
    const track = await AppDataSource.manager
    .createQueryBuilder(Track, "tracks")
    .where("artists = ANY (:artist)", { artist: `{${artist}}`})
    .getMany()
    return track
}

// const queryBySubArtist = async (artist) => {
// const qb = await AppDataSource.getRepository(Track).createQueryBuilder("track").where((qb)=> {
//     const subQuery = qb.subQuery().select()
// })
// }

export const getByArtist =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { artist } = req.params
        const data = await queryArtist(artist)
        res.status(200).send(data)
    } catch (err) {
        console.error("Unable to procees", err)
    }

}



