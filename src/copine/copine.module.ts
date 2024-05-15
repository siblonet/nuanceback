import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MineindService } from 'src/mineind/mineind.service';
import { CopineCommentUserSchema, CopineRecordEntitySchema, CopineReplyUserSchema, CopineUserSchema } from './entity_schemat/entity_schemat';
import { CopineController } from './copine.controller';
import { CopineService } from './copine.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CopineUser', schema: CopineUserSchema },
      { name: 'CopineComment', schema: CopineCommentUserSchema },
      { name: 'CopineRecord', schema: CopineRecordEntitySchema },
      { name: 'CopineReply', schema: CopineReplyUserSchema }
    ])
  ],

  controllers: [CopineController],
  providers: [CopineService, MineindService]
})
export class CopineModule { }
