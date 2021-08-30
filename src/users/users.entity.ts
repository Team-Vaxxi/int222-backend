import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Users" })
export class Users {
    @PrimaryGeneratedColumn()
    idUser: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    gender: string;

    @Column()
    address: string;

    @Column()
    dob: Date;

    @Column()
    tel: string;

    @Column()
    idCard: string;

    @Column()
    password: string;

    @Column()
    role: string;

    // optional
    isOrder: string;

    // Vaccines_idVaccine FK
    // Locations_idLocation FK
}