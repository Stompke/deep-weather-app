import styled from 'styled-components';


export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 5px;
    @media (max-width: 600px) {
        width: 90%;
        justify-content: center;
      }
    `

export const SearchTitle = styled.h3`
    font-Size: 18px;
    margin: 0;
    padding: 0 20px;
`

export const SearchInput = styled.input`
    border-radius: 5px;
    line-height: 28px;
    color: #000;
    &:focus {
        outline: none;
    }


`