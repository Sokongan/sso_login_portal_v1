
import { type NodeInputProps, useOnload } from  '@/lib/helper';

export function NodeInputHidden({ attributes }: NodeInputProps) {
    useOnload(attributes as any);

    return (
        <input
            type={attributes.type}
            name={attributes.name}
            value={attributes.value || 'true'}
        />
    );
}