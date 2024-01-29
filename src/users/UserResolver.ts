import { Resolver, Query, Args, Int, ResolveField, Parent, Mutation } from "@nestjs/graphql";
import { User } from '../graphql/models/User';
import { mockUsers } from '../__mocks__/mockUsers';
import { UserSetting } from '../graphql/models/UserSetting';
import { CreateUserInput } from '../graphql/utils/CreateUserInput';
import { mockUserSettings } from '../__mocks__/mockUserSettings';
import { Inject } from "@nestjs/common";
import { UserService } from "./UserService";
import { UserSettingService } from "./UserSettingService";

export let incrementalId = 3;

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private userSettingService: UserSettingService,
  ) {}
  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsers();
  }

  // @ResolveField((returns) => UserSetting, { name: 'settings', nullable: true })
  // getUserSettings(@Parent() user: User) {
  //   console.log(`호출됨`);
  //   return this.userSettingService.getUserSettingsById(user.id);
  // }

  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.userService.createUser(createUserData);
  }
}
