'use client'

import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  TagCloseButton,
  TagLabel,
  VStack,
  Tag as LibTag,
  Text,
  Center,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

const MaxOriginalTagLength = 40

const ProposalTags = [
  '作り置き',
  '節約',
  '初心者',
  '朝ごはん',
  'ランチ',
  '夕食',
  'カフェ',
  'ヘルシー',
]

export const Tag = () => {
  const [originalTag, setOriginalTag] = useState('')
  const {
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<{
    tags: string[]
  }>()
  watch('tags')
  const selectedTags = getValues('tags')

  const handleAddTag = () => {
    if (originalTag.length > MaxOriginalTagLength) return
    setValue('tags', [...selectedTags, originalTag])
    setOriginalTag('')
  }

  const errorMessage = useMemo(
    () => errors.tags?.message,
    [errors.tags?.message]
  )

  return (
    <FormControl id="tag">
      <FormLabel>タグ</FormLabel>
      <VStack w="100%" border="1px" borderColor="gray.200" borderRadius="md">
        <Box
          borderBottom="1px"
          borderStyle="dashed"
          borderColor="gray.200"
          w="100%"
          p={4}
        >
          <Text textAlign="center">選択中のタグ</Text>
          <HStack mt={2} flexWrap="wrap">
            {selectedTags.length > 0 ? (
              selectedTags.map((tag, index) => (
                <LibTag
                  _hover={{ cursor: 'pointer' }}
                  key={index}
                  borderRadius="md"
                  variant="subtle"
                  colorScheme="green"
                  size="lg"
                  onClick={() => {
                    setValue(
                      'tags',
                      selectedTags.filter((_, i) => i !== index)
                    )
                  }}
                >
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton />
                </LibTag>
              ))
            ) : (
              <Center w="100%">
                <Text fontSize="sm">選択中のタグはありません。</Text>
              </Center>
            )}
          </HStack>
        </Box>

        <Box
          borderBottom="1px"
          borderStyle="dashed"
          borderColor="gray.200"
          w="100%"
          p={4}
        >
          <Text textAlign="center">候補</Text>
          <HStack mt={2} flexWrap="wrap">
            {ProposalTags.filter(
              proposal => !selectedTags.includes(proposal)
            ).map((tag, index) => (
              <LibTag
                _hover={{ cursor: 'pointer' }}
                key={index}
                borderRadius="md"
                variant="subtle"
                colorScheme="green"
                size="lg"
                onClick={() => {
                  setValue('tags', [...getValues('tags'), tag])
                }}
              >
                <TagLabel>{tag}</TagLabel>
              </LibTag>
            ))}
          </HStack>
        </Box>

        <Box w="100%" p={4}>
          <Text textAlign="center">オリジナルタグ</Text>
          <HStack mt={2} flexWrap="wrap">
            <HStack w="100%">
              <Input
                name="originalTag"
                data-testid="originalTag"
                role="textbox"
                maxLength={60}
                flexGrow={1}
                value={originalTag}
                onChange={e => setOriginalTag(e.target.value)}
              />
              <Button colorScheme="green" type="button" onClick={handleAddTag}>
                追加
              </Button>
            </HStack>
            {originalTag.length > MaxOriginalTagLength && (
              <FormHelperText color="crimson">
                {MaxOriginalTagLength}文字以内で入力してください。
              </FormHelperText>
            )}
          </HStack>
        </Box>
      </VStack>
      {errorMessage && (
        <FormHelperText color="crimson">{errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}
