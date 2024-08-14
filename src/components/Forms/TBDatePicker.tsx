import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface IDatePicker {
  name: string;
  size?: 'small' | 'medium';
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
}

const TBDatePicker = ({
  name,
  size = 'small',
  label,
  required,
  fullWidth = true,
  sx,
}: IDatePicker) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs(new Date().toDateString())}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD/MM/YYYY"
              label={label}
              disablePast
              timezone="system"
              {...field}
              onChange={(date) => onChange(date)}
              value={value ? dayjs(value) : null}
              slotProps={{
                textField: {
                  required: required,
                  size: size,
                  sx: {
                    ...sx,
                  },
                  variant: 'outlined',
                  fullWidth: fullWidth,
                  error: isError,
                  helperText: isError
                    ? String(formState.errors[name]?.message)
                    : '',
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default TBDatePicker;
