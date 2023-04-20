import { Test, TestingModule } from '@nestjs/testing'
import { PassionsService } from './passions.service'

describe('PassionsService', () => {
  let service: PassionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassionsService],
    }).compile()

    service = module.get<PassionsService>(PassionsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
