import { Request, Response, NextFunction } from "express";
import { spotify_api_url } from "../constants";

const client_id: string = process.env.CLIENT_ID || "";
const client_secret: string = process.env.CLIENT_SECRET || "";

export const requestSpotifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reponse = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=client_credentials&client_id=" +
      client_id +
      "&client_secret=" +
      client_secret,
  });
  const tokenData = await reponse.json();
  if (tokenData) {
    res.locals.tokenData = tokenData;
    next();
  }
};
