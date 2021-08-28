import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { VaccinesModule } from './vaccines/vaccines.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [UsersModule, VaccinesModule, LocationsModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
