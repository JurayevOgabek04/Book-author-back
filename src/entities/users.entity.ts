import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm"



@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Column({
        type: 'character varying',
        length: 100
    })
    username: string

    @Column({
        type: Number
    })
    userage: number

    @Column({
        type: "character varying"
    })
    phone: string

    @Column({
        type: "character varying"
    })
    location: string

}