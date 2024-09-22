import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Store } from "./Store"
import { Category } from "../enums/Category"



@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    name!: string

    @Column()
    description!: string

    @Column("decimal", { precision: 10, scale: 2 })
    price!: number

    @ManyToOne(() => Store, store => store.products)
    store!: Store

    @Column()
    category!: Category[]
}