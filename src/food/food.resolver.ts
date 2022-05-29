import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotFoundException, UseFilters } from '@nestjs/common';

import { FoodService } from './food.service';
import { Food } from './entities/food.entity';
import { CurrentUser } from 'src/auth/decorators/current-user-decorater';
import { AuthenticatedUser } from 'src/auth/auth.interfaces';
import { AllExceptionsFilter, MongoExceptionFilter } from 'src/handlers/exceptions';
import { CreateFoodInput, UpdateFoodInput } from './dto';

@UseFilters(MongoExceptionFilter, AllExceptionsFilter)
@Resolver(() => Food)
export class FoodResolver {
  constructor(private readonly foodService: FoodService) {}

  @Query(() => [Food], { name: 'fetchFoods' })
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.foodService.findAll(user.id);
  }

  @Mutation(() => Food, { name: 'addFood' })
  async create(@Args('createFoodInput') createFoodInput: CreateFoodInput, @CurrentUser() user: AuthenticatedUser) {
    return await this.foodService.create(createFoodInput, user.id);
  }

  @Mutation(() => Food, { name: 'adminCreateFood' })
  async createFromAdmin(@Args('createFoodInput') createFoodInput: CreateFoodInput, @Args('userId') userId: string) {
    return this.foodService.create(createFoodInput, userId);
  }

  @Mutation(() => Food, { name: 'updateFood' })
  async update(@Args('updateFoodInput') updateFoodInput: UpdateFoodInput) {
    if (!(await this.foodService.findOne(updateFoodInput.foodId))) throw new NotFoundException();
    return await this.foodService.updateByField(updateFoodInput);
  }

  @Mutation(() => String, { name: 'removeFood', nullable: true })
  async remove(@Args('id') id: string) {
    if (!(await this.foodService.findOne(id))) throw new NotFoundException();
    await this.foodService.remove(id);
    return 'Okay';
  }

  // @Mutation(() => String, { name: 'removeAllFoods', nullable: true })
  // async batchRemove() {
  //   await this.foodService.deleteAll();
  //   return 'Okay';
  // }
}
