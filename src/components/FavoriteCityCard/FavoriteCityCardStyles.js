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
    min-width: 250px;
    width: 50%;
    background-color: #242424;
    border-radius: 5px;
    margin: 5px 10px;
    padding: 5px;

    @media (max-width: 600px) {
        width: 90%;
      }

    a {
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-right: 10px;
    }

    &:hover {
        background-color: #fe752f; 
    }
`
export const RemoveButton = styled.button`
    background: transparent;
    border: none;
    &:hover {
        cursor: pointer;
        color: red !important;

        path {
            color: red;
        }
    }
`
export const FavoriteButton = styled.button`
    background: transparent;
    border: none;
    &:hover {
        cursor: pointer;
        color: red !important;

        path {
            color: red;
        }
    }


`