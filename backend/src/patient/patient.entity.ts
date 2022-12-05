import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Patient {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public clinicId: number;

  @Column()
  public dateOfBirth: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;
}

export default Patient;
