import React from "react";
import styled from "styled-components";
import Text from "../../components/style/text.component";
import colors from "../../themes/colors.theme";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Item from "./components/item.component";

const Container = styled.div`
    background-color: ${colors.dark};
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const ItemsContainer = styled.div` 
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border: 2px solid white;
`

const ExampleScreen = () => {

    const [items, setItems] = React.useState([{
        id: 1,
        text: "One"
    }, {
        id: 2,
        text: "Two"
    }, {
        id: 3,
        text: "Three"
    }, {
        id: 4,
        text: "Four"
    }, {
        id: 5,
        text: "Five"
    }, {
        id: 6,
        text: "Six"
    }, {
        id: 7,
        text: "Seven"
    }, {
        id: 8,
        text: "Eight"
    }, {
        id: 9,
        text: "Nine"
    }]);


    const moveItem = React.useCallback((dragIndex, hoverIndex) => {
        const dragPicture = items[dragIndex];
        let itemsCopy = [...items];
        itemsCopy.splice(dragIndex, 1);
        itemsCopy.splice(hoverIndex, 0, dragPicture);
        setItems(itemsCopy);
    }, [items]);


    return <Container>
        <Text h1 style={{ marginBottom: 20 }}>
            Example drag'n drop
            </Text>
        <ItemsContainer>
            <DndProvider backend={HTML5Backend}>
                {
                    items.map((item, index) => <Item
                        key={item.id}
                        index={index}
                        id={item.id}
                        text={item.text}
                        moveItem={moveItem}
                    />)
                }

            </DndProvider>
        </ItemsContainer>
    </Container>
}

export default ExampleScreen;