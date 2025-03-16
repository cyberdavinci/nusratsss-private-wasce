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
  setNewData,
  updateStudentData,
  updating,
  name,
  newData,
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
                name={name}
                value={newData?.testimonial[name] || ""}
                className=" outline-transparent"
                onChange={(event) =>
                  setNewData((prev) => ({
                    ...prev,
                    testimonial: {
                      ...prev.testimonial,
                      [name]: event.target.value,
                    },
                  }))
                }
                classNames={{
                  input: ["border-none", "font-semibold", "text-lg"],
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                isLoading={updating}
                color="success"
                onClick={async (event) => {
                  await updateStudentData(event), onClose();
                }}
              >
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
