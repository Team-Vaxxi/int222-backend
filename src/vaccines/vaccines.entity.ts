import { Locations } from "src/locations/locations.entity";
import { Users } from "src/users/users.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Vaccines'})
export class Vaccines {
    @PrimaryGeneratedColumn()
    idVaccine: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column ()
    price: number;

    @Column()
    image: string;

    // fetch user that handle this vaccine
    @OneToOne(() => Users, user => user.vaccine)
    user?: Users;

    @ManyToMany(() => Locations)
    @JoinTable({
        name: 'VaccinesLocations',
        joinColumn: {
            name: 'Vaccines_idVaccine',
            referencedColumnName: 'idVaccine'
        },
        inverseJoinColumn: {
            name: 'Locations_idLocation',
            referencedColumnName: 'idLocation'
        }
    })
    locations: Locations[];

}