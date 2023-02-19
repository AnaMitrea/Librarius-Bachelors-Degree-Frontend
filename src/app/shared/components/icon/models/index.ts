import { CHART, HEART, PEN, SETTINGS, TABLE_LAMP } from '../const';

interface Icon {
  name: string;
  alt: string;
  src: string;
}

export const allIcons : Icon[] = [
  {
    name: CHART,
    alt: 'bar chart',
    src: 'src/assets/side-nav-bar-icons/bar-chart.svg'
  },
  {
    name: HEART,
    alt: 'heart',
    src: 'src/assets/side-nav-bar-icons/cards-heart-outline.svg'
  },
  {
    name: PEN,
    alt: 'pen',
    src: 'src/assets/side-nav-bar-icons/pen-nib-straight.svg'
  },
  {
    name: SETTINGS,
    alt: 'settings',
    src: 'src/assets/side-nav-bar-icons/settings.svg'
  },
  {
    name: TABLE_LAMP,
    alt: 'tabl lamp',
    src: 'src/assets/side-nav-bar-icons/table-lamp-outline.svg'
  },
]
