import styled from 'styled-components';


export const Title = styled.h3`
    font-Size: 20px;
    margin: 0;
`

export const Temp = styled.h3`
    font-Size: 20px;
    margin: 0;
`

export const CardContainer = styled.div`
    display: flex;
    flex-fow: row;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    background-color: #242424;
    border-radius: 5px;
    margin: 5px 10px;
    padding: 5px;

    a {
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-right: 10px;
    }
`
export const RemoveButton = styled.button`
    background: transparent;
    border: none;
`
