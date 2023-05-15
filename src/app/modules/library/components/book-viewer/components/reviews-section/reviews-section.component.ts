import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatRadioChange} from "@angular/material/radio";

@Component({
  selector: 'app-reviews-section',
  templateUrl: './reviews-section.component.html',
  styleUrls: ['./reviews-section.component.scss']
})
export class ReviewsSectionComponent implements OnInit {
  charactersLeft: number = 2000;
  isButtonDisabled: boolean = true;
  commentControl: FormControl = new FormControl('');

  orderByRecent = 'Most Recent';

  constructor() {
  }

  ngOnInit(): void {

  }

  onInputChange() {
    const inputLength = this.commentControl.value.length;
    this.isButtonDisabled = inputLength < 50;
    this.charactersLeft = 2000 - inputLength;
  }

  getFirstLetter(text: string): string {
    return text.substring(0, 1);
  }

  submitComment() {
    // Implement your logic to submit the comment
  }

  radioChange(event: MatRadioChange) {
    console.log(event.value);
  }
}
