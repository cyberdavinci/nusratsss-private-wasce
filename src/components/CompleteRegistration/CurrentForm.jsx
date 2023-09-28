import PersonalInfo from "@/components/CompleteRegistration/PersonalInfo";
import SelectSubjects from "@/components/CompleteRegistration/SelectSubjects";
import Education from "@/components/CompleteRegistration/Education";
import FamilyInfo from "@/components/CompleteRegistration/FamilyInfo";
import Preview from "@/components/CompleteRegistration/Preview";

const CurrentForm = ({
  currentForm,
  updateSubs,
  setInfo,
  info,
  handleInputChange,
  handleNext,
  handlePrevious,
  finishRegistration,
  isFormValid,
}) => {
  switch (currentForm) {
    case 1:
      return (
        <SelectSubjects
          setInfo={setInfo}
          info={info}
          updateSubs={updateSubs}
          handleNext={handleNext}
          currentForm={currentForm}
          handlePrevious={handlePrevious}
        />
      );
    case 2:
      return (
        <PersonalInfo
          setInfo={setInfo}
          info={info}
          handleInputChange={handleInputChange}
          handleNext={handleNext}
          currentForm={currentForm}
          handlePrevious={handlePrevious}
          isFormValid={isFormValid}
        />
      );
    case 3:
      return (
        <Education
          setInfo={setInfo}
          info={info}
          handleInputChange={handleInputChange}
          handleNext={handleNext}
          currentForm={currentForm}
          handlePrevious={handlePrevious}
          isFormValid={isFormValid}
          // handleNext={handleNext}
        />
      );
    case 4:
      return (
        <FamilyInfo
          setInfo={setInfo}
          info={info}
          handleInputChange={handleInputChange}
          handleNext={handleNext}
          currentForm={currentForm}
          handlePrevious={handlePrevious}
          isFormValid={isFormValid}
        />
      );
    case 5:
      return (
        <Preview
          setInfo={setInfo}
          info={info}
          handleInputChange={handleInputChange}
          handleNext={handleNext}
          currentForm={currentForm}
          finishRegistration={finishRegistration}
          handlePrevious={handlePrevious}
          isFormValid={isFormValid}
        />
      );
    default:
      null;
  }
};
export default CurrentForm;
