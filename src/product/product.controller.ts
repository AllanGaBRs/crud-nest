import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { CurrentUserDto } from 'src/auth/current-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('product')
export class ProductController {

    @Get('public')
    getPublic(){
        return "publico";
    }

    @Get('private')
    @UseGuards(JwtAuthGuard)
    getPrivate(@CurrentUser() user: CurrentUserDto){
        return `privado ${user.username}`;
    }
}
