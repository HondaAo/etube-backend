import { Response } from "express";

export interface MyContext {
  req: any;
  res: Response;
}
