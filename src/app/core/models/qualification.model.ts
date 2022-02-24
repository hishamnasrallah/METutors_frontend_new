export class IQualification {
  id!: number;
  computerSkills?: string;
  currentEmployer?: string;
  title?: string;
  degreeField?: string;
  degreeLevel?: string;
  nameOfUniversity?: string;
  teachingExperience?: string;
  teachingExperienceOnline?: string;

  constructor(createDefault = false, qualification: any = null) {
    if (createDefault) {
      this.id = 0;
      this.computerSkills = '';
      this.currentEmployer = '';
      this.title = '';
      this.degreeField = '';
      this.degreeLevel = '';
      this.nameOfUniversity = '';
      this.teachingExperience = '';
      this.teachingExperienceOnline = '';
    }

    if (qualification) {
      this.id = qualification?.id;
      this.computerSkills = qualification?.computer_skills || '';
      this.currentEmployer = qualification?.current_employer || '';
      this.title = qualification?.current_title || '';
      this.degreeField = qualification?.degree_field || '';
      this.degreeLevel = qualification?.degree_level || '';
      this.nameOfUniversity = qualification?.name_of_university || '';
      this.teachingExperience = qualification?.teaching_experience || '';
      this.teachingExperienceOnline =
        qualification?.teaching_experience_online || '';
    }
  }
}
