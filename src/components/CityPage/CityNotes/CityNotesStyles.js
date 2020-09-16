import styled from 'styled-components';


export const NotesContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
`
export const TitleContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;

    svg {
        &:hover {
            cursor: pointer;
            path {
                color: #fe752f;
            }
        }
    }
`

export const Title = styled.h3`
    font-Size: 20px;
    margin: 0;
    padding-right: 10px;

    path {
        color: red;
    }
`

export const InputContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 10px;
    
    input {
        color: #000;
    }

`
