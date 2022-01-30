import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, BaseEntity } from "typeorm";
import { Length, IsEmail } from "class-validator";



@Entity({ name: "users" })
export class User extends BaseEntity  {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 50 })
    firstName: string;

    @Column({ type: "varchar", length: 50 })
    lastName: string;

    @Column({ type: "varchar", length: 50, unique: true })
    userName: string;

    @Column({ unique: true })
    @IsEmail()
    email: string

    @Column({ type: "varchar" })
    @Length(20)
    password: string;

    @CreateDateColumn()
    created_at: Date;
   
    @Column()
    isAdmin: boolean;

}

