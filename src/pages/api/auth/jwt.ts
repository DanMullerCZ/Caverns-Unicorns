import type { Secret } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import * as crypto from "crypto";
dotenv.config({ path: __dirname + "/.env" });

// Usually I keep the token between 5 minutes - 15 minutes


function generateAccessToken(user: any) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET as Secret, {
    expiresIn: '5m',
  });
}

// I choosed 8h because i prefer to make the user login again each day.
// But keep him logged in if he is using the app.
// You can change this value depending on your app logic.
// I would go for a maximum of 7 days, and make him login again after 7 days of inactivity.
function generateRefreshToken(user:any, jti:any) {
  return jwt.sign({
    userId: user.id,
    jti
  }, process.env.JWT_REFRESH_SECRET as Secret, {
    expiresIn: '8h',
  });
}

export function generateTokens(user:string, jti: string) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}



export function hashToken(token:any) {
  return crypto.createHash('sha512').update(token).digest('hex');
}

