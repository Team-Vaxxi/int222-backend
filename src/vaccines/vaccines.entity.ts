import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "Vaccines"})
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

}