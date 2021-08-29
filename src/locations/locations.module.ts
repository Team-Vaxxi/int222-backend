import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsController } from './locations.controller';
import { Locations } from './locations.entity';
import { LocationsService } from './locations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Locations])],
  exports: [TypeOrmModule],
  controllers: [LocationsController],
  providers: [LocationsService]
})
export class LocationsModule {}
