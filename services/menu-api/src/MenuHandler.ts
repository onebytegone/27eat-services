import { Context, Callback } from 'aws-lambda';

export function handler(_evt: any, _context: Context, cb: Callback): void {
   cb(null, { pong: new Date() });
}
