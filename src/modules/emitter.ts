import mitt from 'mitt';

type EventsType = {
  seedIsSet: number;
  correctAnswerIsSent: string;
};
export const emitter = mitt<EventsType>();
