import { Response } from 'express';

export interface ResponseWithBody<T> extends Response {
  body: T
}