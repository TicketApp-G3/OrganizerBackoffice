import { ActionIcon, Group, Text, useMantineTheme } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { IconPhoto, IconTrash, IconUpload, IconX } from '@tabler/icons-react'
import React from 'react'
import { Carousel } from '@mantine/carousel'
import { useImagesUploader } from '../../hooks/useImagesUploader'
import './CustomDropzoneStyles.css'

const CustomDropzone = () => {
  const theme = useMantineTheme()

  const { uploadImages, handleDeleteImage, imagesUrls } = useImagesUploader()

  return (
    <div>
      <Dropzone
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
              Adjunte la cantidad que quiera de archivos que quiera, pero deben
              superar los 5MB
            </Text>
          </div>
        </Group>
      </Dropzone>
      {!!imagesUrls.length && (
        <Carousel
          withIndicators
          height={200}
          slideSize="70%"
          slideGap="xl"
          dragFree
          align="start"
          slidesToScroll={1}
        >
          {imagesUrls.map((imageURL) => (
            <div key={imageURL} className="imageContainer">
              <img src={imageURL} alt="img" className="image" />
              <ActionIcon
                onClick={() => handleDeleteImage(imageURL)}
                className="deleteImageButton"
              >
                <IconTrash variant="filled" size="1rem" />
              </ActionIcon>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  )
}

export default CustomDropzone
