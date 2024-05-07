export const enum ConstructionType {
  NEW = "New",
  REMODELING = "Remodeling",
  PERIMETER_FENCE = "Perimeter Fence",
  EXPANSION = "Expansion",
}

export type Construction = {
  id: string;
  address: string;
  type: ConstructionType;
  constructionArea: string;
  landArea: string;
  destination: string;
  floorsNo: number;
  manager: string;
  engineer: string;
  constructionCompany: string;
  landAmount: number;
  workAmount: number;
  tax: number;
  population: number;
  sanitaryPermit: string;
};
