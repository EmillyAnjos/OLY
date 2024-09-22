import { Column, OneToMany, PrimaryGeneratedColumn,Entity} from "typeorm";
import { User } from "./User";

@Entity ()
export class Role {
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    name!:string

    @OneToMany(() => User, user => user.role)
    users!: User[]
}