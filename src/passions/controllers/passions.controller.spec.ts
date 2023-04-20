import { Test, TestingModule } from '@nestjs/testing'
import { PassionsController } from './passions.controller'

describe('PassionsController', () => {
  let controller: PassionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassionsController],
    }).compile()

    controller = module.get<PassionsController>(PassionsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
