import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class AnyExceptionFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost): void;
}
