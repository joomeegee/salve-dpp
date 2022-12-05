import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parseData } from '../data/parseData';
import Patient from './patient.entity';

export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  async onApplicationBootstrap() {
    await this.insertPatients();
  }

  async insertPatients() {
    console.log('Insert Patients');

    const existing = await this.patientsRepository.find({ take: 1 });

    if (existing.length > 0) {
      return;
    }

    const toInsert = parseData(
      ['patients1.csv', 'patients2.csv'],
      ([id, clinicId, firstName, lastName, dateOfBirth]) => ({
        id,
        clinicId,
        firstName,
        lastName,
        dateOfBirth,
      }),
    );

    await this.patientsRepository.insert(toInsert);
  }

  async getPatientsByClinicId(id: number) {
    return this.patientsRepository.findBy({
      clinicId: id,
    });
  }
}
