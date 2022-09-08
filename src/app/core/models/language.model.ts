export class ILanguage {
  id!: number;
  name!: string;
  iso!: string;
  level?: string;

  constructor(createDefault = false, language: any = null) {
    if (createDefault) {
      this.id = 0;
      this.name = '';
      this.iso = '';
      this.level = '';
    }

    if (language) {
      this.id = language?.language?.id || language?.id;
      this.name = language?.language?.name || language?.language || '';
      this.iso = language?.iso || '';
      this.level = language?.level || '';
    }
  }
}
