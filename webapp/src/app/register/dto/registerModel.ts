import { BaseModelItem } from 'src/app/shared/dto/BaseModelItem';

export class RegisterModel {
  login: BaseModelItem;
  lastName: BaseModelItem;
  firstName: BaseModelItem;

  constructor(obj?: Partial<RegisterModel>) {
    Object.assign(this, obj);
  }
}
