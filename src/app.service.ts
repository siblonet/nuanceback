import { Injectable } from '@nestjs/common';
//construction 
@Injectable()
export class AppService {
  getHello(): object {
    const fory = {
      "nome":"Nuance",
      "lastname":"D'oud",
    }
    return fory;
  }
}
