import React from "react";
import styled from "styled-components";
import { useDrag, useDrop } from 'react-dnd';
import Text from "../../../components/style/text.component";

const Container = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 25%;
    margin: 10px;
    border: 2px solid white;
`

type ItemProps = {
    index: number,
    id: number,
    text: string,
    moveItem: (dragIndex, hoverIndex) => void,
    canDrag?: boolean
}

const Item = (props: ItemProps) => {
    const ref = React.useRef(null);

    const [, drop] = useDrop({
        accept: "item",
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = (item as any).index;
            const hoverIndex = props.index;
            if (dragIndex === hoverIndex) {
                return;
            }
            props.moveItem(dragIndex, hoverIndex);
            (item as any).index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        item: { type: "item", id: props.id, index: props.index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: (monitor) => !props.canDrag,
    });

    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    return <Container ref={ref} style={{ opacity }}>
        <Text>
            {props.text}
        </Text>
    </Container>
}

export default Item;