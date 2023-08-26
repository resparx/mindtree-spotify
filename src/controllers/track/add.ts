import { Request, Response, NextFunction } from "express";
import { isEmpty } from 'lodash'
import { spotify_api_url } from "../../constants";
import { AppDataSource } from "../../orm/dataSource";
import { Track } from "../../orm/entities/Tracks";

const insertData = async (value: {
  isrc: string;
  image_uri: string;
  title: string;
  artists: string[];
}) => {
  await AppDataSource.createQueryBuilder()
    .insert()
    .into(Track)
    .values(value)
    .execute();
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token, token_type } = res.locals?.tokenData;
    const { isrc } = req.params;
    const queryParams = new URLSearchParams({
      q: `isrc:${isrc}`,
      type: "track",
    }).toString();

    const { tracks = [] }: any = await (
      await fetch(`${spotify_api_url}search?${queryParams}`, {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      })
    ).json();

    
    const { items = [] } = tracks;
    if(isEmpty(items)) {
      res.status(200).send({message: 'No record found'})
    }
    // get the track with highest popularity
    const rawValue = items.reduce((
      previousTrack: { popularity: number },
      currentTrack: { popularity: number }
    ) => {
      return currentTrack?.popularity > previousTrack?.popularity
        ? currentTrack
        : previousTrack;
    },
    {popularity: 0});


    // insert into db
    const value = {
      isrc: isrc,
      image_uri: rawValue?.album?.images[0]?.url,
      title: rawValue?.name,
      artists: rawValue?.artists?.map((artist: {name: string}) => artist.name)
    }
    await insertData(value)

    res.status(200).send({
      message: 'SUCCESS',
      access_token
    });
  } catch (err: any) {
    res.status(400).send({message: err.message})
    console.error("Error:", err);
  }
};
