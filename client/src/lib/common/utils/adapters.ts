const statusTypeTranslations = {
  PENDING: "Pendiente",
  APPROVED: "Aprovado",
  REJECTED: "Rechazado",
  IN_PROGRESS: "En progreso",
  COMPLETED: "Completado",
  CANCELED: "Cancelado",
};

export const statusTypeAdapter = (type: string) => ({
  translatedType: statusTypeTranslations[type.toUpperCase()] || type,
});
