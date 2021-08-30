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

    @Column({ type: 'date'})
    dob: string;

    @Column()
    tel: string;

    @Column()
    idCard: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column()
    isOrder: string;

    // Write relation entity
    // @OneToOne(type => Vaccines)
    // Vaccines_idVaccine: Vaccines;

    // @OneToOne(type => Locations)
    // Locations_idLocation: Locations;
    //     @OneToMany(type => Photo, photo => photo.user)
    //   photos: Photo[];

    // Vaccines_idVaccine FK
    // Locations_idLocation FK
}