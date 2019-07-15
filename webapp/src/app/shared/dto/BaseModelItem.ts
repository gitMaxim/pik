export class BaseModelItem {
  formControlName?: string;
  description?: string;
  errorText?: string;
  showError?: boolean;

  constructor(obj?: Partial<BaseModelItem>) {
    Object.assign(this, obj);
  }
}
