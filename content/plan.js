// The calendar. Edit items here; ids must stay stable once Megha has responded.
const IG = ['ig', 'Instagram'], LI = ['li', 'LinkedIn'], WA = ['wa', 'WhatsApp'];
const WQ = 'The Within Question', CHAIR = 'From the people chair', IN = 'Inside the room', OUT = 'Outside the room';

const MONTHS = [
  {
    id: 'm1', label: 'Month one', dates: '9 Nov to 6 Dec', title: 'Meet <em>Megha</em>',
    goal: 'A stranger knows who you are, why you coach, and what a first conversation looks like.',
    items: [
      { id: 'm1-1', date: 'Mon 9 Nov', ch: [IG, LI], format: 'Carousel, 3 slides', pillar: 'Introduction', title: 'Three chairs',
        hook: 'For fourteen years I sat across from people and their money. For thirteen, across from people and their careers. Now I sit across from people and themselves.',
        text: 'Your introduction: banking, building Traveazy, and why coaching came next.' },
      { id: 'm1-2', date: 'Thu 12 Nov', ch: [IG], format: 'Post and story', pillar: WQ, title: 'No. 01',
        q: 'What would you stop doing if no one were keeping score?',
        text: 'The series begins. Two lines in the caption say how it works: one question a week, nothing to answer.' },
      { id: 'm1-3', date: 'Mon 16 Nov', ch: [IG], format: 'Post and story', pillar: WQ, title: 'No. 02',
        q: 'Whose voice do you hear when you say “I should”?' },
      { id: 'm1-4', date: 'Thu 19 Nov', ch: [IG, LI], format: 'Reel, 40 seconds', pillar: IN, title: 'Why coaching, after twenty-five years',
        text: 'You, to camera, in one take. The turn from leading people to coaching them, told at whatever depth feels right.',
        ask: 'a 20-minute call. We shape the script from what you say.' },
      { id: 'm1-5', date: 'Mon 23 Nov', ch: [IG], format: 'Post and story', pillar: WQ, title: 'No. 03',
        q: 'What are you calling patience that is really fear?' },
      { id: 'm1-6', date: 'Thu 26 Nov', ch: [IG, LI], format: 'Carousel, 3 slides', pillar: IN, title: 'What happens in a first conversation',
        hook: 'Forty-five minutes. You talk, I listen, and we both find out whether this is right.',
        text: 'Takes the mystery out of the discovery call, and ends with the booking link.' },
      { id: 'm1-7', date: 'Mon 30 Nov', ch: [IG], format: 'Post and story', pillar: WQ, title: 'No. 04',
        q: 'If someone read only your calendar, what would they say you value?' },
      { id: 'm1-8', date: 'Thu 3 Dec', ch: [IG], format: 'Reel, no talking', pillar: OUT, title: 'The first twenty minutes of my day',
        text: 'Your morning ritual, filmed quietly. Captions and soft sound. The calm is the message.',
        ask: 'a few phone clips of your morning, in any order.' },
      { id: 'm1-9', date: 'Once Instagram is live', ch: [WA], format: 'Note to your circle', pillar: 'Champions', title: 'A note to your circle',
        text: 'Four lines sharing your Instagram and website. It asks for nothing.' },
      { id: 'm1-10', date: 'When the result comes', ch: [IG, LI], format: 'One story, profile update', pillar: IN, title: 'ACC, quietly',
        text: 'A single story frame and a new LinkedIn headline. No post, as you asked.' }
    ]
  },
  {
    id: 'm2', label: 'Month two', dates: '7 Dec to 3 Jan', title: 'From the <em>people chair</em>',
    goal: 'Show the depth behind the practice as the year turns. Fewer posts in the holidays.',
    items: [
      { id: 'm2-1', date: 'Mon 7 Dec', ch: [IG], format: 'Post and story', pillar: WQ, title: 'No. 05',
        q: 'Which conversation have you rehearsed more times than you have had it?' },
      { id: 'm2-2', date: 'Thu 10 Dec', ch: [IG, LI], format: 'Reel, 45 seconds', pillar: CHAIR, title: 'Leading people who are frightened',
        text: 'What running a travel company through a pandemic taught you about people.',
        ask: '15 minutes on a call about those months.' },
      { id: 'm2-3', date: 'Mon 14 Dec', ch: [IG], format: 'Post and story', pillar: WQ, title: 'No. 06',
        q: 'Who do you become when the meeting gets hard?' },
      { id: 'm2-4', date: 'Thu 17 Dec', ch: [IG, LI], format: 'Post', pillar: CHAIR, title: 'The person I got wrong',
        text: 'A mistake you made as a leader, and what it changed in you. Unnamed and unplaceable.',
        ask: 'the moment, told roughly. We do the rest.' },
      { id: 'm2-5', date: 'Mon 21 Dec', ch: [IG], format: 'Post and story', pillar: WQ, title: 'No. 07',
        q: 'What did this year ask of you that you did not expect to give?' },
      { id: 'm2-6', date: 'Thu 24 Dec', ch: [IG], format: 'Post and story', pillar: OUT, title: 'A page I am reading',
        text: 'One page you have underlined, photographed as it is, with two lines on why it stayed.',
        ask: 'the photo and the book.' },
      { id: 'm2-7', date: 'Mon 28 Dec', ch: [IG], format: 'Post and story', pillar: WQ, title: 'No. 08',
        q: 'What would rest look like if you did not have to earn it?' },
      { rest: 'Thu 31 Dec. No post. Rest.' },
      { id: 'm2-8', date: 'Late December', ch: [WA], format: 'Note to your circle', pillar: 'Champions', title: 'Questions for the holidays',
        text: 'A year-end thank you, with the questions so far to take into the break.' }
    ]
  },
  {
    id: 'm3', label: 'Month three', dates: '4 Jan to 31 Jan', title: 'Turning <em>points</em>',
    goal: 'Learn which of your five audiences answers, and earn the first discovery calls from content.',
    items: [
      { id: 'm3-1', date: 'Mon 4 Jan', ch: [IG], format: 'Post and story', pillar: WQ, title: 'No. 09',
        q: 'What are you waiting for permission to begin?' },
      { id: 'm3-2', date: 'Thu 7 Jan', ch: [IG, LI], format: 'Stories, 5 frames and a poll', pillar: IN, title: 'Five turning points',
        text: 'The new role, the new country, the family business, the founder who outgrew the job, the life that changed shape. A poll asks which one is you, and the answers tell us who to speak to from February.' },
      { id: 'm3-3', date: 'Mon 11 Jan', ch: [IG], format: 'Post and story', pillar: WQ, title: 'No. 10',
        q: 'Which part of your success no longer fits?' },
      { id: 'm3-4', date: 'Thu 14 Jan', ch: [IG, LI], format: 'Reel, 45 seconds', pillar: CHAIR, title: 'The only woman in the room',
        text: 'Leading as a woman in the Middle East, through one moment you remember.',
        ask: 'the moment, on a short call.' },
      { id: 'm3-5', date: 'Mon 18 Jan', ch: [IG], format: 'Post and story', pillar: WQ, title: 'No. 11',
        q: 'What decision are you making by not making it?' },
      { id: 'm3-6', date: 'Thu 21 Jan', ch: [IG, LI], format: 'Quote card', pillar: IN, title: 'In their words',
        hook: 'I genuinely didn’t know I needed a coach until I started working with her.',
        text: 'A client’s line from your website. Proof, said by someone else.',
        ask: 'Risa’s OK to use it on social.' },
      { id: 'm3-7', date: 'Mon 25 Jan', ch: [IG], format: 'Post and story', pillar: WQ, title: 'No. 12',
        q: 'Who are you when the title comes off?' },
      { id: 'm3-8', date: 'Thu 28 Jan', ch: [IG, LI], format: 'Carousel and a booklet', pillar: WQ, title: 'The first twelve',
        text: 'Closes the first edition. All twelve questions in a small booklet, free on your website. Whoever downloads it has raised a hand.' },
      { id: 'm3-9', date: 'January', ch: [IG], format: 'Paid, capped', pillar: 'Reach', title: 'A first, small boost',
        text: 'Your best post so far, shown to people like your audience, with a spend cap you set. One test, then we read the numbers together.' },
      { id: 'm3-10', date: 'January', ch: [], format: 'Bigger rooms', pillar: 'Reach', title: 'Two podcasts and one forum',
        text: 'We shortlist small podcasts and a women’s leadership forum that suit you, and pitch you only to the ones you pick.' },
      { id: 'm3-11', date: 'Mid January', ch: [WA], format: 'Note to a few friends', pillar: 'Champions', title: 'The right words',
        text: 'If someone they know is at a turning point, you would be glad to talk. We write it, you send it.' }
    ]
  }
];
