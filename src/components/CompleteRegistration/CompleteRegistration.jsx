"use client";

import React, { useEffect, useState } from "react";
import PersonalInfo from "./PersonalInfo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const CompleteRegistration = () => {
  const session = useSession();
  const route = useRouter();
  useEffect(() => {
    // if (!session?.data) return route.push("/register");
  }, []);
  const [err, setErr] = useState(false);
  const [errMsg, setErroMsg] = useState("");
  const [userInfo, setUserInfo] = useState({
    address: "",
    occupation: "",
    phone: "",
    gender: "",
    subjects: [],
    _id: null,
    email: null,
  });
  // will be removing this
  // const submit = async () => {
  //   try {
  //     const res = await fetch("/api/complete-registration", {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         // _id: session?.data?.user?._id,
  //         // email: session?.data?.user?.email,
  //         address: userInfo.address,
  //         occupation: userInfo.occupation,
  //         phone: userInfo.phone,
  //         gender: userInfo.gender,
  //         subjects: userInfo.subjects,
  //         email: userInfo.email,
  //         _id: userInfo._id,
  //       }),
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // console.log(userInfo);
  // console.log(userInfo);

  return (
    <div>
      <PersonalInfo
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        submit={submit}
        session={session}
      />
    </div>
  );
};

export default CompleteRegistration;
