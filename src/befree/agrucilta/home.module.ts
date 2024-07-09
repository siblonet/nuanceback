import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BefreeAgriculterController } from './home.controller';
import { BefreeAgriculterService } from './home.service';
import { BefreePaysSchema, BefreeCooperativeSchema, BefreeAgrulterSchema, BefreeCategorieSchema, BefreeExploitationAgricoleSchema, BefreeTravailleurAgricoleSchema, BefreeInspecteurAgricoleSchema, BefreeExtraExploitationAgricoleSchema, BefreeProprieteurAgricoleSchema } from './home.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BefreePays', schema: BefreePaysSchema },
      { name: 'BefreeCooperative', schema: BefreeCooperativeSchema },
      { name: 'BefreeCategorie', schema: BefreeCategorieSchema },

      { name: 'BefreeAgrulter', schema: BefreeAgrulterSchema },
      { name: 'BefreeExploitationAgricole', schema: BefreeExploitationAgricoleSchema },
      { name: 'BefreeTravailleurAgricole', schema: BefreeTravailleurAgricoleSchema },
      { name: 'BefreeInspecteurAgricole', schema: BefreeInspecteurAgricoleSchema },
      { name: 'BefreeProprieteurAgricole', schema: BefreeProprieteurAgricoleSchema },
      { name: 'BefreeExtraExploitationAgricole', schema: BefreeExtraExploitationAgricoleSchema },

    ])
  ],

  controllers: [BefreeAgriculterController],
  providers: [BefreeAgriculterService]
})
export class BefreeAgriculterModule { }
