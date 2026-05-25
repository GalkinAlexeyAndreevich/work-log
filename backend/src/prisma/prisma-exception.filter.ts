import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const httpException = this.toHttpException(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const body = httpException.getResponse();
    response.status(httpException.getStatus()).json(body);
  }

  private toHttpException(exception: PrismaClientKnownRequestError) {
    switch (exception.code) {
      case 'P2002':
        return new ConflictException('Запись с такими данными уже существует');
      case 'P2025':
        return new NotFoundException('Запись не найдена');
      default:
        return new InternalServerErrorException();
    }
  }
}
