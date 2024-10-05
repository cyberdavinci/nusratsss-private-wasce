"use client";
import React from "react";
import { Button, Card, Skeleton, User, useDisclosure } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import useSWR, { useSWRConfig } from "swr";
import SettingsModal from "@/components/dashboard/settings/SettingsModal";
import ConfirmDeleteModal from "@/components/dashboard/ConfirmDeleteModal";
import SkeletonLoader from "@/components/dashboard/settings/SkeletonLoader";

const UsersList = () => {
  const [deleting, setDeleting] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState(null);
  const fetcher = (...args) =>
    fetch(...args).then(async (res) => await res.json());
  const { mutate } = useSWRConfig();
  const { data, isLoading, error } = useSWR(
    "/api/others/create-user",
    fetcher,
    {
      keepPreviousData: true,
    }
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // const nameArr = !isLoading ? data?.name?.split(" ") : [];
  // const nameAcronym = !isLoading ? `${nameArr[0][0]}${nameArr[1][0]}` : "";
  // console.log(isLoading ? "loading data..." : data);
  // console.log(error);

  const deleteUser = async (userId) => {
    setDeleting(true);
    try {
      await fetch(`/api/others/create-user?id=${userId}`, {
        method: "DELETE",
      });

      await mutate(`/api/others/create-user`), setDeleting(false);
    } catch (err) {
      console.log(err);
      setDeleting(false);
    }
  };
  // if (isLoading) {
  //   return (
  //     <div className="w-full min-h-screen flex items-center justify-center">
  //       <Spinner label="Loading..." size="lg" color="success" />
  //     </div>
  //   );
  // }
  return (
    <>
      <ConfirmDeleteModal
        deleteUser={deleteUser}
        deleting={deleting}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        userToDelete={userToDelete}
      />
      <div>
        <SettingsModal />
        <div className=" mt-10">
          <ul className="flex gap-3 flex-wrap">
            {!isLoading && data ? (
              data?.map((user, index) => {
                return (
                  <li
                    className="flex flex-col gap-5 items-center bg-slate-900 rounded-md w-[220px] p-8"
                    key={user?._id}
                  >
                    <div className="">
                      <User
                        className="flex flex-col  rounded-full w-20 h-20 text-large"
                        avatarProps={{
                          // radius: "lg",
                          name: `${user.name?.split(" ")[0]}
                            `?.toUpperCase(),
                        }}
                        description={user.role}
                        classNames={{}}
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-[6px] flex-wrap">
                        <h3 className="uppercase font-bold text-center">
                          {user?.name}
                        </h3>

                        {/* <p>{user?.role}</p> */}
                      </div>
                      <p className="text-sm font-semibold text-slate-400">
                        {user?.email}
                      </p>
                    </div>
                    <div className="flex gap-[8px] flex-wrap justify-between w-full">
                      <Button color="success" variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button
                        color="danger"
                        variant="flat"
                        size="sm"
                        onClick={() => {
                          setUserToDelete(user);
                          onOpen();
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                );
              })
            ) : (
              <>
                {" "}
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default UsersList;
