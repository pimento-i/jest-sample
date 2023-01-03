import { RequestHandler } from 'express';
import { inject, injectable } from 'inversify';
import { Diary } from '@/entity/diary';
import { DiaryService } from '@/service/diary';
import { TYPES } from '@/types';
import { Privacy } from '@/enums/Privacy';

@injectable()
export class DiaryController {
  constructor(@inject(TYPES.DiaryService) private diaryService: DiaryService) {}

  public getAll: RequestHandler = async (req, res, next): Promise<void> => {
    const allDiary: Diary[] | null = await this.diaryService.getAll();
    if (!allDiary) {
      next(new Error(`server error`));
    }
    if (!res.headersSent) {
      res.json({ allDiary: allDiary });
    }
  };

  public createDiary: RequestHandler = async (
    req,
    res,
    next,
  ): Promise<void> => {
    const postData = req.body as {
      title: string;
      article: string;
      privacy: Privacy;
    };

    const { title, article, privacy } = {
      ...postData,
    };

    const result = await this.diaryService.createDiary(title, article, privacy);

    if (result !== 1) {
      next(new Error(`server error`));
    }

    if (!res.headersSent) {
      res.status(201).json({ message: 'succeed create new Diary.' });
    }
  };
}
