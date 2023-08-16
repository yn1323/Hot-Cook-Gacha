import { type Meta, type StoryObj } from '@storybook/react'
import { GachaHistory } from '.'

const meta = {
  title: 'feature/gacha/RecentGachaHistory/GachaHistory',
  component: GachaHistory,
  args: {
    gachaHistories: [
      {
        userId: 'knosWyHDtOVbWNTFPhHsb6zd8ts1',
        url: '/gacha?ids=ti0kpkrCGV0C0fMDnBxD,ti0kpkrCGV0C0fMDnBxD,G9a6SZVClfwBeo3MkK1v,loi7b7CHfNYRQUAv1sYD,G9a6SZVClfwBeo3MkK1v,N5BPbfiBeHqZGUEZIsNP,G9a6SZVClfwBeo3MkK1v,N5BPbfiBeHqZGUEZIsNP,G9a6SZVClfwBeo3MkK1v,N5BPbfiBeHqZGUEZIsNP,ti0kpkrCGV0C0fMDnBxD,N5BPbfiBeHqZGUEZIsNP,N5BPbfiBeHqZGUEZIsNP,ti0kpkrCGV0C0fMDnBxD,N5BPbfiBeHqZGUEZIsNP,G9a6SZVClfwBeo3MkK1v,G9a6SZVClfwBeo3MkK1v,G9a6SZVClfwBeo3MkK1v,G9a6SZVClfwBeo3MkK1v,G9a6SZVClfwBeo3MkK1v,G9a6SZVClfwBeo3MkK1v&term=7&cookPerDay=3',
        dateCreated: '2023-08-05T08:20:09.325Z',
      },
      {
        userId: 'knosWyHDtOVbWNTFPhHsb6zd8ts1',
        url: '/gacha?ids=ti0kpkrCGV0C0fMDnBxD,ti0kpkrCGV0C0fMDnBxD,G9a6SZVClfwBeo3MkK1v,loi7b7CHfNYRQUAv1sYD,G9a6SZVClfwBeo3MkK1v,N5BPbfiBeHqZGUEZIsNP,G9a6SZVClfwBeo3MkK1v,N5BPbfiBeHqZGUEZIsNP,G9a6SZVClfwBeo3MkK1v,N5BPbfiBeHqZGUEZIsNP,ti0kpkrCGV0C0fMDnBxD,N5BPbfiBeHqZGUEZIsNP,N5BPbfiBeHqZGUEZIsNP,ti0kpkrCGV0C0fMDnBxD,N5BPbfiBeHqZGUEZIsNP,G9a6SZVClfwBeo3MkK1v,G9a6SZVClfwBeo3MkK1v,G9a6SZVClfwBeo3MkK1v,G9a6SZVClfwBeo3MkK1v,G9a6SZVClfwBeo3MkK1v,G9a6SZVClfwBeo3MkK1v&term=7&cookPerDay=3',
        dateCreated: '2023-08-05T08:20:09.325Z',
      },
    ],
  },
  parameters: {},
} satisfies Meta<typeof GachaHistory>
export default meta

export const Basic: StoryObj<typeof meta> = {}

export const NoHistory: StoryObj<typeof meta> = {
  args: {
    gachaHistories: [],
  },
}
