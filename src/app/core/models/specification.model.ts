export class ISpecification {
  id?: number;
  availabilityStartDate?: string;
  availabilityEndDate?: string;
  expectedSalaryPerHour?: string;
  levelOfEducation?: string;
  typeOfTutoring?: string;

  constructor(createDefault = false, specification: any = null) {
    if (createDefault) {
      this.id = 0;
      this.availabilityStartDate = '';
      this.availabilityEndDate = '';
      this.expectedSalaryPerHour = '';
      this.levelOfEducation = '';
      this.typeOfTutoring = '';
    }

    if (specification) {
      this.id = specification?.id;
      this.availabilityStartDate = specification?.availability_start_date || '';
      this.availabilityEndDate = specification?.availability_end_date || '';
      this.expectedSalaryPerHour =
        specification?.expected_salary_per_hour || '';
      this.levelOfEducation = specification?.level_of_education || '';
      this.typeOfTutoring = specification?.type_of_tutoring || '';
    }
  }
}
