import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Store {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Product, product => product.store)
    products!: Product[];

    @OneToOne(() => User, user => user.store)
    user!: User;
}
