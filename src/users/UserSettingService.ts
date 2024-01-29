import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserSetting } from "../graphql/models/UserSetting";
import { CreateUserSettingsInput } from "../graphql/utils/CreateUserSettingsInput";
import { User } from "../graphql/models/User";

@Injectable()
export class UserSettingService {
  constructor(
    @InjectRepository(UserSetting)
    private userSettingRepository: Repository<UserSetting>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  getUserSettingsById(userId: number) {
    return this.userSettingRepository.findOneBy({ userId });
  }

  async createUserSettings(createUserSettingsData: CreateUserSettingsInput) {
    const findUser = await this.userRepository.findOneBy({
      id: createUserSettingsData.userId,
    });

    if (!findUser) throw new Error('User Not Found');

    const newUserSetting = this.userSettingRepository.create(
      createUserSettingsData,
    );
    const savedSettings = await this.userSettingRepository.save(newUserSetting);

    findUser.settings = savedSettings;
    await this.userRepository.save(findUser);

    return savedSettings;
  }
}
