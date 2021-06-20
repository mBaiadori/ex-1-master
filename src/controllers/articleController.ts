import { IArticle, IAuthors } from "./../entities";
import { NextFunction, Request, Response } from "express";
import { addObjectInArrayFile, readJsonArrayFile } from "../utils";
import { FieldError } from "../errors";

const authorsData = require("../data/authors.json");
const articleData = require("../data/articles.json");

export const articleController = (() => {
  const post = async (req: Request, res: Response, next: NextFunction) => {
    const { author_id, name, title } = req.body;
    if (!author_id || author_id === "")
      throw new FieldError("Author id must be provided");
    if (!title || title === "") throw new FieldError("Title must be provided");

    const articlesFilePath = "src/data/articles.json";
    const authorsFilePath = "src/data/authors.json";
    //Author
    let lastAuthorID: number = 0;
    authorsData.forEach((author: IAuthors) => {
      if (author.id > lastAuthorID) lastAuthorID = author.id;
    });
    let lastArticleID: number = 0;
    articleData.forEach((article: IArticle) => {
      if (article.id > lastArticleID) lastArticleID = article.id;
    });
    //
    const hasAuthor = authorsData.find(({ id }) => id === author_id);
    if (!hasAuthor) {
      if (!name)
        throw new FieldError("Author not find, A Name must be provided");
      const author = {
        id: lastAuthorID + 1,
        name,
        country_code: "",
      };
      await addObjectInArrayFile(authorsFilePath, author);
      //
      const article = {
        id: lastAuthorID + 1,
        author_id,
        title,
      };
      await addObjectInArrayFile(articlesFilePath, article);
      res.status(201).send(`Article id: ${article.id} was created`);
    }
    //Article
    const article = {
      id: lastArticleID + 1,
      author_id,
      title,
    };
    await addObjectInArrayFile(articlesFilePath, article);
    res.status(201).send(`Article id: ${article.id} was created`);
  };
  const put = async (req: Request, res: Response, next: NextFunction) => {
    const articlesFilePath = "src/data/articles.json";
    const articlesData: object[] = await readJsonArrayFile(articlesFilePath);
    for (let i: number; i < req.body.length; i++) {
      const { id, author_id, title } = req.body[i];
      if (!id) throw new Error("Id must be provided");
      if (!author_id) throw new Error("Author id must be provided");
      if (!title) throw new Error("Title must be provided");

      articlesData.forEach((article: IArticle, index: number) => {
        if (article.id === id) articlesData[index] = req.body[i];
      });
    }

    const { id, author_id, title } = req.body[0];
    console.log(author_id);

    res.status(202).send("The articles was altered");
  };
  const del = async (req: Request, res: Response, next: NextFunction) => {
    const { author_id, name, title } = req.body;
    res.status(202).send("The articles was altered");
  };
  return {
    post,
    put,
    del,
  };
})();
