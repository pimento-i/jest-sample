import { Container } from 'inversify';
import { AppServer } from '@/server';
import { TYPES } from '@/types';
import { DiaryRoute } from '@/routes/diary';
import { DiaryController } from '@/controllers/diary';
import { DiaryService } from '@/service/diary';

const container = new Container();
container.bind<AppServer>(TYPES.AppServer).to(AppServer).inSingletonScope();
container.bind<DiaryRoute>(TYPES.DiaryRoute).to(DiaryRoute).inSingletonScope();
container
  .bind<DiaryController>(TYPES.DiaryController)
  .to(DiaryController)
  .inSingletonScope();
container
  .bind<DiaryService>(TYPES.DiaryService)
  .to(DiaryService)
  .inSingletonScope();
export { container };
