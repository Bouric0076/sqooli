export type PopularTab = 'Classes' | 'Tutors' | 'Questions'

export const popularContent: Record<PopularTab, { title: string; detail: string; colour: string; icon: string }[]> = {
  Classes: [{ title: 'Mathematics made simple', detail: 'Form 1 · 32 lessons', colour: 'orange', icon: '∑' }, { title: 'Introduction to coding', detail: 'Beginner · 18 lessons', colour: 'blue', icon: '</>' }, { title: 'Creative writing club', detail: 'All levels · 14 lessons', colour: 'yellow', icon: '✎' }],
  Tutors: [{ title: 'David Mwangi', detail: 'Mathematics & Physics', colour: 'blue', icon: 'DM' }, { title: 'Jane Wanjiru', detail: 'English & Literature', colour: 'purple', icon: 'JW' }, { title: 'Kevin Otieno', detail: 'Sciences & Computing', colour: 'orange', icon: 'KO' }],
  Questions: [{ title: 'How do I solve quadratic equations?', detail: 'Mathematics · 12 answers', colour: 'orange', icon: '?' }, { title: 'What is the water cycle?', detail: 'Science · 8 answers', colour: 'blue', icon: '?' }, { title: 'Tips for composing an essay', detail: 'English · 18 answers', colour: 'yellow', icon: '?' }],
}

export const frequentlyAsked = [
  ['Is there a free trial available?', 'Yes, you can try the full Sqooli experience and discover classes, tutors and school listings before committing.'],
  ['Can I change my plan later?', 'Yes. Your learning plan can grow and change along with your needs.'],
  ['What is your cancellation policy?', 'You are always in control of your membership and can manage it from your account.'],
  ['Can other links be added to an invoice?', 'Our support team can help with school and learning programme billing needs.'],
  ['How does billing work?', 'Billing information is clearly shown before any paid programme begins.'],
]
