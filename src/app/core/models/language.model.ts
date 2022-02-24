export class ILanguage {
  id!: number;
  name!: string;
  level!: string;

  constructor(createDefault = false, language: any = null) {
    if (createDefault) {
      this.id = 0;
      this.name = '';
      this.level = '';
    }

    if (language) {
      this.id = language?.id;
      this.name = language?.language || '';
      this.level = language?.level || '';
    }
  }
}
