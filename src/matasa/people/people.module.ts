import { Module } from '@nestjs/common';
import { PeopleMatasaService } from './people.service';
import { PeopleMatasaController } from './people.controller';
import { MineindService } from 'src/mineind/mineind.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonSchema } from './dto/create-person.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PeopleMatasa', schema: PersonSchema}
  ])
],
  controllers: [PeopleMatasaController],
  providers: [PeopleMatasaService, MineindService]
})
export class PeopleMatasaModule {}
