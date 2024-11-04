import { NextFunction, Request, Response } from "express";

export function requestTime(req: Request, _res: Response, next: NextFunction) {
  // exclude logging for bundled files requests
  if (!req.url.startsWith("/dist") && req.url !== "/favicon.ico" && req.url !== "/resume.css") {
    const timestamp = new Date().toLocaleString();
    console.log(
      `\nRequest \x1b[32m\x1b[1m ${req.method} ${req.url} \x1b[0m` +
        `received at ${timestamp}` +
        `\nOrigin: \x1b[32m\x1b[1m ${req.protocol}://${req.get("host")}${req.originalUrl}\x1b[0m`
    );
  }
  next();
}
