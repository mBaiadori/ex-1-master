import { Request, Response } from "express";
import { IAuthors } from "../entities";

const authors = require("../data/authors.json");
const countries = require("../data/countries.json");
const articles = require("../data/articles.json");

export const authorsController = (() => {
  const list = (_: Request, res: Response) => {
    try {
      const authorsList = authors.map((author: IAuthors) => {
        let authorArticles = [];
        for (let article in articles) {
          if (articles[article].author_id === author.id)
            authorArticles.push(articles[article].title);
        }
        const hasArticle = authorArticles.length > 0 ? authorArticles : false;
        return {
          name: author.name,
          country: countries[author.country_code.toLowerCase()],
          articles: hasArticle,
        };
      });
      res.status(200).json(authorsList);
    } catch (e) {
      throw new Error("Something was wrong");
    }
  };

  return {
    list,
  };
})();
