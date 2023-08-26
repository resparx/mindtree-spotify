import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../../orm/dataSource"
import { Track } from "../../orm/entities/Tracks"

const queryISRC = async (isrc: string) => {
    const track = await AppDataSource.manager
    .createQueryBuilder(Track, "tracks")
    .where("tracks.isrc = :isrc", { isrc })
    .getOne()
    return track
}

export const getByISRC =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { isrc } = req.params
        const data = await queryISRC(isrc)
        res.status(200).send(data)
    } catch (err: any) {
        res.status(400).send({
            message: err.message
        })
        console.error("Unable to procees", err)
    }

}



