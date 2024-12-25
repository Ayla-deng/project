import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [PrismaModule, ProductModule, UserModule, AuthenticationModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
