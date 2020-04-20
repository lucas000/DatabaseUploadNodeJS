import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const categoryRepository = getRepository(Category);

    const { total } = await transactionRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('You do not have enough balance');
    }

    const categoryFounded = await categoryRepository.findOne({
      where: {
        category,
      },
    });

    let newCategory = new Category();

    if (!categoryFounded) {
      newCategory = await categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(newCategory);
    } else {
      newCategory = categoryFounded;
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category: newCategory,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
