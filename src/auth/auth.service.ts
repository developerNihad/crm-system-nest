import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/User.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const user = this.userRepository.create({ ...registerUserDto, password: hashedPassword });
    const savedUser = await this.userRepository.save(user);
    console.log('User saved:', savedUser);
    return savedUser;
  }


  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Ensure the password is set
    if (!user.password) {
      throw new UnauthorizedException('User password is not set');
    }

    const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Generate the JWT token
    const payload = { email: user.email, sub: user.id }; // Payload can include user info
    const accessToken = this.jwtService.sign(payload); // Sign the token with the payload

    return { accessToken }; // Return the token
  }

}
