"use client";
import React from "react";
import { CircularProgress } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const UpdatingModal = ({
  isOpen,
  onOpenChange,
  //   deleteStudent,
  //   setCurrentUser,
  //   currentUser,
  updating,
  newData,
  //   useDisclosure,
}) => {
  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal isOpen={updating} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {newData?.name}
              </ModalHeader>
              <ModalBody className="flex items-center justify-center">
                {updating ? (
                  <CircularProgress label="updating data..." size="lg" />
                ) : (
                  "Done!"
                )}
              </ModalBody>
              {/* <ModalFooter>
                <Button
                  color="primary"
                  variant="light"
                  onPress={onClose}
                  isDisabled={updatingInfo}
                >
                  No
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    deleteStudent(currentUser?._id);
                    onClose();
                  }}
                  isDisabled={updatingInfo}
                >
                  Yes
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default UpdatingModal;
