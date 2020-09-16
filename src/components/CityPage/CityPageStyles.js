import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    justify-content: center;
    display: flex;
    flex-flow: row wrap;
`


export const Title = styled.h1`
    color: red;
`

export const BackContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: left;
    
    a {

        padding: 10px;
        border: solid 1px #fff;        
        border-radius: 3px;
        margin: 15px;
        width: 30px;
        height: 30px;

        
        &:hover {
            border-color: #fe752f;
                path {
                    color: #fe752f;
                }
        }

    }


`
