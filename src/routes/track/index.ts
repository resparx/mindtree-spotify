import { Router } from "express";
import { add } from "../../controllers/track/add";
import { requestSpotifyAccessToken } from "../../middleware/requestSpotifyAccessToken";
import { getByISRC } from "../../controllers/track/getByISRC";
import { getByArtist } from "../../controllers/track/getByArtist";

const router = Router();

router.post("/add/:isrc", requestSpotifyAccessToken, add);

router.get("/getByISRC/:isrc", getByISRC);

router.get("/getByArtist/:artist", getByArtist);

export default router;
