import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { MineindService } from 'src/mineind/mineind.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonSchema } from './dto/create-person.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'People', schema: PersonSchema}
  ])
],
  controllers: [PeopleController],
  providers: [PeopleService, MineindService]
})
export class PeopleModule {}
