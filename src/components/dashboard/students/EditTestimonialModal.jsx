import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";

const EditTestimonialModal = ({
  isOpen,
  onOpenChange,
  modalTitle,
  modalPlaceHolder,
}) => {
  //   const {  } = useDisclosure();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {modalTitle}
            </ModalHeader>
            <ModalBody>
              <Textarea
                placeholder={modalPlaceHolder}
                className=" outline-transparent"
                classNames={{
                  input: ["border-none", "font-semibold", "text-lg"],
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="success" onPress={onClose}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default EditTestimonialModal;
