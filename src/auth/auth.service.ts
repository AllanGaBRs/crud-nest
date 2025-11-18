import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

const users: { email: string; password: string }[] = [];


@Injectable()
export class AuthService {
  getHello(): string {
    return 'Hello World!';
  }

    async signUp(email: string, password: string){
        const existingUser = users.find(user => user.email === email);
        if(existingUser){
            return new BadRequestException('Email in use');
        }

        const salt = randomBytes(8).toString('hex');
        const hash = await scrypt(password, salt, 32) as Buffer;
        const saltAndHash = `${salt}.${hash.toString('hex')}`
    
        const user = {
            email,
            password: saltAndHash,
        };

        users.push(user);

        console.log('Signed up', user);
        const { password: _, ...result } = user;
        return result;
    }
}
