import { ConstructionType } from "../../entities/construction.entity";

export const constructionTypeColumns = [
  { name: "Nuevo", uid: ConstructionType.NEW },
  { name: "Remodelacion", uid: ConstructionType.REMODELING },
  { name: "Cerca de perimetro", uid: ConstructionType.PERIMETER_FENCE },
  { name: "Expansion", uid: ConstructionType.EXPANSION },
];

