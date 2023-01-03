import { injectable } from 'inversify';
import { AppDataSource } from '@/database/config';
import { Diary } from '@/entity/diary';
import { Privacy } from '@/enums/Privacy';

@injectable()
export class DiaryService {
  constructor(private diaryRespository = AppDataSource.getRepository(Diary)) {}

  public async getAll(): Promise<Diary[] | null> {
    let allDiary: Diary[] | null = null;
    try {
      allDiary = await this.diaryRespository.find({
        order: { created_at: 'ASC' },
      });
    } catch (err) {
      console.log(err);
    }
    return allDiary;
  }

  public async createDiary(
    title: string,
    article: string,
    privacy: Privacy,
  ): Promise<number> {
    let createdRow = 0;
    const data: Diary = {
      title: title,
      article: article,
      privacy: privacy,
    } as Diary;
    try {
      const result = await this.diaryRespository.insert(data);
      createdRow = result.raw.affectedRows as number;
    } catch (err) {
      console.log(err);
    }
    return createdRow;
  }
}
