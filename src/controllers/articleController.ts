import { IArticle, IAuthors } from './../entities';
import { NextFunction, Request, Response } from 'express';
import { addObjectInArrayFile, readJsonArrayFile } from '../utils';
import { FieldError } from '../errors';

const articlesFilePath = 'src/data/articles.json';
const authorsFilePath = 'src/data/authors.json';

export const articleController = (() => {
  const post = async (req: Request, res: Response, next: NextFunction) => {
    const articlesData = await readJsonArrayFile(articlesFilePath);
    const authorsData = await readJsonArrayFile(authorsFilePath);
    const { author_id, name, title } = req.body;

    if (!name && !author_id)
      throw new FieldError('Author id or name must be provided');
    if (name && author_id) throw new FieldError('Just send an Author_id');
    if (!title || title === '') throw new FieldError('Title must be provided');

    const hasAuthor = authorsData.find(({ id }) => id === Number(author_id));

    let lastAuthorID: number = 0;
    authorsData.forEach((author: IAuthors) => {
      if (author.id > lastAuthorID) lastAuthorID = author.id;
    });

    let lastArticleID: number = 0;
    articlesData.forEach((article: IArticle) => {
      if (article.id > lastArticleID) lastArticleID = article.id;
    });

    //
    if (!hasAuthor) {
      if (!name)
        throw new FieldError('Author not find, A Name must be provided');
      const author = {
        id: lastAuthorID + 1,
        name: name,
        country_code: ''
      };
      await addObjectInArrayFile(authorsFilePath, author);
      //
      const article = {
        id: lastArticleID + 1,
        author_id: author.id,
        title
      };
      await addObjectInArrayFile(articlesFilePath, article);
      res.status(201).send(`Article id: ${article.id} was created`);
      return;
    }
    //Article
    const article = {
      id: lastArticleID + 1,
      author_id,
      title
    };
    await addObjectInArrayFile(articlesFilePath, article);
    res.status(201).send(`Article id: ${article.id} was created`);
  };
  const put = async (req: Request, res: Response, next: NextFunction) => {
    const articlesData: object[] = await readJsonArrayFile(articlesFilePath);

    for (let i = 0; i < req.body.length; i++) {
      const { id, author_id, title } = req.body[i];
      if (!id) throw new FieldError(`Id must be provided, DataIndex:${i}`);
      if (!author_id)
        throw new FieldError(`Author id must be provided, DataIndex:${i}`);
      if (!title)
        throw new FieldError(`Title must be provided, DataIndex:${i}`);

      const hasArticle = articlesData.find((id) => id === id);
      if (!hasArticle) throw new FieldError(`Article not find, DataIndex:${i}`);

      articlesData.forEach((article: IArticle, index: number) => {
        if (article.id === id) articlesData[index] = req.body[i];
      });
    }
    // const { id, author_id, title } = req.body[0];
    // console.log(author_id);

    res.status(202).send(`${req.body.length} article(s) was altered`);
  };
  const del = async (req: Request, res: Response, next: NextFunction) => {
    const { author_id, name, title } = req.body;
    res.status(202).send('The articles was altered');
  };
  return {
    post,
    put,
    del
  };
})();
