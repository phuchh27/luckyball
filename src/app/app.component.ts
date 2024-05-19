import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SettingComponent } from './components/setting/setting.component';
import { HeaderComponent } from './components/header/header.component';
import { RoundResultsComponent } from './components/round-results/round-results.component';
import { MatIconModule } from '@angular/material/icon';
import { fail } from 'assert';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SettingComponent,
    HeaderComponent,
    RoundResultsComponent,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild(RoundResultsComponent)
  roundResultsComponent!: RoundResultsComponent;

  title = 'luckyball';
  seetingMode: boolean = false;

  handleSettingSuccess(success: boolean): void {
    // if (success) {
    //   this.seetingMode = false;
    //   console.log(this.seetingMode);
    //   this.roundResultsComponent.refreshData();
    // } else {
    //   this.seetingMode = true;
    // }
    this.seetingMode = !event;
    this.roundResultsComponent.refreshData();
  }

  enableSetting() {
    this.seetingMode = true;
  }
}
