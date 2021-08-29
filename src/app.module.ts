import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import 'dotenv/config';
// Users
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
// Vaccines
import { VaccinesModule } from './vaccines/vaccines.module';
import { VaccinesController } from './vaccines/vaccines.controller';
import { VaccinesService } from './vaccines/vaccines.service';
// Locations
import { LocationsModule } from './locations/locations.module';
import { LocationsController } from './locations/locations.controller';
import { LocationsService } from './locations/locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_URL,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'Vaxxi',
      entities: [
        'dist/**/*.entity{.ts,.js}',
      ],
      synchronize: false,
    })
    ,
    UsersModule,
    VaccinesModule,
    LocationsModule,
  ],
  controllers: [AppController, UsersController, VaccinesController, LocationsController],
  providers: [AppService, UsersService, VaccinesService, LocationsService],
})
export class AppModule { }
