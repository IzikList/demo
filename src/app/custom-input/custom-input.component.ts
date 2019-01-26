import { Component, Input, OnInit, forwardRef, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
function log(a) {
    console.log('CustomInputComponent ' + a);
}

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
      providers: [
    {
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ], encapsulation: ViewEncapsulation.None

})
export class CustomInputComponent implements OnInit {

  constructor() { }

  @Input() keyPress: Function;
  @Input() delayKeys: Number = 300;
  @Input() textOnTop = '$';
  private onChange: Function;
  private onTouched: Function;

  timeBetweenKeys = 500;
  formControl = new FormControl('');
  subscription: any;
  innerValue = '';
  numberValue = 0;
  allowKeys = ['Backspace'];
  lastKeys = Date.now();

  ngOnInit() {
    log('init');
    this.subscription = this.formControl.valueChanges
      .subscribe((v) => {
        log('change');
        log(this.keyPress);
        if (v !== this.innerValue) {
          const temp = v.replace(/,/g, '');
          const transform = this.transform(temp);
          this.innerValue = transform;
          this.numberValue = parseFloat(transform);
          this.formControl.patchValue(this.innerValue);
          this.onChange && this.onChange(parseInt(this.innerValue.replace(/,/g, '')));
        }
      });
  }
  inncrement(num) {
    log(num);
    log(this.innerValue);
    // alert(this.numberValue);
    this.numberValue = parseInt(this.innerValue.replace(/,/g, '')) + num;
    const transform = this.transform('' + this.numberValue);
    this.innerValue = transform;
    this.formControl.patchValue(this.innerValue);
    log('innervalue ' + this.innerValue + ', transform ' + transform);
    console.log(this.onChange);
    this.onChange && this.onChange(parseInt(this.innerValue.replace(/,/g, '')));
  }
  key(keyEvent) {
    log('keyEvent');
    log(keyEvent.key);
    if (keyEvent.key >= '0' && keyEvent.key <= '9' || this.allowKeys.indexOf(keyEvent.key) !== -1) {
      return true;
    } else if (this.delayKeys > Date.now() - this.lastKeys) {
      log('keyEvent dealy ' + this.delayKeys + ' ' + Date.now() + ', ' + (Date.now() - this.lastKeys));
      return false;
    } else if (keyEvent.key === 'ArrowUp') {
      this.inncrement(1);
    } else if (keyEvent.key === 'ArrowDown') {
      this.inncrement(-1);
    }
    this.lastKeys = Date.now();
    return false;
  }
  ngOnDestroy() {
   this.subscription.unsubscribe();
  }

  writeValue(val) {
    log('write value ' + val);
    this.innerValue = this.transform(val);
    this.formControl.setValue(this.innerValue); // this.transform(val), { emitEvent: false });
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  private transform(val: string) {
    console.log('transform');
    if (val != null) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return val;
  }
}


