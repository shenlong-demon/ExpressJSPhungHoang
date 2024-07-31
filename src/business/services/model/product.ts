import { ProductEntity } from '../../repositories/model';
import { Group } from './group';
import { Brand } from './brand';

export type Product = ProductEntity & {
	brand?: Brand | null;
	group?: Group | null;
};
