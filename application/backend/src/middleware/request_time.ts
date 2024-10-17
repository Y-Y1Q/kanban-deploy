import { Request, Response, NextFunction } from "express";

const requestTime = (req: Request, res: Response, next: NextFunction) => {
  // Exclude logging for bundled files and favicon requests
  if (!req.url.startsWith("/dist") && req.url !== "/favicon.ico") {
    const timestamp = new Date().toISOString(); // Use ISO format for consistency
    console.log(
      `\nRequest \x1b[32m\x1b[1m${req.method} ${req.url}\x1b[0m received at ${timestamp}`
    );
  }
  next();
};

export { requestTime };
