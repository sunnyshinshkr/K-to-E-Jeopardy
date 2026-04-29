import { Category } from './types';

export const GAME_DATA: Category[] = [
  {
    id: 'school',
    title: '학교/친구 말투',
    questions: [
      { id: 's1', category: '학교/친구 말투', points: 100, question: '나 학교 가야 돼', answer: 'I have to go to school.', isUsed: false },
      { id: 's2', category: '학교/친구 말투', points: 200, question: '나 지금 좀 바빠', answer: 'I’m kinda busy right now.', isUsed: false },
      { id: 's3', category: '학교/친구 말투', points: 300, question: '나 숙제 아직 안 했어', answer: 'I haven’t done my homework yet.', isUsed: false },
      { id: 's4', category: '학교/친구 말투', points: 400, question: '나 오늘 진짜 피곤해', answer: 'I’m really tired today.', isUsed: false },
      { id: 's5', category: '학교/친구 말투', points: 500, question: '나 내일 시험 있는 거 까먹었어', answer: 'I forgot I have a test tomorrow.', isUsed: false },
    ]
  },
  {
    id: 'daily',
    title: '친구랑 일상 대화',
    questions: [
      { id: 'd1', category: '친구랑 일상 대화', points: 100, question: '뭐 하고 있어?', answer: 'What are you doing?', isUsed: false },
      { id: 'd2', category: '친구랑 일상 대화', points: 200, question: '나 그냥 집에 있어', answer: 'I’m just at home.', isUsed: false },
      { id: 'd3', category: '친구랑 일상 대화', points: 300, question: '같이 갈래?', answer: 'Do you want to come with me?', isUsed: false },
      { id: 'd4', category: '친구랑 일상 대화', points: 400, question: '나 그거 이미 봤어', answer: 'I’ve already seen it.', isUsed: false },
      { id: 'd5', category: '친구랑 일상 대화', points: 500, question: '나 진짜 그거 좋아해', answer: 'I really like it.', isUsed: false },
    ]
  },
  {
    id: 'emotions',
    title: '감정/상황 표현',
    questions: [
      { id: 'e1', category: '감정/상황 표현', points: 100, question: '나 지금 배고파', answer: 'I’m hungry right now.', isUsed: false },
      { id: 'e2', category: '감정/상황 표현', points: 200, question: '나 기분 좀 안 좋아', answer: 'I’m not in a good mood.', isUsed: false },
      { id: 'e3', category: '감정/상황 표현', points: 300, question: '나 너무 웃겨', answer: 'That’s so funny.', isUsed: false },
      { id: 'e4', category: '감정/상황 표현', points: 400, question: '나 좀 걱정돼', answer: 'I’m kind of worried.', isUsed: false },
      { id: 'e5', category: '감정/상황 표현', points: 500, question: '나 진짜 짜증나', answer: 'I’m really annoyed.', isUsed: false },
    ]
  },
  {
    id: 'situations',
    title: '실제 상황 영어',
    questions: [
      { id: 'si1', category: '실제 상황 영어', points: 100, question: '뭐라고? 다시 말해줘', answer: 'What? Say it again.', isUsed: false },
      { id: 'si2', category: '실제 상황 영어', points: 200, question: '천천히 말해줘', answer: 'Please speak slowly.', isUsed: false },
      { id: 'si3', category: '실제 상황 영어', points: 300, question: '나 잘 못 들었어', answer: 'I didn’t catch that.', isUsed: false },
      { id: 'si4', category: '실제 상황 영어', points: 400, question: '이거 어떻게 해?', answer: 'How do I do this?', isUsed: false },
      { id: 'si5', category: '실제 상황 영어', points: 500, question: '나 도와줄 수 있어?', answer: 'Can you help me?', isUsed: false },
    ]
  },
  {
    id: 'students',
    title: '학생들이 쓰는 말',
    questions: [
      { id: 'st1', category: '학생들이 쓰는 말', points: 100, question: '나 진짜 하기 싫어', answer: 'I really don’t want to do it.', isUsed: false },
      { id: 'st2', category: '학생들이 쓰는 말', points: 200, question: '이거 너무 어려워', answer: 'This is too hard.', isUsed: false },
      { id: 'st3', category: '학생들이 쓰는 말', points: 300, question: '나 이해가 안 돼', answer: 'I don’t get it.', isUsed: false },
      { id: 'st4', category: '학생들이 쓰는 말', points: 400, question: '다시 설명해줘', answer: 'Explain it again.', isUsed: false },
      { id: 'st5', category: '학생들이 쓰는 말', points: 500, question: '그냥 모르겠어', answer: 'I have no idea.', isUsed: false },
    ]
  }
];
