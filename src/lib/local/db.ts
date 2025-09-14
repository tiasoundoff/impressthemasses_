import { Product } from '../types';

const products: Product[] = [
  {
    id: '1',
    name: 'Impress the Masses T-Shirt',
    description: 'A comfortable and stylish t-shirt that will make you stand out from the crowd.',
    price: 25,
    imageUrl: '/product-image.png',
  },
  {
    id: '2',
    name: 'Impress the Masses Hoodie',
    description: 'A warm and cozy hoodie that will keep you comfortable all winter long.',
    price: 50,
    imageUrl: '/product-image.png',
  },
];

export const getProducts = () => products;

export const getProductById = (id: string) => products.find((p) => p.id === id);
