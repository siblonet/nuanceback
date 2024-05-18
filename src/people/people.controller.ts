import { Controller, Post, Body, Patch, Param, Delete, Get, Put } from '@nestjs/common';
import { Person, PLog } from './entities/person.entity';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  @Post()
  create(@Body() person: Person) {
    return this.peopleService.create(person);
  }

  @Post('login/:owner')
  async login(@Param('owner') owner: string, @Body() pLog: PLog) {
    return await this.peopleService.login(pLog, owner);
  }

  @Post('account/local')
  createLocal(@Body() person: Person) {
    return this.peopleService.createLocal(person);
  }

  @Put('personupdate/:id')
  PersonUpte(@Param('id') id: string, @Body() persona: Person) {
    return this.peopleService.PersonUpte(id, persona);
  }

  @Put('status/:id')
  PersonStatus(@Param('id') id: string, @Body() status: any) {
    return this.peopleService.PersonStatus(id, status);
  }


  @Put('permission/handle/:id/:owner')
  permissionHandled(@Param('id') id: string, @Param('owner') owner: string, @Body() status: any) {
    return this.peopleService.permissionHandled(id, owner, status);
  }


  @Put('passwordupdate/:id')
  Passwordupdate(@Param('id') id: string, @Body() passwor: any) {
    return this.peopleService.Passwordupdate(id, passwor);
  }

  @Put('pushtoken/:id')
  Pushtoken(@Param('id') id: string, @Body() pushtoken: any) {
    return this.peopleService.Pushtoken(id, pushtoken);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(id);
  }

  @Get("nonadmin/:owner")
  async allNonadmin(@Param('owner') owner: string): Promise<Person[]> {
    return await this.peopleService.allNonadmin(owner);
  }

  @Get("persons/:owner")
  async allPersons(@Param('owner') owner: string): Promise<Person[]> {
    return await this.peopleService.allPerson(owner);
  }

  @Get("persons/one/:phone/:owner")
  async onePerson(@Param('phone') phone: string, @Param('owner') owner: string): Promise<Person> {
    return await this.peopleService.onePerson(phone, owner);
  }

  @Get("withidpersons/:id")
  async withidPersons(@Param('id') id: string): Promise<Person> {
    return await this.peopleService.withidPersons(id);
  }

  // Update the existing DELETE route to handle article removal
  @Post('sendexpopushtoken/:owner')
  async sendExpopushnotification(@Param('owner') owner: string, @Body() notificaton: any): Promise<void> {
    return this.peopleService.sendExpoPushNotifications(notificaton, owner);
  }


}
