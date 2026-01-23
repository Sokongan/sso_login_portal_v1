import { Button } from '@/components/ui/button';
import type { AnchorNode } from '@/types';


export const NodeAnchor = ({  attributes }: AnchorNode) => {
    return (
        <Button
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.location.href = attributes.href;
            }}
        >
            {attributes.title.text}
        </Button>
    );
};