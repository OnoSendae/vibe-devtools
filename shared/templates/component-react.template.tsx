import { cn } from '../utils/cn';

export interface { { COMPONENT_NAME } }Props {
    { { PROPS_DEFINITION } }
    className ?: string;
    children ?: React.ReactNode;
}

export const {{ COMPONENT_NAME }}: React.FC < {{ COMPONENT_NAME }}Props > = ({
  {{ PROPS_DESTRUCTURE }}
    className,
    children
}) => {
    return (
    < {{ ELEMENT_TYPE }
}
className = {
    cn(
        '{{COMPONENT_CLASS}}',
        {{ VARIANT_CLASSES }}
className
      )}
{ { ELEMENT_PROPS } }
    >
    { children }
    </{ { ELEMENT_TYPE } }>
  );
};

{ { COMPONENT_NAME } }.displayName = '{{COMPONENT_NAME}}';

