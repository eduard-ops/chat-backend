import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { join } from 'path';
import { AppGateway } from './app.gateway';
// import { MessagesEntity } from './messages.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   database: 'messages',
    //   username: 'postgres',
    //   password: 'naruto13',
    //   entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    //   migrations: [join(__dirname, '**', '*.migration.{ts,js}')],
    //   synchronize: true,
    // }),
    // TypeOrmModule.forFeature([MessagesEntity]),
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
