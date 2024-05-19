import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SettingInterface } from '../../interfaces/setting';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent implements OnInit {
  settingForm: FormGroup;
  rounds: SettingInterface[] = [];
  @Output() settingSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder) {
    this.settingForm = this.fb.group({
      numberParticipants: [1, [Validators.required]],
      numberRound: [1, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  emitSettingSuccess(success: boolean = true): void {
    this.settingSuccess.emit(success);
  }
  done() {
    if (this.settingForm.valid) {
      localStorage.setItem(
        'participants',
        this.settingForm.value.numberParticipants
      );
      for (let i = 1; i <= this.settingForm.value.numberRound; i++) {
        const newRound: SettingInterface = { id: i, luckyPeople: null };
        this.rounds.push(newRound);
      }
      localStorage.setItem('round', JSON.stringify(this.rounds));
      this.emitSettingSuccess();
    } else {
      console.log('error');
    }
  }
}
