import type { Fruit } from '~/types/fruit';

const BASE_URL = 'https://fruityvice.com/api/fruit';

export const fruitsApi = {
  async getAllFruits(): Promise<Fruit[]> {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch fruits');
    }
    return response.json();
  },

  async getFruitsByFamily(family: string): Promise<Fruit[]> {
    const response = await fetch(`${BASE_URL}/family/${family}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch fruits for family: ${family}`);
    }
    return response.json();
  },

  async getFruitById(id: number): Promise<Fruit> {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch fruit with id: ${id}`);
    }
    return response.json();
  }
};