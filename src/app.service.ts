import { Injectable } from '@nestjs/common';
//construction 
@Injectable()
export class AppService {
  getHello(): object {
    const fory = {
      "nome":"Noble",
      "lastname":"Faveur",
    }
    return fory;
  }
}
