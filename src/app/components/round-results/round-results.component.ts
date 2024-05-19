import { Component, OnInit } from '@angular/core';
import { SettingInterface } from '../../interfaces/setting';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-round-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './round-results.component.html',
  styleUrl: './round-results.component.css',
})
export class RoundResultsComponent implements OnInit {
  rounds: SettingInterface[] = [];
  currentRound: number = 1;
  spintMode: boolean = false;
  resultMode: boolean = false;
  luckyNum: number = 0;

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const roundLocal = localStorage.getItem('round');
      if (roundLocal) {
        this.rounds = JSON.parse(roundLocal);
      }
    }
  }
  refreshData(): void {
    const roundLocal = localStorage.getItem('round');
    if (roundLocal) {
      this.rounds = JSON.parse(roundLocal);
    }
    this.currentRound = 1;
  }

  onClose() {
    setTimeout(() => {
      this.spintMode = false;
      this.resultMode = false;
    }, 500);
  }

  onRoll() {
    this.spintMode = true;
    this.playSpinSound();
    const Participants = Number(localStorage.getItem('participants'));
    const index = this.rounds.findIndex(
      (round) => round.id === this.currentRound
    );
    if (index !== -1 && this.currentRound <= this.rounds.length) {
      let luckyNumber: number | null = null;
      let isDuplicate = true;
      while (isDuplicate) {
        luckyNumber = Math.floor(Math.random() * Participants) + 1;
        this.luckyNum = luckyNumber;
        isDuplicate = this.rounds.some(
          (round) => round.luckyPeople === luckyNumber
        );
      }
      this.rounds[index].luckyPeople = luckyNumber;
      localStorage.setItem('round', JSON.stringify(this.rounds));
      this.currentRound = this.currentRound + 1;
    } else {
      console.error('Round with id ' + this.currentRound + ' not found.');
    }
    setTimeout(() => {
      const wheel = document.querySelector('.wheel') as HTMLElement;
      if (wheel) {
        wheel.classList.add('shrink');
      }
    }, 5000);
    setTimeout(() => {
      this.resultMode = true;
      this.playTadaSound();
    }, 5500);
  }

  onRefresh() {
    this.rounds.forEach((round) => (round.luckyPeople = null));
    localStorage.setItem('round', JSON.stringify(this.rounds));
    this.currentRound = 1;
  }

  onRevert() {
    const revertRound = this.rounds.find(
      (round) => round.id === this.currentRound - 1
    );

    if (revertRound) {
      revertRound.luckyPeople = null;
      localStorage.setItem('round', JSON.stringify(this.rounds));
    } else {
      console.error('Round with id ' + (this.currentRound - 1) + ' not found.');
    }

    this.currentRound = this.currentRound - 1;
  }

  playSpinSound() {
    const audio = document.getElementById('spin-sound') as HTMLAudioElement;
    if (audio) {
      audio
        .play()
        .catch((error) => console.error('Error playing spin sound:', error));
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, 5300);
    }
  }

  // Play tada sound function
  playTadaSound() {
    const audio = document.getElementById('tada-sound') as HTMLAudioElement;
    if (audio) {
      audio
        .play()
        .catch((error) => console.error('Error playing tada sound:', error));
    }
  }
}
