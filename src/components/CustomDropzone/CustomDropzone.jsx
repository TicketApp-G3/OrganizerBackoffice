import {
  ActionIcon,
  Group,
  Image,
  Space,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { IconPhoto, IconTrash, IconUpload, IconX } from '@tabler/icons-react'
import React, { useEffect } from 'react'
import { Carousel } from '@mantine/carousel'
import { useImagesUploader } from '../../hooks/useImagesUploader'
import './CustomDropzoneStyles.css'

const CustomDropzone = ({ onChange, initialImages, label, disabled }) => {
  const theme = useMantineTheme()

  const { uploadImages, handleDeleteImage, imagesUrls } = useImagesUploader({
    initialImages,
  })

  useEffect(() => onChange(imagesUrls), [imagesUrls])

  return (
    <div>
      <Text size={14}>{label}</Text>
      <Space h={5} />
      {!disabled && (
        <Dropzone
          disabled={disabled}
          onDrop={(files) => uploadImages(files)}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 200, pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <IconUpload
                size="3.2rem"
                stroke={1.5}
                color={
                  theme.colors[theme.primaryColor][
                    theme.colorScheme === 'dark' ? 4 : 6
                  ]
                }
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size="3.2rem"
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size="3.2rem" stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Arrastre las imágenes aquí o haga click para seleccionar
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Adjunte la cantidad que quiera de archivos que quiera, pero
                deben superar los 5MB
              </Text>
            </div>
          </Group>
        </Dropzone>
      )}
      {!!imagesUrls.length && (
        <Carousel
          align="center"
          mah={600}
          slidesToScroll={1}
          dragFree
          slideGap="xs"
        >
          {imagesUrls.map((imageURL) => (
            <Carousel.Slide key={imageURL} className="imageContainer">
              <Image src={imageURL} alt="img" />
              {!disabled && (
                <ActionIcon
                  onClick={() => handleDeleteImage(imageURL)}
                  className="deleteImageButton"
                >
                  <IconTrash variant="filled" size={24} color="white" />
                </ActionIcon>
              )}
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </div>
  )
}

export default CustomDropzone
