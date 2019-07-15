export class RegisterRequest {
  login: string;
  firstName: string;
  lastName: string;

  constructor(obj?: Partial<RegisterRequest>) {
    Object.assign(this, obj);
  }
}
