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
  useDisclosure,
} from "@nextui-org/react";

const ConfirmDeleteModal = ({
  isOpen,
  onOpenChange,
  deleteStudent,
  setCurrentUser,
  currentUser,
  deleting,
}) => {
  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {currentUser?.name}
              </ModalHeader>
              <ModalBody>
                {deleting ? (
                  <Spinner size="lg" label="Deleting student..." />
                ) : (
                  <p>Are your sure you want to delete this student!!</p>
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
                    deleteStudent(currentUser?._id);
                    onClose();
                  }}
                  isDisabled={deleting}
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
