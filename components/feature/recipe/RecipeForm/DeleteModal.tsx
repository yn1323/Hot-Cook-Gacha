import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { ComponentProps } from 'react'

type Props = {
  recipeId: string
  onDelete: () => void
  isLoading: boolean
} & Pick<ComponentProps<typeof Modal>, 'isOpen' | 'onClose'>

export const DeleteModal = ({
  onDelete,
  isLoading,
  isOpen,
  onClose,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>本当に削除しますか？</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          削除したレシピはもとに戻せません。 <br />
          それでもレシピを削除しますか？
        </ModalBody>

        <ModalFooter>
          <form action={onDelete}>
            <Button
              type="submit"
              colorScheme="orange"
              mr={3}
              isLoading={isLoading}
            >
              削除
            </Button>
          </form>
          <Button variant="ghost" onClick={onClose}>
            キャンセル
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
