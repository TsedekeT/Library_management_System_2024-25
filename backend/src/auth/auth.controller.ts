import { Body, Controller, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { ApprovalDto, EmailDto, LoginDto, UpdateDto } from './dto/login.dto';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enums';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('/signup')
    async signUp(
        @Body() signUpDto: SignUpDto,
        @Res() res: Response
    ): Promise<void> {
        const result = await this.authService.signUp(signUpDto);
        res.status(200).json(result);
    }

    
    @Post('/login')
    @Public()
    async login(
        @Body() loginDto: LoginDto,
        @Res() res: Response,
    ): Promise<void> {
        const result = await this.authService.login(loginDto);
        res.status(200).json(result);
    }

    @Public()
    @Get('/filter-by-approval')
    async getUsersByApprovalStatus(@Query('isApproved') isApproved: string) {
        const status = isApproved === 'true';
        return this.authService.getUsersByApprovalStatus(status);
    }

    @Post('/approve')
    @Roles(Role.Admin)
    async approveUser(
        @Body() userApprovalDTo: ApprovalDto,
        @Res() res: Response
    ): Promise<void> {
        const { userId, isApproved } = userApprovalDTo;
        const isRejected = isApproved === 'false';
        console.log(isRejected)
        const result = await this.authService.approveUser(userId, isRejected);
        res.status(200).json(result);
    }

    @Post('/user')
    async getUser(@Body() emailDto : EmailDto, @Res() res: Response) {
        const { email } = emailDto;
        res.status(200).json(await this.authService.getUserByEmail(email))
    }

    @Patch('/update/:id')
    async updateUser(
        @Body() updateDto: UpdateDto,
        @Res() res: Response,
        @Param() id: string,
    ) {
        const _res = await this.authService.update(id, updateDto)
        res.status(200).json(_res)
    }
}
