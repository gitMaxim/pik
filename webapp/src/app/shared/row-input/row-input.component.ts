import { Component, Input, Output, ViewChild, ElementRef, Renderer2, forwardRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';

@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RowInputComponent),
    multi: true
  }],
  selector: 'app-row-input',
  templateUrl: './row-input.component.html',
  styleUrls: ['./row-input.component.scss']
})
export class RowInputComponent implements ControlValueAccessor {
  @Input() formGroup: FormGroup;
  @Input() formControlName: string;
  @Input() disabled = false;
  @Input() description: string;
  @Input() errorText: string;
  @Input() showError: boolean;

  @Output() inputChanged = new EventEmitter();
  @Output() blurChanged = new EventEmitter();

  @ViewChild('rowInput', null) rowInput: ElementRef;

  isFocused = false;

  onChangeRegistered = (value: string) => {};
  onTouchedRegistered = () => {};

  constructor(private renderer: Renderer2) { }

  writeValue(value: string) {
    if (this.rowInput) {
      this.renderer.setProperty(this.rowInput.nativeElement, 'value', value);
    }
  }

  registerOnChange(fn: (value: string) => void) {
    this.onChangeRegistered = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedRegistered = fn;
  }

  setDisabledState?(isDisabled: boolean) {
    if (this.rowInput) {
      this.renderer.setProperty(this.rowInput.nativeElement, 'disabled', isDisabled);

      if (this.formGroup) {
        if (isDisabled) {
          this.formGroup.controls[this.formControlName].disable();
        } else {
          this.formGroup.controls[this.formControlName].enable();
        }

        this.disabled = isDisabled;
      }
    }
  }

  onChange(event) {
    if (event && event.target) {
      this.onChangeRegistered(event.target.value);
    }
  }

  onTouched() {
    this.onTouchedRegistered();
  }

  onInput() {
    if (this.inputChanged) {
      this.inputChanged.emit();
    }
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;

    if (this.blurChanged) {
      this.blurChanged.emit();
    }
  }
}
