import { Controller, Get } from '@nestjs/common';
import Clinic from './clinic.entity';
import { ClinicsService } from './clinics.service';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  async getAllClinics(): Promise<Clinic[]> {
    return this.clinicsService.getAllClinics();
  }
}
