"use client";
import React from "react";
import { Spinner } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
const ConfirmDeleteModal = ({
  isOpen,
  onOpenChange,
  deleteStudent,
  deleteUser,
  // setCurrentUser,
  currentUser,
  userToDelete,
  deleting,
}) => {
  const session = useSession();
  const Delete = () => {
    if (userToDelete.role === "admin") {
      return null;
    }
    if (userToDelete.role === "subscriber") {
      return deleteUser(userToDelete?._id);
    }
    if (userToDelete.role === "student") {
      return deleteStudent(userToDelete?._id);
    }
  };
  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {userToDelete?.name}
              </ModalHeader>
              <ModalBody>
                {deleting ? (
                  <Spinner size="lg" label="Deleting student..." />
                ) : (
                  <p>
                    {userToDelete?.role === "admin" &&
                    session?.data?.user?.role === "subscriber"
                      ? "You don't have permission to delete admin!"
                      : `Are your sure you want to delete this ${userToDelete?.name}!`}
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  variant="light"
                  onPress={onClose}
                  isDisabled={deleting}
                >
                  No
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    Delete();
                    onClose();
                  }}
                  isDisabled={userToDelete.role === "admin" || deleting}
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConfirmDeleteModal;
