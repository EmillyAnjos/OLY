
import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role"
import { Store } from "./Store"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @ManyToOne(() => Role, role => role.users)
    role!: Role

    @OneToOne(() => Store, store => store.user )
    store?: Store

    
}