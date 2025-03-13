export interface Fruit {
  genus: string;
  name: string;
  id: number;
  family: string;
  order: string;
  nutritions: {
    calories: number;
    fat: number;
    sugar: number;
    carbohydrates: number;
    protein: number;
  };
}

export interface FruitFilters {
  calories: {
    min: number;
    max: number;
  };
  fat: {
    min: number;
    max: number;
  };
  sugar: {
    min: number;
    max: number;
  };
  carbohydrates: {
    min: number;
    max: number;
  };
  protein: {
    min: number;
    max: number;
  };
}