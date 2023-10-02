import React from "react";
import PrintPage from "@/components/PrintPage/PrintPage";
import connect from "@/utils/db";
import User from "@/models/User";

const page = ({ student }) => {
  console.log(student);
  return <PrintPage />;
};
export async function getStaticProps({ params }) {
  const { email } = params;
  try {
    await connect();
    const student = await User.findOne({ email, role: "student" });

    return {
      props: {
        student: student ? JSON.parse(JSON.stringify(student)) : null,
      },
    };
  } catch (err) {
    console.error("Error fetching data, please contact the IT guy");
    return {
      props: {
        student: null,
      },
    };
  }
}
export default page;
