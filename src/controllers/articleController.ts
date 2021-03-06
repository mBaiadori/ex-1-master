import { IArticle, IAuthors } from './../entities';
import { NextFunction, Request, Response } from 'express';
import {
  addObjectInArrayFile,
  readJsonArrayFile,
  updateArrayFile
} from '../utils';
import { FieldError } from '../errors';

const articlesFilePath = 'src/data/articles.json';
const authorsFilePath = 'src/data/authors.json';

export const articleController = (() => {
  const post = async (req: Request, res: Response) => {
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
  const put = async (req: Request, res: Response) => {
    const articlesData: IArticle[] = await readJsonArrayFile(articlesFilePath);

    for (let i = 0; i < req.body.length; i++) {
      const { id, author_id, title } = req.body[i];
      if (!id) throw new FieldError(`Id must be provided, DataIndex:${i}`);
      if (!author_id)
        throw new FieldError(`Author id must be provided, DataIndex:${i}`);
      if (!title)
        throw new FieldError(`Title must be provided, DataIndex:${i}`);

      const id_article = id;
      const hasArticle = articlesData.find(({ id }) => id === id_article);
      if (!hasArticle) throw new FieldError(`Article not find, DataIndex:${i}`);

      articlesData.forEach((article: IArticle, index: number) => {
        if (article.id === id) articlesData[index] = req.body[i];
      });
      await updateArrayFile(articlesFilePath, articlesData);
    }
    res.sendStatus(204);
  };
  const del = async (req: Request, res: Response) => {
    const articlesData: IArticle[] = await readJsonArrayFile(articlesFilePath);
    for (let i = 0; i < req.body.length; i++) {
      const id = Number(req.body[i]);
      let index = 0;
      const result = articlesData.filter((article, i) => {
        if (article.id === id) index = i;
        return article.id === id;
      });
      if (result.length === 0)
        throw new FieldError(`Article not find, DataIndex:${i}`);
      articlesData.splice(index, 1);
    }
    await updateArrayFile(articlesFilePath, articlesData);
    res.sendStatus(204);
  };
  return {
    post,
    put,
    del
  };
})();
