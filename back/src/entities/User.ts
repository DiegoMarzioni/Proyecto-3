import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Credential } from "./Credential"
import { Appointment } from "./Appointment"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column( { type: "varchar", length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: "date" })
  birthdate: string;

  @Column({unique:true, nullable: false})
  nDni: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "varchar", length:500, nullable: true })
  profilePicture?: string | null;

  @OneToOne(() => Credential, { cascade: true })
  @JoinColumn()
  credential: Credential;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
