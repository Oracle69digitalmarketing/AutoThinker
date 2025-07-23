// autothinker_backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenerateModule } from './generate/generate.module';
import { ConfigAppModule } from './config/config.module'; // Make sure this is imported if you renamed
// Other imports like AuthModule, UsersModule, etc.

@Module({
  imports: [
    ConfigAppModule, // Ensure this module is imported if you made it non-global or renamed
    GenerateModule,
    // Other modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
