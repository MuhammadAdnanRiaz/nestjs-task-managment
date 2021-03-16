import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '172.17.0.2',
  port: 5432,
  username: 'pg',
  password: 'pg',
  database: 'taskmanagment',
  autoLoadEntities: true,
  synchronize: true,
};
