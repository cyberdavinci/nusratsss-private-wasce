import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";

export const ReusableModal = ({
  children,
  modalTitle,
  isOpen,
  onOpenChange,
  onClose,
  closeModal,
  size,
}) => {
  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal
        backdrop="blur"
        className=" overflow-y-auto overflow-x-hidden overscroll-x-none max-h-[580px] relative"
        isDismissable={false}
        isOpen={isOpen}
        size={size ? size : "3xl"}
        // onOpenChange={onOpenChange}
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalTitle}
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => (closeModal(), onClose())}
                >
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
