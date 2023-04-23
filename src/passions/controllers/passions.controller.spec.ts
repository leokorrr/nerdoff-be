import { Test, TestingModule } from '@nestjs/testing'
import { PassionsController } from './passions.controller'
import { PassionsService } from '../services/passions.service'
import { ValidationService } from 'src/validation/service/validation.service'
import { PrismaService } from 'src/prismaService/prisma.service'
import { mockPassionsService } from '../mocks/mockPassionsService'

describe('PassionsController', () => {
  let controller: PassionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassionsController],
      providers: [PassionsService, ValidationService, PrismaService],
    })
      .overrideProvider(PassionsService)
      .useValue(mockPassionsService)
      .compile()

    controller = module.get<PassionsController>(PassionsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create passion', async () => {
    const passion = await controller.createPassion({
      title: 'Passion',
      postId: '',
      userId: '',
    })

    expect(passion).toEqual({
      id: expect.any(Number),
      ulid: expect.any(String),
      title: 'Passion',
    })
  })

  it('should return passion', async () => {
    const passion = await controller.getPassion('1')

    expect(passion).toEqual({
      id: expect.any(Number),
      ulid: expect.any(String),
      title: 'Single Passion Test Text',
    })
  })

  it('should return passions', async () => {
    const query = {
      userId: 'userId',
      postId: 'postId',
    }

    const passions = await controller.getPassions(query)

    expect(passions).toEqual([
      {
        id: expect.any(Number),
        ulid: expect.any(String),
        title: 'Passion Test Text 1',
        userId: expect.any(String),
        postId: expect.any(String),
      },
      {
        id: expect.any(Number),
        ulid: expect.any(String),
        title: 'Passion Test Text 2',
        userId: expect.any(String),
        postId: expect.any(String),
      },
    ])
  })
})
