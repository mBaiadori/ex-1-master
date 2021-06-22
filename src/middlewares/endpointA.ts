import { NextFunction, Request, Response } from 'express';
import { IAuthors } from '../entities';
import { FieldError, NoDataError } from '../errors';
import { objectSorts, paginateArray } from '../utils';

const authorData: IAuthors[] = require('../data/authors.json');
export const endpointA = async (req: Request, res: Response, next: NextFunction) => {
  const { per_page, page, order, sort } = req.query;
  const pageNumber = Number(page);
  const per_pageNumber = Number(per_page);
  if (!per_page || !page || !order || !sort)
    throw new FieldError('Missing field(s), Use this format > per_page, page, order, sort');
  if (!parseInt(per_page.toString()) || per_pageNumber <= 0)
    throw new FieldError('Per_page just accepted greater than 0 number');
  if (!parseInt(page.toString()) || pageNumber <= 0)
    throw new FieldError('Page just accepted greater than 0 number');
  if (order !== 'name' && order !== 'id' && order !== 'country_code')
    throw new FieldError('Order just accepted this values > name , id, country_code');
  if (sort !== 'desc' && sort !== 'asc')
    throw new FieldError('Sort just accepted this values > desc , asc');
  if (authorData.length === 0) throw new NoDataError('No data to show');

  authorData.sort(objectSorts(order, sort));
  const result = paginateArray(authorData, per_pageNumber, pageNumber);
  res.status(200).json(result);
  next();
};
