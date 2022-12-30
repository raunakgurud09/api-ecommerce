import { Request, Response } from 'express';
import { omit, get } from 'lodash';

import { createUser } from './user.service';

export async function createUserHandle(req: Request, res: Response) {
  try {
    const user: any = await createUser(req.body);
    return res.send(omit(user.toJSON(), 'password'));
  } catch (e) {
    console.log(e);
    return res.status(409).send(e);
  }
  // res.status(200).send('ok')
}

export async function getAuthorizedUser(req: Request, res: Response) {
  const user = get(req, 'user');
  res.status(200).send(user);
}
