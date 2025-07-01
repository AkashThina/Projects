import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-typing-test',
  imports: [CommonModule, MatFormField, MatInputModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './typing-test.component.html',
  styleUrl: './typing-test.component.css'
})
export class TypingTestComponent {
  fallingWords = [{ text: 'Start', position: 0 }];
  typedWord = '';
  score = 0;
  missed = 0;
  intervalId: any = null; // Store interval reference

  constructor(private dialog: MatDialog) { }
  startGame() {
    if (this.intervalId) return; // Prevent multiple intervals
    this.intervalId = setInterval(() => {
      this.fallingWords.forEach(word => {
        word.position += 5;
        if (word.position >= 25) {
          this.removeWord(word);
          this.missed++;
        }

      });

      if (Math.random() < 0.5) this.addNewWord();
    }, 1000);
  }

  stopGame() {
    if (this.score === 0) return;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      data: { score: this.score }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // User confirmed stop
        this.fallingWords = [{ text: 'Start', position: 0 }];
        this.typedWord = '';
        this.score = 0;
        this.missed = 0;
      } else {
        // User chose to continue, resume game
        this.startGame();
      }
    });
  }


  checkTypedWord() {
    const index = this.fallingWords.findIndex(w => w.text === this.typedWord.trim());
    if (index >= 0) {
      this.fallingWords.splice(index, 1);
      this.score++;
    }
    this.typedWord = '';
  }

  removeWord(word: { text: string; position: number }) {
    const index = this.fallingWords.indexOf(word);
    if (index >= 0) this.fallingWords.splice(index, 1);
  }

  addNewWord() {
    const words = ['Start', 'Fast', 'Good', 'Nice Try', 'Amazing', 'Acknowledgment', 'Unbelievable', 'Misunderstood',
      'Communication', 'Extraordinary', 'Responsibility', 'Configuration', 'Collaboration', 'Determination', 'Technological'
    ];
    const word = words[Math.floor(Math.random() * words.length)];
    this.fallingWords.push({ text: word, position: 0 });
  }
  reset() {
    this.fallingWords = [{ text: 'Start', position: 0 }];
    this.typedWord = '';
    this.score = 0;
    this.missed = 0;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}
