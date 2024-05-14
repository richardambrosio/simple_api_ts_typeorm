import 'reflect-metadata'
import { DataSource } from 'typeorm'

const AppDataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "user_password",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [
    __dirname + '/**/*.entity.ts'
  ],
  subscribers: [],
  migrations: []
})

AppDataSource
  .initialize()
  .then(() => console.log('connected successful'))
  .catch((error) => console.log(error))

export default AppDataSource
