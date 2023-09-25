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
}) => {
  switch (currentForm) {
    case 1:
      return (
        <SelectSubjects setInfo={setInfo} info={info} updateSubs={updateSubs} />
      );
    case 2:
      return (
        <PersonalInfo
          setInfo={setInfo}
          info={info}
          handleInputChange={handleInputChange}
        />
      );
    case 3:
      return (
        <Education
          setInfo={setInfo}
          info={info}
          handleInputChange={handleInputChange}
        />
      );
    case 4:
      return (
        <FamilyInfo
          setInfo={setInfo}
          info={info}
          handleInputChange={handleInputChange}
        />
      );
    case 5:
      return (
        <Preview
          setInfo={setInfo}
          info={info}
          handleInputChange={handleInputChange}
        />
      );
    default:
      null;
  }
};
export default CurrentForm;
