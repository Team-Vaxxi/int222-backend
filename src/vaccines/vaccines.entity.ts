import { Locations } from "src/locations/locations.entity";
import { Column, Entity, JoinColumn, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(() => Locations)
    @JoinColumn()
    locations: Locations[]

}