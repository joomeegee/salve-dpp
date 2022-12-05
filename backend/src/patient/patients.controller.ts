import { Controller, Get, Param } from '@nestjs/common';
import Patient from './patient.entity';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get(':id')
  async getPatientsByClinicId(@Param('id') id: number): Promise<Patient[]> {
    return this.patientsService.getPatientsByClinicId(id);
  }
}
