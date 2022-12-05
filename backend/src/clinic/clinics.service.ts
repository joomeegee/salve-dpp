import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parseData } from '../data/parseData';
import Clinic from './clinic.entity';

export class ClinicsService {
  constructor(
    @InjectRepository(Clinic)
    private clinicsRepository: Repository<Clinic>,
  ) {}

  async onApplicationBootstrap() {
    await this.insertClinics();
  }

  async insertClinics() {
    console.log('Insert Clinics');

    const existing = await this.clinicsRepository.find({ take: 1 });

    if (existing.length > 0) {
      return;
    }

    const toInsert = parseData(['clinics.csv'], ([id, name]) => ({
      id,
      name,
    }));

    await this.clinicsRepository.insert(toInsert);
  }

  async getAllClinics() {
    return this.clinicsRepository.find();
  }
}
