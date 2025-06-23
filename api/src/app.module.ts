import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'cat-pinterest-api-pg'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USER', 'cats_app'),
        password: config.get('DB_PASS', 'catpass'),
        database: config.get('DB_NAME', 'catsdb'),
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
      }),
    }),
    UsersModule,
    LikesModule,
  ],
})
export class AppModule {}
