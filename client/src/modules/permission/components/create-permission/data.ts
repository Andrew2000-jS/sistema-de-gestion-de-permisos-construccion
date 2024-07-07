import { ConstructionType } from "../../entities/construction.entity";

export const constructionTypeColumns = [
  { name: "Nuevo", uid: ConstructionType.NEW },
  { name: "Remodelación", uid: ConstructionType.REMODELING },
  { name: "Cerca de perímetro", uid: ConstructionType.PERIMETER_FENCE },
  { name: "Expansión", uid: ConstructionType.EXPANSION },
];

