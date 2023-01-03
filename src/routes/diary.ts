import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { DiaryController } from '@/controllers/diary';
import { TYPES } from '@/types';

@injectable()
export class DiaryRoute {
  public router: Router;
  constructor(
    @inject(TYPES.DiaryController) private diaryController: DiaryController,
  ) {
    this.router = Router();

    this.router.post('/', this.diaryController.createDiary);

    this.router.get('/', this.diaryController.getAll);

    this.router.get('/id');

    this.router.patch('/id');

    this.router.delete('/id');
  }
}
