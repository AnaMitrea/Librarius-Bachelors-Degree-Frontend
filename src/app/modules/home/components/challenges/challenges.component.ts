import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {
  categories = [
    { title: 'Reading Books', id: 'div1' },
    { title: 'Reading Time', id: 'div2' },
    { title: 'Category Reader', id: 'div3' },
    { title: 'Activities', id: 'div4' },
  ];

  challenges = [
    {
      id: 1,
      title: 'Challenge 1',
      instructions: 'Earn this badge once you have read for 1 hour.',
      imageSrcPath: 'assets/trophies/marathon_reader_badge.svg'
    },
    {
      id: 2,
      title: 'Challenge 2',
      instructions: 'Earn this badge once you have read for 1 hour.',
      imageSrcPath: 'assets/trophies/newbie_logger_badge.svg'
    },
    {
      id: 3,
      title: 'Challenge 3',
      instructions: 'Earn this badge once you have read for 1 hour.',
      imageSrcPath: 'assets/trophies/weekend_logger_badge.svg'
    },
    {
      id: 4,
      title: 'Challenge 4',
      instructions: 'Earn this badge once you have read for 1 hour.',
      imageSrcPath: 'assets/trophies/wisher_badge.svg'
    },
    {
      id: 5,
      title: 'Challenge 5',
      instructions: 'Earn this badge once you have read for 1 hour.',
      imageSrcPath: 'assets/trophies/hours_milestone/1_hours_milestone_badge.svg'
    },
    {
      id: 6,
      title: 'Challenge 6',
      instructions: 'Earn this badge once you have added at least 1 book to your wishlist.',
      imageSrcPath: 'assets/trophies/hours_milestone/100_plus_hours_milestone_badge.svg'
    },
    {
      id: 7,
      title: 'Challenge 7',
      instructions: 'Earn this badge once you have added at least 1 book to your wishlist.',
      imageSrcPath: 'assets/trophies/hours_milestone/2_hours_milestone_badge.svg'
    },
    {
      id: 8,
      title: 'Challenge 8',
      instructions: 'Earn this badge once you have added at least 1 book to your wishlist.',
      imageSrcPath: 'assets/trophies/hours_milestone/3_hours_milestone_badge.svg'
    }
  ]


  ngOnInit(): void {
  }

  onChipClickScroll(divId: string) {
    const element = document.getElementById(divId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onJoinChallengeClick(id: number) {
    // TODO save clicked challenge
  }
}
