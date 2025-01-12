import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private userService: AuthService) {}

  async onApplicationBootstrap() {
    const defaultUser = [
      {
        email: 'admin@example.com',
        password: 'securepassword',
        name: "User 1"

      },
      {
        email: 'admin1@example.com',
        password: 'securepassword',
        name: "User 2"

      },
      {
        email: 'admin2@example.com',
        password: 'securepassword',
        name: "User 3"
      },
    ]
    defaultUser.forEach(async (element) => {
      await this.userService.createLibrarian(
        element.email,
        element.password,
        element.name,
      );
    })
    console.log('Default user created (if not already existing).');
  }
}
