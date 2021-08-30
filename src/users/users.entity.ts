import { type } from "os";
import { Locations } from "src/locations/locations.entity";
import { Vaccines } from "src/vaccines/vaccines.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
    dob: string;

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

    @OneToOne(type => Vaccines)
    Vaccines_idVaccine: Vaccines;

    @OneToOne(type => Locations)
    Locations_idLocation: Locations;
//     @OneToMany(type => Photo, photo => photo.user)
//   photos: Photo[];

    // Vaccines_idVaccine FK
    // Locations_idLocation FK
}