"use client";

import { AlertMessage, AnimatedMessage } from "@/lib";
import { deleteOwner } from "@/modules/owners/services";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
} from "@nextui-org/react";

import { useState } from "react";

function DeleteDialog({ id, isOpen, onOpenChange }) {
  const [state, setState] = useState({
    isVisible: false,
    message: "",
    statusCode: 0,
  });

  const deleteOwners = async () => {
    try {
      const response = await deleteOwner(id);
      if (response.statusCode !== 500) window.location.reload();

      setState((prev) => ({
        ...prev,
        isVisible: true,
        statusCode: response.statusCode as number,
        message:
          "El propietario no puede ser eliminado ya que esta vinculado a un permiso!",
      }));
    } catch (error) {
      console.error("Error al eliminar el permiso:", error);
    } finally {
      setTimeout(
        () => setState((prev) => ({ ...prev, isVisible: false })),
        3000
      );
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
                Eliminar propietario
              </ModalHeader>
              {state.statusCode === 500 && (
                <AnimatedMessage
                  position={["absolute", "top-2", "right-0"]}
                  isVisible={state.isVisible}
                >
                  <AlertMessage
                    description={state.message}
                    styles={["text-red-800", "bg-red-50"]}
                  />
                </AnimatedMessage>
              )}
              <ModalBody>
                <div>Seguro que quieres eliminar este propietario?</div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={deleteOwners}>
                  Eliminar propietario
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
