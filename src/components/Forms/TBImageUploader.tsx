import { Button, SxProps } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Controller, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInfo,
} from 'next-cloudinary';

type TBUploadWidgetProps = {
  name: string;
  uploadPreset: string;
  label?: string;
  sx?: SxProps;
  fullWidth?: boolean;
  maxUploads?: number;
};

const TBImageUploader = ({
  name,
  uploadPreset,
  label = 'Upload Images',
  sx,
  fullWidth = true,
  maxUploads = 3,
}: TBUploadWidgetProps) => {
  const { control, setValue, watch } = useFormContext();
  const uploadedImages = watch(name) || [];

  const handleUpload = (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info !== 'string') {
      const info: CloudinaryUploadWidgetInfo = result.info;
      const newImageUrl = info.secure_url;

      if (uploadedImages.length < maxUploads) {
        uploadedImages.push({
          id: uploadedImages.length,
          image: newImageUrl,
        });

        setValue(name, [...uploadedImages]);
      } else {
        toast.error(`You can only upload up to ${maxUploads} images.`);
      }
    } else {
      toast.error('Failed to upload image');
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ fieldState: { error } }) => (
        <CldUploadWidget uploadPreset={uploadPreset} onSuccess={handleUpload}>
          {({ open }) => {
            function handleOnClick() {
              if (uploadedImages.length >= maxUploads) {
                toast.error(`You can only upload up to ${maxUploads} images.`);
              } else {
                open();
              }
            }
            return (
              <>
                <Button
                  onClick={handleOnClick}
                  component="label"
                  variant="contained"
                  sx={sx}
                  fullWidth={fullWidth}
                  startIcon={<CloudUploadIcon />}
                >
                  {label} ({uploadedImages.length}/{maxUploads})
                </Button>
                {error && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                    {error.message}
                  </p>
                )}
              </>
            );
          }}
        </CldUploadWidget>
      )}
    />
  );
};

export default TBImageUploader;
