import styled from 'styled-components';


export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 5px;
    `

export const SearchTitle = styled.h3`
    font-Size: 18px;
    margin: 0;
    padding: 0 20px;
`

export const SearchInput = styled.input`
    border-radius: 10px;
    line-height: 20px;
    &:focus {
        background-color: #5d89e0e8;
        outline: none;
    }
`