import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';

@Injectable()
export class EventContext {
  constructor(@Inject(REQUEST) public readonly request: Request) {}
}
