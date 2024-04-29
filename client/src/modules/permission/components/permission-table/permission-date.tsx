"use client";
import { Calendar } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState, useContext } from "react";
import { FilterCtx } from "../../context";

function PermissionDate() {
  const { setFilterData } = useContext(FilterCtx);
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [formVals, setFormVals] = useState({
    init_date: "",
    end_date: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setFilterData(formVals);
  };

  return (
    <>
      <Button variant="flat" color="primary" onPress={onOpen}>
        Buscar por fecha
      </Button>
      <Modal
        size="xl"
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Busqueda por fechas
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col" onSubmit={onSubmit}>
                  <div className="flex justify-between">
                    <div>
                      <p className="pb-2">Fecha inicial</p>
                      <Calendar
                        aria-label="Date Init"
                        showMonthAndYearPickers
                        id="init_date"
                        onChange={(e) =>
                          setFormVals((prev) => ({
                            ...prev,
                            init_date: `${e.day}/${e.month}/${e.year}`,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <p className="pb-2">Fecha final</p>
                      <Calendar
                        aria-label="Date end"
                        showMonthAndYearPickers
                        id="end_date"
                        onChange={(e) =>
                          setFormVals((prev) => ({
                            ...prev,
                            end_date: `${e.day}/${e.month}/${e.year}`,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="pt-5 flex justify-evenly">
                    <Button color="danger" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button color="primary" onPress={onClose} type="submit">
                      Guardar fechas
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default PermissionDate;
