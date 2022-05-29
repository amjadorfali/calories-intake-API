import { Resolver, Mutation, Args, ResolveField, Parent, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { FoodService } from 'src/food/food.service';
import { Food } from 'src/food/entities/food.entity';
import { Public } from 'src/auth/decorators/public-routes.decorator';
import { forwardRef, Inject, UnauthorizedException, UseFilters } from '@nestjs/common';
import { MongoExceptionFilter, AllExceptionsFilter } from 'src/handlers/exceptions';
import { CurrentUser } from 'src/auth/decorators/current-user-decorater';
import { AuthenticatedUser } from 'src/auth/auth.interfaces';
import { LoginResponseDTO } from 'src/auth/dtos';
import { AuthService } from 'src/auth/auth.service';
import { UserType } from './dto/user';

@UseFilters(AllExceptionsFilter, MongoExceptionFilter)
@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly foodService: FoodService, private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => LoginResponseDTO, { name: 'signUp' })
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    await this.userService.create(createUserInput);
    const res = await this.authService.login(createUserInput);
    return res;
  }

  @ResolveField('foods', () => [Food])
  getFoods(@Parent() user: UserEntity) {
    return this.foodService.findAll(user.id);
  }

  @Query(() => [UserEntity])
  getUsers(@CurrentUser() user: AuthenticatedUser) {
    authenticate(user, 'admin');
    return this.userService.findAll();
  }

  @Mutation(() => UserEntity)
  updateDailyLimit(@CurrentUser() user: AuthenticatedUser, @Args('dailyLimit') dailyLimit: number) {
    return this.userService.updateDailyLimit(user.id, dailyLimit);
  }
}

const authenticate = (user: { role: 'admin' | 'customer' }, role: 'admin' | 'customer') => {
  if (user.role !== role) throw new UnauthorizedException();
  return;
};
