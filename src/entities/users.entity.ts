import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm"



@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Column({
        type: 'character varying',
        length: 100
    })
    firstname: string

    @Column({
        type: 'character varying',
        length: 100
    })
    lastname: string

    @Column({
        type: Number
    })
    phone: number

    @Column({
        type: "character varying"
    })
    email: string

    @Column({
        type: "character varying"
    })
    password: string

}