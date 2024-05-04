"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
} from "@nextui-org/react";

import { deletePermissions } from "@/modules/permission/services";

function DeleteDialog({ id, isOpen, onOpenChange }) {
  const deletePermission = async () => {
    try {
      await deletePermissions(id);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar el permiso:", error);
    }
  };

  return (
    <>
      <Modal
        size="xl"
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Eliminar permiso
              </ModalHeader>
              <ModalBody>
                <div>Seguro que quieres eliminar este permiso?</div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={deletePermission}>
                  Eliminar permiso
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteDialog;
