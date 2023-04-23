export const mockPassionsService = {
  getPassion: jest.fn((data) => ({
    id: 1,
    ulid: data.where.ulid,
    title: 'Single Passion Test Text',
  })),
  getPassions: jest.fn((query) => [
    {
      id: 1,
      ulid: 'test1',
      title: 'Passion Test Text 1',
      userId: query.where.userId,
      postId: query.where.postId,
    },
    {
      id: 2,
      ulid: 'test2',
      title: 'Passion Test Text 2',
      userId: query.where.userId,
      postId: query.where.postId,
    },
  ]),
  createPassion: jest.fn((dto) => ({
    id: Date.now(),
    ulid: String(Date.now()),
    title: dto.data.title,
  })),
  updatePassion: jest.fn((data) => ({
    id: data.where.id,
    ulid: data.where.ulid,
    title: data.data.title,
  })),
}
