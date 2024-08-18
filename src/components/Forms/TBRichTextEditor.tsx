import JoditEditor from 'jodit-react';
import { useMemo, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export type TBRichTextareaProps = {
  name: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

const TBRichTextEditor = ({
  name,
  placeholder = 'Start typing...',
  required = false,
  disabled = false,
}: TBRichTextareaProps) => {
  const editor = useRef(null);
  const { control } = useFormContext();

  const config = useMemo(
    () => ({
      readonly: disabled,
      placeholder,
    }),
    [placeholder, disabled]
  );

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? `${name} is required` : undefined }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          <JoditEditor
            ref={editor}
            value={value}
            config={config}
            onChange={(newContent) => onChange(newContent)}
          />
          {error && (
            <p style={{ color: 'red', fontSize: '12px' }}>{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default TBRichTextEditor;
