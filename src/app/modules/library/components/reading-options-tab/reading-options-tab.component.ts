import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-reading-options-tab',
  templateUrl: './reading-options-tab.component.html',
  styleUrls: ['./reading-options-tab.component.scss']
})
export class ReadingOptionsTabComponent implements OnInit{
  @Output() colorModeEvent = new EventEmitter<string>();
  @Output() fontFamilyEvent = new EventEmitter<string>();
  @Output() fontSizeEvent = new EventEmitter<string>();
  @Output() readerWidthEvent = new EventEmitter<string>();

  colorModeControl = new FormControl('color-mode-white');
  fontFamilyControl = new FormControl('font-family-serif');
  readerWidthControl = new FormControl('reader-width-large');

  ngOnInit() {
    this.colorModeControl.valueChanges.subscribe(value => {
      if (value) this.changeColorMode(value);
    });

    this.fontFamilyControl.valueChanges.subscribe(value => {
      if (value) this.changeFontFamily(value);
    });

    this.readerWidthControl.valueChanges.subscribe(value => {
      if (value) this.changeReaderWidth(value);
    });
  }

  changeColorMode(colorMode: string) {
    this.colorModeEvent.emit(colorMode);
  }

  changeFontFamily(fontFamily: string) {
    this.fontFamilyEvent.emit(fontFamily);
  }

  changeReaderWidth(readerWidth: string) {
    this.readerWidthEvent.emit(readerWidth);
  }
}
