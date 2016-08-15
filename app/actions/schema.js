/**
 * @fileOverview Схемы для нормализации ответов от сервера при помощи утилиты normalizr
 */

import { Schema, arrayOf } from 'normalizr';

export const todo = new Schema('todos');
export const arrayOfTodos = arrayOf(todo);
