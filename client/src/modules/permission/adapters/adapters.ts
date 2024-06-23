import { Status } from "@/modules/permission/entities";
import { parse } from "date-fns/parse";

export const permissionCreatorAdapter = (data) => ({
  permission: {
    date: parse(data.date, 'yyyy-MM-dd', new Date()),
    quantity: 1,
    amount: Number(data.landAmount) + Number(data.workAmount) + Number(data.tax),
    civ: data.civ,
    observation: data.observation ?? "",
    receiptNo: data.receiptNo,
    status: data.status ?? Status.PENDING,
    userId: data.userId
  },
  construction: {
    population: Number(data.population),
    sanitaryPermit: data.sanitaryPermit,
    address: data.constructionAddress,
    type: data.constructionType,
    constructionArea: Number(data.constructionArea),
    landArea: Number(data.landArea),
    destination: data.constructionDestination,
    floorsNo: Number(data.floorsNo),
    manager: data.constructionConstructor,
    engineer: data.calculatingEngineer,
    constructionCompany: data.constructionCompany,
    landAmount: Number(data.landAmount),
    workAmount: Number(data.workAmount),
    tax: Number(data.tax),
  },
  owner: {
    ci: Number(data.ownerCi),
    name: data.ownerName,
    address: data.ownerAddress,
  },
});

const constructionTypeTranslations = {
  NEW: "Nueva Construcción",
  REMODELING: "Remodelación",
  PERIMETER_FENCE: "Cerca Perimetral",
  EXPANSION: "Expansión",
};

export const constructionTypeAdapter = (type: string) => ({
  translatedType: constructionTypeTranslations[type.toUpperCase()] || type,
});
