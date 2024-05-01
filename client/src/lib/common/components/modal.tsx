"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function CustomeModal({
  isOpen,
  onOpenChange,
  title,
  content,
  classNames,
  btnTitle,
}) {
  return (
    <>
      <Modal
        size="xl"
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={classNames}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{content}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
