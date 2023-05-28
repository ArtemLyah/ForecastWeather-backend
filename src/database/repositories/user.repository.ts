import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { FilterQuery } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { AuthDto } from 'src/dto/auth.dto';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserRepository {
  constructor (@InjectModel(UserModel) private userModel: ModelType<UserModel>) {}

  async create (data: AuthDto): Promise<DocumentType<UserModel>> {
    return this.userModel.create({
      email: data.email,
      passwordHash: data.password,
    });
  }

  async find (filter: FilterQuery<UserModel>): Promise<DocumentType<UserModel> | null> {
    return this.userModel.findOne(filter).exec();
  }
}