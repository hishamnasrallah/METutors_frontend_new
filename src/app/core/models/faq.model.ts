export interface IFAQ {
  id: number;
  title: string;
  answer: string;
  topicId: number | string;
}

export interface IFAQTopics {
  id: number;
  name: string;
}
