import { Vaccines } from "src/vaccines/vaccines.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Locations" })
export class Locations {
    @PrimaryGeneratedColumn()
    idLocation: number;

    @Column()
    name: string;

    // Write relation entity
    //     @ManyToMany(() => Vaccines)
    //     vaccines: Vaccines;
    // 
}