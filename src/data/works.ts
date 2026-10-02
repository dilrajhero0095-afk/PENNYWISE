export type WorkCategory = 'all' | 'identity' | 'digital' | 'motion'

export type Work = {
  id: string
  index: string
  title: string
  client: string
  category: Exclude<WorkCategory, 'all'>
  year: string
  format: string
  description: string
  art: string
  tone: string
  featured?: boolean
}

export const categories: { label: string; value: WorkCategory }[] = [
  { label: 'All work', value: 'all' },
  { label: 'Identity', value: 'identity' },
  { label: 'Digital', value: 'digital' },
  { label: 'Motion', value: 'motion' },
]

export const works: Work[] = [
  {
    id: 'alba',
    index: '01',
    title: 'Alba House',
    client: 'A new kind of retreat',
    category: 'identity',
    year: '2024',
    format: 'Identity / Art direction',
    description: 'A sun-warmed identity for a place that lets the day unfold slowly.',
    art: 'art-alba',
    tone: 'butter',
    featured: true,
  },
  {
    id: 'serein',
    index: '02',
    title: 'Serein',
    client: 'Skincare for late nights',
    category: 'digital',
    year: '2024',
    format: 'Strategy / Digital',
    description: 'A quiet commerce experience for a radically simple skincare ritual.',
    art: 'art-serein',
    tone: 'lilac',
  },
  {
    id: 'kinetic',
    index: '03',
    title: 'Kinetic Type',
    client: 'A title sequence study',
    category: 'motion',
    year: '2023',
    format: 'Motion / Experiment',
    description: 'Letters as material: a moving study in rhythm, weight and restraint.',
    art: 'art-kinetic',
    tone: 'ink',
  },
  {
    id: 'field-notes',
    index: '04',
    title: 'Field Notes',
    client: 'A journal for the curious',
    category: 'digital',
    year: '2023',
    format: 'Editorial / Web',
    description: 'An editorial system that makes room for wandering, collecting and sharing.',
    art: 'art-field',
    tone: 'sky',
  },
  {
    id: 'noya',
    index: '05',
    title: 'Noya Objects',
    client: 'Objects with a point of view',
    category: 'identity',
    year: '2022',
    format: 'Identity / Packaging',
    description: 'A tactile, graphic identity for everyday objects made to be kept.',
    art: 'art-noya',
    tone: 'orange',
  },
]
