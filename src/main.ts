import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function Main() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v2');

    // Agregado para validacion
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true, // 97. Transform DTOs
            transformOptions: { // 97. Transform DTOs
                enableImplicitConversion: true
            }
        })
    );  

    await app.listen(3000);
}

Main();
